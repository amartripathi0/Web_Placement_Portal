import React, { useState } from 'react'
import { FaBell } from 'react-icons/fa6'

const Notification = () => {
  const [showNotification , setShowNotification] = useState(false)

  return (
    <>
    <FaBell
    // onClick={handleNotify}
    className=' h-8 w-7 '
    />

    {showNotification &&
      <div 
      // onMouseEnter={() => setShowNotification(true)}
      onMouseLeave={() => setShowNotification(false)}
      className='flex flex-col fixed  bg-blue-100 gap-4 top-20 p-5 rounded-lg right-10  w-1/5 ' >
        
        <h1 className='text-2xl font-medium  bg-white p-3 px-4 rounded-xl hover:bg-slate-50'>Notifications</h1>
        <div className='p-4 flex flex-col gap-2 bg-pink-50 rounded-2xl hover:bg-pink-100 transition-all  duration-200'>
            <div className='flex justify-between text-xl'>
                <h1 className='bg-white p-2 rounded-xl hover:bg-slate-50'>Titile: <span className=' font-semibold'>{student?.notifications.title}</span>  </h1>
                <h1 className='bg-white p-2 rounded-xl hover:bg-slate-50'>From: <span className=' font-semibold' >{student?.notifications.from}</span> </h1>
            </div>
            <p className='text-lg font-medium text-justify px-2'>{student?.notifications.body}</p>
        </div>
      </div>}
      </>
  )
}

export default Notification
