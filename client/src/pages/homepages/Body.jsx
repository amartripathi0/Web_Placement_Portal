import React from 'react'

const Body = () => {
    return (       
        <div className='flex justify-around items-center  bg-gradient-to-r from-cyan-200  to-pink-300 h-screen'>
            <div className='w-[40%] flex flex-col gap-10  mt-[-80px] justify-around'>
                <h1 className='text-[4.5rem]  leading-[70px] font-bold pl-10'>YOUR GATEWAY TO SUCCESS🔥 </h1>

                <p className='text-md text-justify text-black  font-medium bg-pink-200 ml-10 mr-10 p-5 rounded-md '>

                    Welcome to the Placement Portal. Discover limitless opportunities, connect with top employers, and accelerate your career journey. Get ready to step into a world of possibilities.

                    Explore job openings, build your resume, and network with professionals. For employers, find exceptional talent to drive your organization forward.

                    Unlock your potential with Placement Portal!</p>
                
                <button className='  w-72 ml-10 h-12 text-white bg-cyan-500 hover:bg-cyan-600 hover:text-pink-300 pr-9  rounded-xl text-2xl font-semibold'>MORE DETAILS . . . .</button>

             
            </div>

            <div className='w-[35%] bg-purple-400  mt-[-80px] '>
                <img  alt="no" src="https://kiit.ac.in/wp-content/uploads/2023/02/Placement-2023.jpg" className='h-[100%]   opacity-80  rounded-lg ' />

            </div>
       
        </div>
 
    )
}
export default Body;
