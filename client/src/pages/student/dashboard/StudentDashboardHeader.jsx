import React, { useEffect } from 'react'
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
  return (
    <div className={`h-20 justify-between  border-slate-800 border-b-2 
    flex items-center px-10 z-40 bg-slate-50 ${isLoading && " opacity-50 "}`} >

      <div className='h-full  flex items-center gap-4'>
        <h1 className='text-2xl font-medium hover:underline hover:font-semibold'>{student?.personalDetail?.firstName + " "+  student?.personalDetail?.lastName }</h1>
      </div>

      <h1 className='text-3xl font-medium'>Student Dashboard</h1>

      <div className='flex items-center gap-5 h-full '>
      <FaBell size={20}/>
      
      <button onClick={handleStudentSignout} className='w-30 font-semibold text-white bg-pink-500 hover:bg-pink-600 p-3 pl-6 pr-6 rounded-lg flex items-center justify-center'>Sign Out</button>
      </div>
    </div>
  )
}

export default StudentDashboardHeader