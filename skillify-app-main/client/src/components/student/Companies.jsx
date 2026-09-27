import React from 'react'
import { assets } from '../../assets/assets'

const Companies = () => {
   return (
    <div className='pt-16'>
      <p className='text-base text-gray-500'>Trusted by learners form</p>
      <div className='flex flex-wrap items-center justify-center gap-6 md:gap-16 md:mt-10 mt-5'>
        <img src={assets.microsoft_logo} alt="Microsoft" className='w-20 md:w-28' />
        <img src={assets.googlelogo} alt="Google" className='w-20 md:w-28' />
        <img src={assets.youtube_logo} alt="Youtube" className='w-20 md:w-28' />
        <img src={assets.oraclelogo} alt="Oracle" className='w-20 md:w-28' />
         <img src={assets.raastlogo} alt="Raast" className='w-20 md:w-28' />
       </div>
    </div>
  )
}

export default Companies