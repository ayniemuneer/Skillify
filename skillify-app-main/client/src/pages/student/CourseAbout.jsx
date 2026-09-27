import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContextObject";
import Loading from "../../components/student/Loading";
import { assets } from "../../assets/assets";
import Footer from "../../components/student/Footer";
import { useClerk } from "@clerk/clerk-react";

const CourseAbout = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openSections, setOpenSections] = useState({});

  const { openSignIn } = useClerk();

  const {
    currency,
    isSignedIn,
    dbUser,
    loadingUser,
    enrolling,
    navigate,
    enrollCourse,
  } = useContext(AppContext);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/course/${id}`);
        if (!res.ok) throw new Error("Failed to fetch course");
        const data = await res.json();
        setCourseData(data);
      } catch (error) {
        console.error("Error fetching course:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading || loadingUser) return <Loading />;
  if (!courseData) return <p className="text-center mt-20">Course not found</p>;

  const isEnrolled = dbUser?.enrolledCourses?.includes(courseData.id);

  const handleEnrollClick = async () => {
    if (!isSignedIn) {
      openSignIn();
    } else {
      await enrollCourse(courseData.id);
    }
  };

  const openFirstLecture = () => {
    navigate("/player/" + courseData.id);
  };

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const coursePrice = 49.99;
  const discountedPrice = 0; 
  const rating = 4.5;

  return (
    <>
      <div className="flex md:flex-row flex-col-reverse gap-10 px-8 md:px-36 pt-20 items-start relative bg-linear-to-b from-violet-300/70">
        
        {/* Left Side: Course Info & Accordion */}
        <div className="max-w-2xl w-full lg:w-2/3">
          <h1 className="text-2xl md:text-4xl font-semibold text-gray-800">
            {courseData.title}
          </h1>

          <p className="pt-4 text-gray-600">
            {courseData.description ? courseData.description.slice(0, 200) + "..." : "No description available."}
          </p>

          <div className="flex gap-2 pt-3 text-sm items-center">
            <p>{rating.toFixed(1)}</p>
            {[...Array(5)].map((_, i) => (
              <img
                key={i}
                src={i < Math.floor(rating) ? assets.star : assets.star_blank}
                className="w-4"
                alt=""
              />
            ))}
            <p className="text-purple-600">
              (25 ratings)
            </p>
          </div>

          <div className="pt-8">
            <p className="text-xl font-semibold mb-4 text-gray-800">Course Content</p>
            
            <div className="border border-gray-300 mb-2 rounded bg-white overflow-hidden">
              <div
                className="flex justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleSection(0)}
              >
                <p className="font-medium text-gray-700">Chapter 1: All Lessons</p>
                <p className="text-sm text-gray-500">
                  {courseData.videos.length} lectures
                </p>
              </div>

              {openSections[0] && (
                <ul className="border-t border-gray-200 p-4 bg-gray-50/50">
                  {courseData.videos.map((video, i) => (
                    <li key={i} className="flex justify-between py-2 border-b last:border-0 border-gray-200">
                      <p className="text-gray-700 flex items-center gap-2">
                          <img src={assets.play_icon} alt="play" className="w-3 h-3 opacity-60"/>
                          {video.title}
                      </p>
                      <span className="text-gray-500 text-sm font-mono">{video.duration}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar: Thumbnail & Enroll */}
        {/* FIX APPLIED HERE: Changed 'sticky top-24' to 'relative md:sticky md:top-24' */}
        <div className="bg-white p-6 shadow-lg rounded-lg min-w-75 lg:w-1/3 w-full relative md:sticky md:top-24 border border-gray-100 z-10">
          <img
            src={courseData.thumbnail}
            alt={courseData.title}
            className="rounded w-full object-cover aspect-video mb-4"
          />

          {!isEnrolled && (
            <div className="pt-2">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 line-through text-lg">
                    {currency}{coursePrice}
                  </span>
                  <span className="text-2xl font-semibold text-purple-700">
                    {currency}{discountedPrice.toFixed(2)}
                  </span>
                </div>
                <span className="text-sm text-red-500 font-medium">for a limited time</span>
              </div>
            </div>
          )}

          {!isSignedIn ? (
            <div className="w-full mt-6 p-4 bg-purple-50 border border-purple-100 rounded-lg flex flex-col items-center gap-3 text-center">
              <h3 className="text-md font-bold text-purple-800">
                Login to Enroll
              </h3>
              <p className="text-purple-600 text-xs px-2">
                Sign in to access this course and start learning instantly.
              </p>
              <button
                onClick={handleEnrollClick}
                className="bg-purple-600 hover:bg-purple-700 transition-colors text-white px-8 py-2.5 rounded-full font-medium shadow-sm w-full"
              >
                Sign In
              </button>
            </div>
          ) : isEnrolled ? (
            <button
              onClick={openFirstLecture}
              className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-3 rounded-full font-medium shadow-md transition-all transform active:scale-95"
            >
              Continue Learning
            </button>
          ) : (
            <button
              onClick={handleEnrollClick}
              disabled={enrolling}
              className={`w-full mt-4 py-3 rounded-full font-medium text-white transition-all shadow-md ${
                enrolling
                  ? "bg-purple-400 opacity-60 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700 transform active:scale-95"
              }`}
            >
              {enrolling ? "Enrolling..." : "Enroll Now"}
            </button>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CourseAbout;