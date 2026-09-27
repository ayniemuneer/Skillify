import express from 'express';
import { courses } from '../data/coursesData.js'; 
import Certificate from '../models/Certificate.js'; 
import User from '../models/User.js';

const courseRouter = express.Router();

courseRouter.get('/', (req, res) => {
    res.status(200).json({ courses: courses });
});

courseRouter.get('/:id', (req, res) => {
    const { id } = req.params;
    const course = courses.find(c => c.id == id); 

    if (course) {
        res.status(200).json(course);
    } else {
        res.status(404).json({ message: "Course not found" });
    }
});

// --- UPDATED CERTIFICATE ROUTE ---
courseRouter.get('/get-certificate/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const certificate = await Certificate.findOne({ certificateId: id });

        if (!certificate) {
            return res.status(404).json({ success: false, message: "Certificate not found" });
        }

        const user = await User.findById(certificate.userId);
        
        let studentName = "Student"; // Default if absolutely no name is found
        
        if (user) {
            // Check all common name fields
            if (user.name) {
                studentName = user.name;
            } else if (user.firstName && user.lastName) {
                studentName = `${user.firstName} ${user.lastName}`;
            } else if (user.firstName) {
                studentName = user.firstName;
            } else if (user.fullName) {
                studentName = user.fullName;
            }
        }

        res.status(200).json({ 
            success: true, 
            certificate: certificate,
            studentName: studentName
        });

    } catch (error) {
        console.error("Get Certificate Error:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

export default courseRouter;