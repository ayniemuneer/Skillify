import React, { useState, useEffect, useRef, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Youtube from 'react-youtube';
import { useAuth } from "@clerk/clerk-react";
import { AppContext } from '../../context/AppContextObject';
import Loading from '../../components/student/Loading';
import Footer from '../../components/student/Footer';

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [selectedVideoTitle, setSelectedVideoTitle] = useState(null);
  const [error, setError] = useState('');

  const playerRef = useRef(null);
  const intervalRef = useRef(null);

  const { getToken } = useAuth();
  const { watchedVideos, addWatchedVideo, dbUser, loadingUser } = useContext(AppContext);


  
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const token = await getToken();
        if (!token) {
          setError('You must be logged in to view this course');
          setLoading(false);
          return;
        }

        const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/course/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (res.status === 401) {
          setError('Unauthorized. Please login to access this course');
          setLoading(false);
          return;
        }

        if (!res.ok) throw new Error('Failed to fetch course');

        const data = await res.json();
        setCourse(data);

        if (data.videos.length > 0) {
          setSelectedVideoId(data.videos[0].id);
          setSelectedVideoTitle(data.videos[0].title);
        }
      } catch (err) {
        console.error(err);
        setError('Something went wrong while fetching course');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id, getToken]);

  const handleVideoReady = (event) => {
    playerRef.current = event.target;
  };

  const handleStateChange = (event) => {
    if (event.data === 1) { // playing
      if (!intervalRef.current) {
        intervalRef.current = setInterval(async () => {
          const player = playerRef.current;
          if (!player || !selectedVideoId) return;

          const duration = player.getDuration();
          const currentTime = player.getCurrentTime();
          const watchedPercentage = (currentTime / duration) * 100;

          if (watchedPercentage >= 40 && !watchedVideos.includes(selectedVideoId)) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            try {
              await addWatchedVideo(selectedVideoId);
            } catch (err) {
              console.error("Failed to mark video as watched", err);
            }
          }
        }, 1000);
      }
    } else {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  if (loading || loadingUser) return <Loading/>;
  if (error) return <div className="p-6 text-center text-red-600">{error}</div>;
  if (!course) return <div className="p-6 text-center">Course not found.</div>;

  // ---------------- Render ----------------
  return (
    <>
    <div className=" h-full p-6 w-full mx-auto space-y-8 bg-linear-to-b from-violet-200/70 to-violet-200/70">
      {/* Course Header */}
      <div className="flex flex-col md:flex-row md:items-start md:space-x-6 bg-white p-6 rounded-xl shadow-lg">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full md:w-1/3 rounded-lg shadow-md"
        />
        <div className="mt-4 md:mt-0 md:w-2/3">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-800">{course.title}</h1>
          {course.description && <p className="text-gray-600 mb-4">{course.description}</p>}
          <p className="font-medium text-gray-800">Total Videos: {course.videos.length}</p>
        </div>
      </div>

      {/* Video List and Player */}
      <div className="flex flex-col-reverse md:flex-row gap-6">
        {/* Video List */}
        <div className="md:w-1/3 max-h-200 overflow-y-auto space-y-3">
          <h1 className="text-xl md:text-2xl font-bold mb-3 text-gray-800">Videos</h1>
          {course.videos.map((video) => (
            <div
              key={video.id}
              className={`p-3 border rounded-lg cursor-pointer hover:bg-purple-50 transition flex justify-between items-center ${
                selectedVideoId === video.id ? 'border-purple-500 bg-purple-50' : ''
              }`}
              onClick={() => {
                setSelectedVideoId(video.id);
                setSelectedVideoTitle(video.title);
              }}
            >
              <div>
                <h3 className="font-semibold">{video.title}</h3>
                <p className="text-sm text-gray-600">{video.duration}</p>
              {watchedVideos.includes(video.id) ? (
                <span className="text-green-600 text-xs font-bold">✓ Watched</span>
              ) : (
                <span className="text-gray-500 text-xs font-medium">X Not Watched</span>
              )}
              </div>
            </div>
          ))}
        </div>

        {/* Video Player */}
        <div className="md:w-2/3 w-full flex flex-col gap-2">
          <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
            {selectedVideoId && (
              <Youtube
                videoId={selectedVideoId}
                opts={{ width: '100%', height: '100%', playerVars: { autoplay: 0 } }}
                onReady={handleVideoReady}
                onStateChange={handleStateChange}
                className="absolute top-0 left-0 w-full h-full"
              />
            )}
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">{selectedVideoTitle}</h1>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default CourseDetails;
