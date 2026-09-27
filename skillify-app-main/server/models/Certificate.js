import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    userEmail: { type: String, required: true },
    courseId: { type: String, required: true },
    certificateId: { type: String, required: true },
    courseName: { type: String, required: true }, // Corrected field name
    date: { type: Date, default: Date.now }
});

const Certificate = mongoose.model("Certificate", certificateSchema);

export default Certificate;