import React, { useEffect, useState } from 'react'
import { FaBell } from "react-icons/fa6";
import {useDispatch , useSelector}  from 'react-redux'
import { useNavigate } from 'react-router-dom';
import LoadingPage from '../../LoadingPage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RESET_GLOBAL } from '../../../redux/features/common/globalSlice';
import { companyStaffSignOut , RESET } from '../../../redux/features/company/auth/authSlice';
import NavbarDashboard from '../../../components/header/NavbarDashboard';


const CompanyDashHeader = ({sidemenuExpanded}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const { isLoggedIn, isLoading, isSuccess, company, message } =
    useSelector((state) => state.companyUtil);

  function handleCompanySignout(){
    dispatch(companyStaffSignOut())

    dispatch(RESET())
    dispatch(RESET_GLOBAL())

    toast.success("Signed Out successfully",{
     position:toast.POSITION.TOP_RIGHT
   })
    navigate('/signin/')
  }

return(
  <NavbarDashboard
  isLoading={isLoading}
  userName={company?.personalDetail?.firstName + " "+  company?.personalDetail?.lastName}
  heading={"company Dashboard"}
  navbarButtonHandler={handleCompanySignout}
  notficationCount={company?.notifications.length}
  notficationFrom={company?.notifications.from}
  notficationTitle={company?.notifications.title}
  notificationBody={company?.notifications.body}
  sidemenuExpanded = {sidemenuExpanded}
  />
)
}

export default CompanyDashHeader
