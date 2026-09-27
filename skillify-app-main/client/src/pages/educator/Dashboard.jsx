import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const [formData, setFormData] = useState({
    courseTitle: "",
    description: "",
    requiredResources: "",
    expectedDuration: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: send to backend when integrated
    toast.success(
      "Your request has been submitted, we will reach you as soon as possible"
    );
    setFormData({
      courseTitle: "",
      description: "",
      requiredResources: "",
      expectedDuration: "",
    });
  };

  return (
    <div className="min-h-screen p-6 md:p-10 bg-linear-to-b from-violet-300/70 flex flex-col gap-8">
      <h1 className="text-3xl font-bold text-gray-700">
        Request to Add Your Course
      </h1>
      <p className="text-gray-600">
        Submit a request for a new course you want to create. We will review
        your request and get back to you.
      </p>

      <div className="rounded-lg shadow-md p-6 max-w-3xl w-full mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Request a New Course
        </h2>
        <form className="flex flex-col gap-4 bg-transparent" onSubmit={handleSubmit}>
          <div className="flex flex-col bg-transparent">
            <label className="text-gray-600 font-medium">Course Title</label>
            <input
              type="text"
              name="courseTitle"
              value={formData.courseTitle}
              onChange={handleChange}
              placeholder="Enter course title"
              required
              className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-violet-400 focus:outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Briefly describe your course"
              required
              className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-violet-400 focus:outline-none resize-none"
              rows={4}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 font-medium">
              Required Resources
            </label>
            <input
              type="text"
              name="requiredResources"
              value={formData.requiredResources}
              onChange={handleChange}
              placeholder="E.g., videos, PDFs, tools"
              className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-violet-400 focus:outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 font-medium">Expected Duration</label>
            <input
              type="text"
              name="expectedDuration"
              value={formData.expectedDuration}
              onChange={handleChange}
              placeholder="E.g., 10 hours, 30 minutes"
              className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-violet-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="bg-violet-600 text-white py-2 px-4 rounded-md hover:bg-violet-700 transition-all"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
