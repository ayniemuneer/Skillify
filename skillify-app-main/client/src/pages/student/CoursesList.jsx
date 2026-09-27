import React, { useEffect, useState, useContext } from 'react'
import { AppContext } from '../../context/AppContextObject'
import SearchBar from '../../components/student/SearchBar'
import { useParams } from 'react-router-dom'
import CourseCard from '../../components/student/CourseCard'
import { assets } from '../../assets/assets'
import Footer from '../../components/student/Footer'
import { courses as allCourses } from '../../assets/courses'

const CoursesList = () => {
  const { navigate } = useContext(AppContext)
  const { input } = useParams()
  const [filteredCourse, setFilteredCourse] = useState([])

  const fetchFilteredCourses = () => {
    if (!allCourses || allCourses.length === 0) return

    if (!input) {
      setFilteredCourse(allCourses)
      return
    }

    const search = input.toLowerCase()

    const filtered = allCourses.filter(course => {
      const titleMatch = course.title?.toLowerCase().includes(search)
      const descMatch = course.description?.toLowerCase().includes(search)
      const videoMatch = course.videos?.some(video =>
        video.title.toLowerCase().includes(search)
      )

      return titleMatch || descMatch || videoMatch
    })

    setFilteredCourse(filtered)
  }

  useEffect(() => {
    fetchFilteredCourses()
  }, [input])

  return (
    <>
      <div className="relative md:px-36 px-8 pt-20 text-left bg-linear-to-b from-violet-300/70">
        <div className="flex md:flex-row flex-col gap-6 items-start justify-between w-full">
          <div>
            <h1 className="text-4xl font-semibold text-gray-800">Course list</h1>
            <p className="text-gray-500">
              <span
                className="text-purple-600 cursor-pointer"
                onClick={() => navigate('/')}
              >
                Home
              </span>{' '}
              / <span>Course list</span>
            </p>
          </div>
          <SearchBar data={input} />
        </div>

        {input && (
          <div className="inline-flex items-center gap-4 px-4 py-2 border mt-8 mb-8 text-gray-600">
            <p>{input}</p>
            <img
              src={assets.cross_icon}
              alt="Clear Search"
              className="cursor-pointer"
              onClick={() => navigate('/course-list')}
            />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-16 gap-3 px-2 md:p-0">
          {filteredCourse.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default CoursesList
