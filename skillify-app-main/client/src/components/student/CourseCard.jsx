import { Link } from 'react-router-dom'

const truncate = (text, maxLength) => {
  if (!text) return '';
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
};

const CourseCard = ({course}) => {
  return (
    <Link to={'/course/coursedetails/'+ course.id} onClick={() => scrollTo(0,0)} className='border border-gray-500/30 pb-6 overflow-hidden rounded-lg'>
      <img className = 'w-full' src={course.thumbnail} alt="" />
      <div className='p-3 text-left'>
        <h3 className='text-base font-semibold'>{course.title}</h3>
        <p className='text-gray-500'>By Skillify</p>
        <p className='text-base font-semibold text-gray-800'>
          Total Videos : {course.numberOfVideos}</p>
        <p className='text-gray-500'>{truncate(course.description || course.title, 50)}</p>
      </div>
    </Link>
  )
}

export default CourseCard