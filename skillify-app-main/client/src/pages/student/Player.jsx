import React, { useContext, useEffect, useState, useRef } from 'react'
import { AppContext } from '../../context/AppContextObject'
import { useParams } from 'react-router-dom'
import { assets } from '../../assets/assets'
import YouTube from 'react-youtube'
import Footer from '../../components/student/Footer'
import Loading from '../../components/student/Loading'
import Rating from '../../components/student/Rating'
import { toast } from 'react-toastify'

const Player = () => {
  const { courseId } = useParams()
  const { watchedVideos, addWatchedVideo, loadingUser, dbUser } = useContext(AppContext)
  
  const [courseData, setCourseData] = useState(null)
  const [currentVideo, setCurrentVideo] = useState(null)
  const [loading, setLoading] = useState(true)
  
  const [openSection, setOpenSection] = useState(true) 
  const [canMarkComplete, setCanMarkComplete] = useState(false)
  const playerRef = useRef(null)

  // 1. Fetch Course Data
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true)
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/course/${courseId}`)
        if (res.ok) {
           const data = await res.json()
           setCourseData(data)
           if(data.videos && data.videos.length > 0) {
              setCurrentVideo(data.videos[0])
           }
        }
      } catch (error) {
        console.error("Error fetching course:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchCourse()
  }, [courseId])

  // 2. Reset completion state when video changes
  useEffect(() => {
    setCanMarkComplete(false);
  }, [currentVideo]);

  // 3. TRACK PROGRESS (40% Duration Rule)
  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current && playerRef.current.getCurrentTime) {
        const currentTime = playerRef.current.getCurrentTime();
        const duration = playerRef.current.getDuration();
        
        if (duration > 0) {
          // Calculate percentage (0 to 100)
          const progress = (currentTime / duration) * 100;
          
          // Logic: Enable button if 40% or more is watched
          if (progress >= 40) {
            setCanMarkComplete(true);
          }
        }
      }
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, [currentVideo]);

  const onPlayerReady = (event) => {
    playerRef.current = event.target;
  };

  if (loading || loadingUser) return <Loading />
  
  const isEnrolled = dbUser?.enrolledCourses?.includes(courseId)
  if (!isEnrolled) {
      return (
          <div className="min-h-screen flex flex-col items-center justify-center">
              <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
              <p>You are not enrolled in this course.</p>
          </div>
      )
  }

  if (!courseData) return <div className="p-10 text-center">Course Not Found</div>

  // Button is enabled if: Video is already in DB OR 40% watched locally
  const isButtonEnabled = watchedVideos.includes(currentVideo?.id) || canMarkComplete;

  return (
    <>
      <div className='p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-36 bg-linear-to-b from-violet-300/70 min-h-screen'>
        
        {/* LEFT SIDE: Structure */}
        <div className='text-gray-800'>
          <h2 className='text-xl font-semibold mb-4'>Course Structure</h2>
          <div className='border border-gray-300 bg-white rounded-md overflow-hidden'>
             <div 
               className='flex items-center justify-between px-4 py-3 bg-gray-50 border-b cursor-pointer hover:bg-gray-100 transition-colors'
               onClick={() => setOpenSection(!openSection)}
             >
                <div className='flex items-center gap-2'>
                   <img 
                     src={assets.down_arrow_icon} 
                     alt="arrow" 
                     className={`w-3.5 h-3.5 transform transition-transform ${openSection ? 'rotate-180' : ''}`}
                   />
                   <p className='font-medium text-gray-800'>Chapter 1: All Lessons</p>
                </div>
                <p className='text-sm text-gray-500'>{courseData.videos.length} lectures</p>
             </div>

             <div className={`transition-all duration-300 ease-in-out overflow-hidden ${openSection ? 'max-h-[60vh] opacity-100' : 'max-h-0 opacity-0'}`}>
               <ul className='overflow-y-auto max-h-[60vh]'>
                   {courseData.videos.map((video, index) => {
                     const isSelected = currentVideo?.id === video.id;
                     const isWatched = watchedVideos.includes(video.id);

                     return (
                       <li 
                         key={index} 
                         onClick={() => setCurrentVideo(video)}
                         className={`flex items-center gap-2 px-4 py-3 cursor-pointer border-b last:border-0 hover:bg-gray-50 transition-colors ${isSelected ? 'bg-purple-50 border-l-4 border-purple-600' : ''}`}
                       >
                         <img 
                            src={isSelected || isWatched ? assets.blue_tick_icon : assets.play_icon} 
                            alt="icon" 
                            className='w-4 h-4 mt-1 shrink-0' 
                         />
                         <div className='flex-1 min-w-0'>
                            <p className={`text-sm ${isSelected ? 'text-purple-700 font-medium' : 'text-gray-700'}`}>
                              {video.title}
                            </p>
                            <span className='text-xs text-gray-500'>{video.duration}</span>
                         </div>
                       </li>
                     )
                   })}
               </ul>
             </div>
          </div>
          <div className='flex items-center gap-2 py-3 mt-6'>
             <h1 className='text-xl font-bold'>Rate this course:</h1>
             <Rating initialRating={0} onRate={(val) => console.log(val)} />
          </div>
        </div>

        {/* RIGHT SIDE: Video Player */}
        <div className='md:mt-0'>
           {currentVideo ? (
             <div className='sticky top-24'>
                <div className='w-full aspect-video bg-black rounded-lg overflow-hidden shadow-lg border border-gray-200'>
                  <YouTube
                    videoId={currentVideo.id}
                    opts={{
                      width: '100%',
                      height: '100%',
                      playerVars: { autoplay: 1, controls: 1 },
                    }}
                    className='w-full h-full' 
                    iframeClassName='w-full h-full' 
                    onReady={onPlayerReady}
                    onEnd={() => {
                        // Optional: Auto-mark on video end if desired
                        addWatchedVideo(currentVideo.id)
                    }}
                  />
                </div>
                
                <div className='mt-5 p-4 bg-white rounded shadow-sm border flex flex-col gap-4'>
                   <div>
                      <h1 className='text-xl font-bold text-gray-800'>{currentVideo.title}</h1>
                      <p className='text-gray-600 text-sm mt-1'>{courseData.title}</p>
                   </div>
                   
                   <button 
                     disabled={!isButtonEnabled}
                     onClick={() => {
                        addWatchedVideo(currentVideo.id);
                        toast.success("Marked as Completed!");
                     }}
                     className={`w-full py-3 rounded-full font-medium transition-colors shadow-sm ${
                        watchedVideos.includes(currentVideo.id) 
                        ? 'bg-green-100 text-green-700 cursor-default border border-green-200' 
                        : isButtonEnabled
                           ? 'bg-purple-600 text-white hover:bg-purple-700' 
                           : 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                     }`}
                   >
                     {watchedVideos.includes(currentVideo.id) 
                        ? '✓ Completed' 
                        : isButtonEnabled 
                           ? 'Mark as Complete' 
                           : 'Watch more to Complete'
                     }
                   </button>
                </div>
             </div>
           ) : (
             <div className='w-full aspect-video bg-gray-200 rounded-lg flex items-center justify-center'>
                <p className='text-gray-500'>Select a video to play</p>
             </div>
           )}
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default Player