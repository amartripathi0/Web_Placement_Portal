import React, { useEffect, useState } from 'react'
import { FaBell } from "react-icons/fa6";
import {useDispatch , useSelector}  from 'react-redux'
import { signout , RESET } from '../../../redux/features/student/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import LoadingPage from '../../LoadingPage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RESET_GLOBAL } from '../../../redux/features/common/globalSlice';

const StudentDashboardHeader = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isLoading, isLoggedIn, isError, isSuccess, student ,  message , statusCode } = useSelector((state) => state.studentAuth );
 
   function handleStudentSignout(){
     dispatch(signout())

     dispatch(RESET())
     dispatch(RESET_GLOBAL())

     toast.success("Signed Out successfully",{
      position:toast.POSITION.TOP_RIGHT
    })
     navigate('/signin/')
  }

  const [showNotification , setShowNotification] = useState(false)
  console.log(showNotification);
  return (
    <div className={`h-20 justify-between  border-slate-400 border-b-2 
    flex items-center px-10 z-40 bg-slate-50 ${isLoading && " opacity-50 "}`} >

      <div className='h-full  flex items-center gap-4'>
        <h1 className='text-2xl font-medium hover:underline hover:font-semibold'>{student?.personalDetail?.firstName + " "+  student?.personalDetail?.lastName }</h1>
      </div>

      <h1 className='text-3xl font-medium'>Student Dashboard</h1>


<div className=' flex flex-col h-full w-56'>
      <div className='flex justify-between  items-center gap-5 h-full 

     '      
      >
      <div className='w-16 h-full flex items-center justify-center
      '
      onMouseEnter={() => setShowNotification(true)}
      onClick={() => setShowNotification(false)}
      >

<div className='relative'>
      <FaBell
      // onClick={handleNotify}
      className=' h-8 w-7 '
      />
              <div className='rounded-full bg-red-500 text-white h-7 w-7 absolute bottom-4 left-3 flex justify-center items-center font-semibold text-md'>{student?.notifications.length || 0}</div>
              </div>
      </div>
     
      <button 
      onClick={handleStudentSignout} 
      className='w-30 font-semibold text-white bg-pink-500 hover:bg-pink-600 p-3 pl-6 pr-6 rounded-lg flex items-center justify-center'>Sign Out</button>
      </div >

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
      </div>
    </div>
  )
}

export default StudentDashboardHeader