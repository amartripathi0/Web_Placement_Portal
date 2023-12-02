import React, { useEffect } from 'react'
import Header from '../../Components/header/Header'
import { Outlet, useNavigate } from 'react-router-dom'
import { RESET_GLOBAL , SET_GLOBAL, getLoginStatus } from '../../redux/features/common/globalSlice'
import {useSelector , useDispatch} from 'react-redux'
import LoadingPage from '../LoadingPage'
import { toast } from 'react-toastify'

const HomePage = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {isLoggedin ,isSuccess, isLoading, userType , message} = useSelector(state => state.globalAuth)
  const {isLoggedIn } = useSelector(state => state.studentAuth)
 
  useEffect(() => {
    dispatch(getLoginStatus())
    return (() => dispatch(RESET_GLOBAL()))
  },[])

  useEffect(() => {
    if(isLoggedin && isSuccess){
      if(userType === 'student'){
        navigate(userType)
      }
      else if(userType === 'college-staff'){
        navigate(userType)
      }
      else if(userType === 'company'){
        navigate(userType)
      }
      dispatch(SET_GLOBAL())
    }else if(message){
      toast.error(message , {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  },[isLoggedin, message])

  return (
    <div>
 {isLoading && <LoadingPage height = "screen" width= "screen"/>}
    <div className={`${isLoading ? "bg-black opacity-20": ""}`}>
        <Header/>
        <Outlet/>
    </div>
    </div>

  )
}

export default HomePage