import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";

const MyCourses = () => {
  return (
    <div className="min-h-screen p-6 md:p-10 bg-linear-to-b from-violet-300/70 flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-700">My Courses</h1>
        <p className="text-gray-600">
          Manage and view all the courses you have created.
        </p>
      </div>

      <div className="flex items-center justify-center flex-1">
        <div className="bg-transparent rounded-lg shadow-md p-8 max-w-md w-full text-center">
          <div className="flex justify-center mb-6">
            <img
              src={assets.my_course_icon}
              alt="No courses"
              className="w-20 h-20 opacity-70"
            />
          </div>

          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            No Courses Listed
          </h2>

          <p className="text-gray-600 mb-6">
            You don’t have any courses listed yet. Once you create a course, it
            will appear here.
          </p>

          <NavLink
            to="/educator"
            className="inline-block bg-violet-600 text-white py-2 px-6 rounded-md hover:bg-violet-700 transition-all"
          >
            Add a Course
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
