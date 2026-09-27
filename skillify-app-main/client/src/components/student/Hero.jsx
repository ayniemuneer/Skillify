import React from 'react'
import SearchBar from './SearchBar'

const Hero = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full pt-20 md:pt-36 px-7 md:px-0 space-y-6 text-center bg-linear-to-b from-violet-300/70'>

      <h1 className='text-3xl md:text-5xl font-bold text-gray-800 max-w-3xl mx-auto'>
        Skillify: <span className='text-purple-600'>Open-source learning for everyone</span>
      </h1>

      <p className='md:block hidden text-gray-600 max-w-2xl mx-auto text-lg'>
        Skillify is an open-source platform that gives students access to the most valuable courses for free. Learn high-demand skills, gain practical knowledge, and unlock opportunities to excel in your career.
      </p>

      <p className='md:hidden text-gray-600 max-w-sm mx-auto text-base'>
        Skillify offers free, high-value courses to help you gain skills that matter.
      </p>

      <SearchBar/>
    </div>
  )
}

export default Hero
