import express from "express";
import { requireUser } from "../middleware/auth.js";
import User from "../models/User.js";
import { courses } from "../data/coursesData.js"; 
import Certificate from "../models/Certificate.js";

const userRouter = express.Router();

// 1. Get Enrolled Courses
userRouter.get("/enrolled-courses", requireUser, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const enrolledCourses = courses.filter(course => 
            user.enrolledCourses.some(savedId => String(savedId) === String(course.id))
        );
        res.status(200).json({ success: true, enrolledCourses });
    } catch (error) {
        console.error("Fetch Enrollments Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// 2. ENROLL ROUTE
userRouter.post("/enroll-course", requireUser, async (req, res) => {
  try {
    const { courseId } = req.body;
    if (!courseId) return res.status(400).json({ message: "Course ID is required" });

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const courseExists = courses.find(c => String(c.id) === String(courseId));
    if (!courseExists) return res.status(404).json({ message: "Course invalid" });

    const idString = String(courseId);
    if (!user.enrolledCourses.some(id => String(id) === idString)) {
      user.enrolledCourses.push(idString);
      await user.save();
    }

    res.status(200).json({ success: true, enrolledCourses: user.enrolledCourses });
  } catch (error) {
    console.error("Enrollment Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// 3. Mark Video as Watched
userRouter.post("/watch-video", requireUser, async (req, res) => {
  try {
    const { videoId } = req.body;
    const user = await User.findById(req.user._id);

    if (!user.watchedVideos.includes(videoId)) {
      user.watchedVideos.push(videoId);
      await user.save();
    }
    res.status(200).json({ success: true, watchedVideos: user.watchedVideos });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// 4. Request Certificate
userRouter.post("/request-certificate", requireUser, async (req, res) => {
  try {
    const { courseId } = req.body;
    const user = await User.findById(req.user._id);
    const course = courses.find(c => String(c.id) === String(courseId));

    if (!user || !course) return res.status(404).json({ message: "User or Course not found" });

    // --- LOGIC: Validate 100% of Videos Watched ---
    let totalVideoIds = [];
    if (course.courseContent) {
        totalVideoIds = course.courseContent.flatMap(ch => ch.chapterContent.map(l => l.lectureId));
    } else if (course.videos) { 
        totalVideoIds = course.videos.map(v => v.id);
    }

    // Using .every() ensures ALL videos must be in the watched list
    const hasCompleted = totalVideoIds.every(id => user.watchedVideos.includes(id));

    if (!hasCompleted) {
      return res.status(400).json({ message: "Please watch all videos first" });
    }

    // Generate/Find Certificate
    const existingReceipt = user.completedCourses.find(c => String(c.courseId) === String(courseId));
    
    if (existingReceipt) {
        const realCertificate = await Certificate.findOne({ certificateId: existingReceipt.certificateId });
        if(realCertificate) {
            return res.status(200).json({ message: "Certificate exists", certificateId: existingReceipt.certificateId });
        } else {
             user.completedCourses = user.completedCourses.filter(c => String(c.courseId) !== String(courseId));
        }
    }

    const certificateId = `SKL-${Math.floor(100000 + Math.random() * 900000)}`;
    
    // Robust Name Check
    const courseName = course.courseTitle || course.title || "Course Name Unavailable"; 
    
    user.completedCourses.push({ courseId, certificateId });
    await user.save();

    await Certificate.create({
      userId: user._id,
      userEmail: user.email,
      courseId,
      certificateId,
      courseName,
      date: new Date()
    });

    res.status(200).json({ message: "Certificate issued", certificateId });

  } catch (error) {
    console.error("Certificate Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// 5. User Profile
userRouter.get("/me", requireUser, (req, res) => {
  res.status(200).send(req.user);
});

export default userRouter;