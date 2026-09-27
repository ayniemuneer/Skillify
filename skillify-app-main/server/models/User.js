import mongoose from "mongoose";

const completedCourseSchema = new mongoose.Schema({
  courseId: { type: String, required: true },
  certificateId: { type: String, required: true }
}, { _id: false }); 

const userSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true
  },
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  avatar: {
    type: String
  },
  enrolledCourses: { type: [String], default: [] },
  completedCourses: { type: [completedCourseSchema], default: [] },
  watchedVideos: { type: [String], default: [] },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
