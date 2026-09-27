import React, { useState } from 'react';
import { assets } from '../../assets/assets';
import { toast } from 'react-toastify';

const Footer = () => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.length > 0) {
      toast('Submitted!!!');
      setInput('');
    }
  };

  return (
    <footer className='bg-purple-950 md:px-36 text-left w-full mt-10'>
      <div className='flex flex-col md:flex-row items-start px-8 md:px-0 justify-center gap-10 md:gap-32 py-10 border-b border-white/30'>
        
        {/* Logo and description */}
        <div className='flex flex-col md:items-start items-center w-full'>
          <img src={assets.Skillify_white} alt="Logo" className='w-32 mb-6'/>
          <p className='mt-6 text-center md:text-left text-sm text-white/80'>
            Skillify is a professional e-learning platform dedicated to helping students master new skills with industry experts from around the world.
          </p>
        </div>

        {/* Company links */}
        <div className='flex flex-col md:items-start items-center w-full'>
          <h2 className='font-semibold text-white mb-5'>COMPANY</h2>
          <ul className='flex md:flex-col w-full justify-between text-sm text-white/80 md:space-y-2'>
            <li><a href="">HOME</a></li>
            <li><a href="">ABOUT</a></li>
            <li><a href="">CONTACT</a></li>
            <li><a href="">PRIVACY POLICY</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className='hidden md:flex flex-col items-start w-full'>
          <h2 className='font-semibold text-white mb-5'>Subscribe to our Newsletter</h2>
          <p className='text-sm text-white/80'>
            The latest news, articles, and resources sent to your inbox weekly
          </p>
          <form className='flex items-center gap-2 pt-4' onSubmit={handleSubmit}>
            <input
              type="email"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='Enter your email'
              className='border border-gray-500/30 bg-gray-800 text-gray-200 placeholder-gray-500 outline-none w-64 h-9 rounded px-2 text-sm'
            />
            <button
              type="submit"
              className='bg-purple-600 w-24 h-9 text-white rounded'
            >
              SUBSCRIBE
            </button>
          </form>
        </div>

      </div>

      {/* Footer bottom text */}
      <p className='py-4 text-center text-xs md:text-sm text-white/60'>
        Copyright 2025 © Skillify. All rights reserved
      </p>
    </footer>
  );
};

export default Footer;
