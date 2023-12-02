import React, { useEffect, useState } from "react";
import InputField from "../../../Components/inputField/InputField";
import { useForm } from "react-hook-form";
import PasswordInput from "../../../Components/inputField/PasswordInput";
import { useNavigate } from "react-router-dom";
import {useDispatch , useSelector} from 'react-redux'
import LoadingPage from "../../LoadingPage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {SET_GLOBAL} from '../../../redux/features/common/globalSlice'

const LoginCompany = () => {
  const form = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form; 

  const navigate = useNavigate()
  const dispatch = useDispatch()

  return (
    // ${isLoading && " opacity-50 "}
    <div className={` w-screen h-screen  flex justify-center items-center flex-col gap-10 `}>
    {/* {isLoading && <LoadingPage height = "screen" width= "screen"/>} */}
   
     <form action="" onSubmit={handleSubmit()} noValidate >
     <h1 className="text-2xl text-center">Company Login</h1>
      <div className="flex flex-col gap-6">
          <InputField
          placeholder="Enter your Email Address"
          label="E-Mail"
          labelName="emailID"
          validationObj={{
            ...register("emailID", {
              required: {
                value: true,
                message: "Please enter your email address.",
              },
            pattern : {
                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/ ,
                message : "Please enter a valid Email address"

            }
            }),
          }}
          error={errors.emailID?.message}
        />
        <div>
        <PasswordInput
          placeholder="Enter your Password"
          label="Password"
          labelName="password"
          validationObj={{
            ...register("password", {
              required: {
                value: true,
                message: "Please enter your Password.",
              },
            }),
          }}
        />

        <p className="text-blue-800 font-semibold mt-2">Forgot  Password </p>
        </div>
          <div>
        
        {/* <p className="text-red-600 text-center">{message}</p> */}
      <button type ="submit" className='border-2 bg-blue-400 border-black w-full text-xl p-3 pt-1 pb-1 mt-3 rounded-lg'>Submit</button>
         <p className=" font-semibold mt-2">Don't have an account? <span  onClick = {() => navigate('/signup/college')} className="text-blue-800 underline">Signup</span></p>
          </div>
      </div>

  
      </form>
    </div>
  )
}

export default LoginCompany