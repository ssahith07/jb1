import React from 'react'
import { FaEnvelopeOpenText, FaRocket } from "react-icons/fa6"
const Newsletter = () => {
    return (
        <div>
            <div>
                <h3 className='text-lg font-bold mb-2 flex items-center gap-2'>
                    <FaEnvelopeOpenText />
                    Job Updates to Your Email
                </h3>
                <p className='text-primary text-base mb-4'>
                    Never miss a career opportunity again! Subscribe to our job notifications and receive the latest job openings directly in your email inbox. Stay ahead of the competition and be the first to know about exciting opportunities that match your skills and interests.
                </p>

                <div className='w-full space-y-4'>
                    <input type="email" name='email' id="email" placeholder='name@gmail.com' className='w-full block py-2 pl-3 border focus:outline-none' />
                    <input type="submit" name={"Subscribe"} className='w-full block py-2 pl-3 border focus:outline-none bg-blue rounded-sm text-white cursor-pointer font-semibold' />
                </div>
            </div>

            {/* 2nd part */}

            {/* <div className='mt-20'>
                <h3 className='text-lg font-bold mb-2 flex items-center gap-2'>
                    <FaRocket />
                    Upload resume for updates.
                </h3>
                <p className='text-primary text-base mb-4'>
                Get the inside track on job opportunities tailored just for you. Upload your resume now to receive personalized job updates and take the next step in your career journey.
                </p>

                <div className='w-full space-y-4'>
                    <input type="submit" name={"Upload Resume"} className='w-full block py-2 pl-3 border focus:outline-none bg-blue rounded-sm text-white cursor-pointer font-semibold'/>
                </div>
            </div> */}
        </div>
    )
}

export default Newsletter
