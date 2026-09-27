import React, { useState, useEffect, useCallback } from "react";
import { AppContext } from "./AppContextObject";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const { isLoaded, userId, getToken } = useAuth();

  const [dbUser, setDbUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(false);
  
  // 1. Add the enrolling state here
  const [enrolling, setEnrolling] = useState(false);

  const fetchDbUser = useCallback(async () => {
    if (!userId) return; 

    try {
      setLoadingUser(true);
      const token = await getToken();

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/user/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch user from backend");

      const data = await res.json();
      setDbUser(data);
    } catch (error) {
      console.error("Fetch DB User Error:", error);
    } finally {
      setLoadingUser(false);
    }
  }, [userId, getToken]);

  // 2. Update enrollCourse to use the enrolling state
  const enrollCourse = async (courseId) => {
    if (!courseId || !userId) return;

    try {
      setEnrolling(true); // Start loading
      const token = await getToken();
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/user/enroll-course`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ courseId }),
      });

      if (!res.ok) throw new Error("Failed to enroll course");

      const data = await res.json();
      setDbUser((prev) => (prev ? { ...prev, enrolledCourses: data.enrolledCourses } : prev));
      navigate('/my-enrollments'); // Optional: Redirect to enrollments page
    } catch (error) {
      console.error("Enroll Course Error:", error);
    } finally {
      setEnrolling(false); // Stop loading
    }
  };

  const addWatchedVideo = async (videoId) => {
    if (!videoId) return;

    try {
      const token = await getToken();
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/user/watch-video`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ videoId }),
      });

      if (!res.ok) throw new Error("Failed to update watched video");

      const data = await res.json();
      setDbUser((prev) => (prev ? { ...prev, watchedVideos: data.watchedVideos } : prev));
    } catch (error) {
      console.error("Add Watched Video Error:", error);
    }
  };

  const calculateRating = (course) =>
    course?.courseRatings?.length
      ? course.courseRatings.reduce((acc, r) => acc + r, 0) / course.courseRatings.length
      : 0;

  const calculateNoOfLectures = (course) =>
    course?.courseContent?.reduce((acc, chapter) => acc + chapter.chapterContent.length, 0) || 0;

  const calculateCourseDuration = (course) =>
    course?.courseContent?.reduce(
      (acc, chapter) => acc + chapter.chapterContent.reduce((s, lec) => s + lec.lectureDuration, 0),
      0
    ) || 0;

  const calculateChapterTime = (chapter) =>
    chapter?.chapterContent?.reduce((acc, lec) => acc + lec.lectureDuration, 0) || 0;

  const currency = "$";

  useEffect(() => {
    if (isLoaded && userId) fetchDbUser();
    else setDbUser(null);
  }, [isLoaded, userId, fetchDbUser]);

  const value = {
    isLoaded,
    isSignedIn: !!userId,
    dbUser,
    loadingUser,
    enrolling, // 3. Export the enrolling state here so CourseAbout.jsx can use it
    enrolledCourses: dbUser?.enrolledCourses || [],
    watchedVideos: dbUser?.watchedVideos || [],
    fetchDbUser,
    addWatchedVideo,
    enrollCourse,
    calculateRating,
    calculateNoOfLectures,
    calculateCourseDuration,
    calculateChapterTime,
    currency,
    navigate,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};