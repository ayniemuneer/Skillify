import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContextObject";
import Footer from "../../components/student/Footer";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import Loading from "../../components/student/Loading";

const MyEnrollments = () => {
  const { dbUser, navigate, loadingUser, fetchDbUser } = useContext(AppContext);
  const { getToken } = useAuth();

  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]); 
  const [unenrollingId, setUnenrollingId] = useState(null);
  const [requestingCertId, setRequestingCertId] = useState(null);

  // 1. Fetch All Courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/course`);
        if(res.ok){
            const data = await res.json();
            setAllCourses(data.courses || []);
        }
      } catch (error) {
        console.error("Failed to fetch course list:", error);
      }
    }
    fetchCourses();
  }, []);

  // 2. Filter Enrolled Courses
  useEffect(() => {
    if (!dbUser || !dbUser.enrolledCourses || allCourses.length === 0) {
      setEnrolledCourses([]);
      return;
    }

    const filtered = allCourses
      .filter(course => 
          dbUser.enrolledCourses.some(id => String(id) === String(course.id))
      )
      .map(course => {
        const completed = dbUser.completedCourses.find(c => String(c.courseId) === String(course.id));
        return { ...course, certificateId: completed ? completed.certificateId : null };
      });

    setEnrolledCourses(filtered);
  }, [dbUser, allCourses]);

  const getTotalVideos = (course) => {
    if (course.videos) return course.videos.length;
    if (course.courseContent) {
        return course.courseContent.reduce((acc, chapter) => acc + (chapter.chapterContent?.length || 0), 0);
    }
    return 0;
  };

  const handleRequestCertificate = async (courseId) => {
    try {
      setRequestingCertId(courseId);
      const token = await getToken();
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/user/request-certificate`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ courseId })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      await fetchDbUser();
      toast.success("Certificate issued successfully!");
    } catch (err) {
      toast.error(err.message || "Please watch all videos first");
    } finally {
      setRequestingCertId(null);
    }
  };

  const handleUnenroll = async (courseId) => {
    try {
      setUnenrollingId(courseId);
      const token = await getToken();
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/user/unenroll-course`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ courseId })
      });
      if (!res.ok) throw new Error("Unenroll failed");
      await fetchDbUser();
      toast.success("Unenrolled successfully");
    } catch (error) {
        toast.error("Failed to unenroll");
    } finally {
      setUnenrollingId(null);
    }
  };

  if (loadingUser || !dbUser) {
    return <div className="p-10 text-center"><Loading /></div>;
  }

  return (
    <>
      <div className="md:px-36 px-8 pt-10 min-h-screen bg-linear-to-b from-violet-300/70">
        <h1 className="text-2xl font-semibold">My Enrollments</h1>

        {enrolledCourses.length === 0 ? (
          <p className="mt-10 text-gray-600">You are not enrolled in any courses.</p>
        ) : (
          <>
            <div className="hidden sm:block">
              <table className="bg-transparent w-full mt-10 border shadow-sm rounded-lg overflow-hidden">
                <thead className="border-b text-sm text-left bg-gray-50">
                  <tr>
                    <th className="px-4 py-3">Course</th>
                    <th className="px-4 py-3 text-center">Lessons</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {enrolledCourses.map((course) => (
                    <tr key={course.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-4 flex gap-4 items-center">
                        {/* ROBUST IMAGE FIX: Checks both naming styles */}
                        <img 
                          src={course.courseThumbnail || course.thumbnail} 
                          className="w-24 rounded object-cover" 
                          alt="" 
                        />
                        <div>
                            {/* ROBUST TITLE FIX: Checks both naming styles */}
                            <p className="font-medium">{course.courseTitle || course.title}</p>
                            <p className="text-xs text-gray-500 mt-1">Instructor: Skillify</p>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">{getTotalVideos(course)}</td>
                      <td className="px-4 py-4">
                        <div className="flex gap-3 flex-wrap">
                          <button
                            onClick={() => navigate("/player/" + course.id)}
                            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"
                          >
                            View
                          </button>

                          {!course.certificateId && (
                            <button
                              disabled={requestingCertId === course.id}
                              onClick={() => handleRequestCertificate(course.id)}
                              className={`px-4 py-2 rounded border transition-colors ${
                                requestingCertId === course.id
                                  ? "bg-blue-100 text-blue-400 opacity-60 cursor-wait"
                                  : "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                              }`}
                            >
                              {requestingCertId === course.id ? "Requesting..." : "🎓 Certificate"}
                            </button>
                          )}

                          {course.certificateId && (
                            <button
                              onClick={() => navigate(`/courses/certificates/${course.certificateId}`)}
                              className="bg-green-100 text-green-700 px-4 py-2 rounded border border-green-200 hover:bg-green-200 transition-colors"
                            >
                              📜 Download
                            </button>
                          )}
                          
                          <button
                              disabled={unenrollingId === course.id}
                              onClick={() => handleUnenroll(course.id)}
                              className={`px-3 py-2 rounded border text-xs font-semibold ${
                                unenrollingId === course.id
                                  ? "bg-gray-100 text-gray-400"
                                  : "bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                              }`}
                            >
                              {unenrollingId === course.id ? "..." : "X"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile View */}
            <div className="sm:hidden mt-6 space-y-4">
              {enrolledCourses.map((course) => (
                <div key={course.id} className="bg-white p-4 rounded-lg shadow border">
                  <div className="flex gap-4 items-center mb-3">
                    {/* ROBUST IMAGE FIX FOR MOBILE */}
                    <img 
                      src={course.courseThumbnail || course.thumbnail} 
                      className="w-20 rounded object-cover" 
                      alt="" 
                    />
                    <div>
                      {/* ROBUST TITLE FIX FOR MOBILE */}
                      <p className="font-semibold text-sm">{course.courseTitle || course.title}</p>
                      <p className="text-xs text-gray-500">Lessons: {getTotalVideos(course)}</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => navigate("/player/" + course.id)}
                      className="bg-purple-600 text-white py-2 rounded text-sm hover:bg-purple-700"
                    >
                      View Course
                    </button>

                    {!course.certificateId && (
                      <button
                        disabled={requestingCertId === course.id}
                        onClick={() => handleRequestCertificate(course.id)}
                        className={`py-2 rounded border text-sm ${
                          requestingCertId === course.id
                            ? "bg-blue-100 text-blue-400 opacity-60"
                            : "bg-blue-50 text-blue-700 border-blue-200"
                        }`}
                      >
                        {requestingCertId === course.id ? "Requesting..." : "🎓 Request Certificate"}
                      </button>
                    )}

                    {course.certificateId && (
                      <button
                        onClick={() => navigate(`/courses/certificates/${course.certificateId}`)}
                        className="bg-green-100 text-green-700 py-2 rounded border border-green-200 text-sm"
                      >
                        📜 Download Certificate
                      </button>
                    )}
                    
                    <button
                        disabled={unenrollingId === course.id}
                        onClick={() => handleUnenroll(course.id)}
                        className="text-red-500 text-xs mt-2 underline"
                      >
                        {unenrollingId === course.id ? "Unenrolling..." : "Unenroll from course"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default MyEnrollments;