import React from 'react'
import { Link } from 'react-router-dom';

const Body = () => {
    return (       
        <div className='flex-center max-sm:flex-col max-sm:justify-between  py-20 gap-[10vw]  max-sm:pb-36 bg-gradient-to-r from-cyan-200  to-pink-300 h-screen'>
          
          {/* left side */}
            <div className='w-[40%] flex flex-col  gap-[3vw] max-sm:w-4/5 justify-around p-6  '>

                {/* Placement Nexus heading */}
                <div className='font-extrabold text-[6vw] max-sm:text-[11vw]' >

                <h1 className='opacity-95'
                >PLACEMENT</h1>
                <h1
                className=' leading-3 opacity-90'
                >NEXUS</h1>
                </div>

                <p className='text-[2vw] font-semibold text-slate-700 ml-2 max-sm:text-[4vw]'>your gateway to success🔥 </p>

                <p className='text-[1vw] text-justify font-medium bg-pink-200  p-5 max-sm:p-2 max-sm:text-[2vw] rounded-md  max-sm:w-10/12 '>

                    Welcome to the Placement Nexus. Discover limitless opportunities, connect with top employers, and accelerate your career journey. Get ready to step into a world of possibilities.
                    <br />  
                    Explore job openings, build your resume, and network with professionals. For employers, find exceptional talent to drive your organization forward.

                    Unlock your potential with Placement Portal!</p>
                
                <Link to={'/about'} className='  text-white bg-cyan-500 hover:bg-cyan-600 hover:text-pink-300   rounded-xl text-[1vw] max-sm:text-[2vw] flex- w-2/5 p-2 px-5 font-semibold'>MORE DETAILS . .</Link>

             
            </div>

            {/* right image */}
            <div className='w-[35%] max-sm:w-8/12 bg-purple-400 rounded-xl '>
                <img  alt="placement" src="https://kiit.ac.in/wp-content/uploads/2023/02/Placement-2023.jpg" className='h-[100%]   opacity-80  rounded-xl ' />

            </div>
       
        </div>
 
    )
}
export default Body;
