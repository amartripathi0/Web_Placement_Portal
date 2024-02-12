import React, { useEffect, useState } from 'react'
import { FaBell } from "react-icons/fa6";
import {useDispatch , useSelector}  from 'react-redux'
import { signout , RESET } from '../../../redux/features/student/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import LoadingPage from '../../LoadingPage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RESET_GLOBAL } from '../../../redux/features/common/globalSlice';
import Button from '../../../components/buttons/Button';
import NavbarDashboard from '../../../components/header/NavbarDashboard';

const StudentDashboardHeader = ({sidemenuExpanded}) => {
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
  // console.log(showNotification);
  return (
    <NavbarDashboard
    isLoading={isLoading}
    userName={student?.personalDetail?.firstName + " "+  student?.personalDetail?.lastName}
    heading={"Student Dashboard"}
    navbarButtonHandler={handleStudentSignout}
    notficationCount={student?.notifications.length}
    notficationFrom={student?.notifications.from}
    notficationTitle={student?.notifications.title}
    notificationBody={student?.notifications.body}
    sidemenuExpanded = {sidemenuExpanded}
    />
  )
}

export default StudentDashboardHeader
