import React, { useEffect, useState } from 'react'
import {useDispatch , useSelector}  from 'react-redux'
import { useNavigate } from 'react-router-dom';
import LoadingPage from '../../LoadingPage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RESET_GLOBAL } from '../../../redux/features/common/globalSlice';
import { RESET, collegeStaffSignOut } from '../../../redux/features/college/auth/authSlice';
import NavbarDashboard from '../../../components/header/NavbarDashboard';
export const CollegeDashHeader = ({sidemenuExpanded}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const {isLoggedIn , isLoading , isSuccess , collegeStaff , message} = useSelector(state => state.collegeStaffUtil)

    function handleCollegeStaffSignout(){
      dispatch(collegeStaffSignOut())

      dispatch(RESET())
      dispatch(RESET_GLOBAL())
 
      toast.success("Signed Out successfully",{
       position:toast.POSITION.TOP_RIGHT
     })
      navigate('/signin/')
    }

  return (
    <NavbarDashboard
    isLoading={isLoading}
    userName={collegeStaff?.personalDetail?.firstName + " "+  collegeStaff?.personalDetail?.lastName}
    heading={"College Staff Dashboard"}
    navbarButtonHandler={handleCollegeStaffSignout}
    notficationCount={collegeStaff?.notifications.length}
    notficationFrom={collegeStaff?.notifications.from}
    notficationTitle={collegeStaff?.notifications.title}
    notificationBody={collegeStaff?.notifications.body}
    sidemenuExpanded = {sidemenuExpanded}
    userType="college-staff"
    />
  )
}
