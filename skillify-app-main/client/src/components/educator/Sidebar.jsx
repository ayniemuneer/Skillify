import React from 'react'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContextObject'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {


  const menuItems = [
    {name: 'Add Course', path: '/educator', icon : assets.add_icon},
    {name: 'My Courses', path: '/educator/my-courses', icon : assets.my_course_icon},
    ]
  return (
    <div className='md:w-64 w-16 border-r min-h-screen text-base border-gray-500 py-2 flex flex-col bg-linear-to-b from-violet-300/70'>
      {menuItems.map((item) => (
        <NavLink
  to={item.path}
  key={item.name}
  end={item.path === '/educator'}
  className={({ isActive }) =>
    `flex items-center md:flex-row flex-col md:justify-start justify-center py-3.5 md:px-10 gap-3
     ${
       isActive
         ? 'bg-violet-50 border-r-[6px] border-violet-500/90'
         : 'hover:bg-gray-100/90 border-r-[6px] border-white hover:border-gray-100/90'
     }`}>
          <img src={item.icon} alt="" className='w-6 h-6' />
          <p className='md:block hidden text-center'>{item.name}</p>
        </NavLink>
      ))}
    </div>
  )
}

export default Sidebar
