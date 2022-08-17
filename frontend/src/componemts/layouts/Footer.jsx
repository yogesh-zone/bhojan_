import React from 'react'
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaPinterestP } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
function Footer() {
  return (
    <div className='bg-slate-900 h-auto  w-full bottom-0 flex flex-col p-8 text-gray-100 space-y-4'>
        <div className='text-3xl lg:text-4xl cursor-pointer my-3 h-auto'>
        <span className='text-red-500'>भो</span>
        <span className='text-white'>jan</span>
      </div>
        <div className=' grid md:grid-cols-4 grid-cols-3  gap-8 text-slate-500 md:px-8 capitalize'>
          <div className='flex flex-col space-y-2 md:mx-3 text-gray-400'>
            <h1 className='font-semibold text-2xl text-gray-200'>About Bhojan</h1>
            <a href='#'>who we are</a>
            <a href='#'>work with us</a>
            <a href='#'>Report fraud</a>
          </div>
          <div className='flex flex-col space-y-2 md:mx-3 text-gray-400'>
            <h1 className='font-semibold text-2xl text-gray-200'>FOR Partner</h1>
            <a href='/add-restaurant'>partner with us</a>
            <a href='#'>App for you</a>
            <a href='#'>for enterprise</a>
          </div>
          <div className='md:flex flex-col space-y-2 md:mx-3 hidden text-gray-400 '>
            <h1 className='font-semibold text-2xl text-gray-200'>learn more</h1>
            <a href='#'>privacy</a>
            <a href='#'>Asecurity</a>
            <a href='#'>terms & conditions</a>
          </div>
          <div className='flex flex-col text-center space-y-6 md:mx-3 '>
            <h1 className='font-semibold w-full text-2xl text-gray-200'>follow us</h1>
            <div className='flex md:text-2xl justify-around  space-x-2 md:mx-3 text-gray-400'>
            <a href='#' className='hover:text-blue-600'><FaFacebookF/></a>
            <a href='#' className='hover:text-red-500'><FaInstagram/></a>
            <a href='#' className='hover:text-red-700'><FaPinterestP/></a>
            <a href='#' className='hover:text-sky-400'><FaTwitter/></a>
            </div>
          </div>
        </div>
        <hr className='bg-slate-900 '/>
        <div className='text-slate-200 p-0 px-4'>
        By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy and Content Policies. All trademarks are properties of their respective owners. 2021-2022 © भोjan™ Ltd. All rights reserved.
        </div>
    </div>
    
  )
}

export default Footer