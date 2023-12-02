import React, { useEffect, useState } from 'react'
import {useForm} from 'react-hook-form'
import InputField from '../../../Components/inputField/InputField'
import PasswordInput from '../../../Components/inputField/PasswordInput'
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LoadingPage from '../../LoadingPage'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignupCompany = () => {
    const form = useForm()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register , watch , getValues , handleSubmit ,formState : {errors}} = form

    

  return (
    <div className='w-screen h-screen flex  justify-center items-center  text-2xl '>
    {/* {isLoading && <LoadingPage height = "screen" width= "screen" />} */}
      <form action="" onSubmit={handleSubmit()} noValidate>
      <div className='border-2 w-[70vw] border-black  gap-5 p-5 pl-10 pr-10  flex flex-col items-center rounded-md `' >
      <div className='flex item-center justify-around  flex-wrap '>

          <InputField 
           placeholder='Enter your first name'
           label="First Name"
           labelName = ""
          
           validationObj={{
            ...register('firstName', {
              required: {
                value: true,
                message: "Please enter your first name.",
              },
            }),
          }}
          error = {errors.firstName?.message }
           />

          <InputField 
           placeholder='Enter your last name'
           label="Last Name"
           labelName = ""
           validationObj={{
            ...register('lastName', {
              required: {
                value: true,
                message: "Please enter your last name.",
              },
            }),
          }}
          error = {errors.lastName?.message }
           />

          <InputField 
           placeholder='Enter your Email Address'
           label="E-Mail"
           labelName = ""
           validationObj={ {...register('emailID' , {
            required :{
             value : true ,
             message : "Please enter your email address."
            },
            validate : {
              matchPattern: (v) =>
              /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
              "Email address must be a valid address",
            }   
         })}}
          error = {errors.emailID?.message }
           />

          <InputField 
           placeholder='Enter your Phone Number'
           label="Phone No."
           labelName = ""
           type="number"
           validationObj={{...register('phone' , {
              required :{
               value : true ,
               message : "Please enter your Phone No."
              },
              maxLength : {
                  value : 10 , 
                  message : "Please Enter Phone Number under 10 digits"
              },
              minLength : {
                  value : 10 , 
                  message : "Please Enter Phone Number under 10 digits"
              },
              
           })}
          }
          error = {errors.phone?.message }
           />

          <PasswordInput
            placeholder='Enter your Password'
            label="Password"
            labelName = ""
            validationObj={{
             ...register('password', {
               required: {
                 value: true,
                 message:"Please enter your Password."
               },
                // validate : {
                //   // passwrd : v => 
                // }
             }),
           }}
           error = {errors.password?.message }
          />
        
          <PasswordInput
            placeholder='Enter your Confirm Password'
            label="Confirm Password"
            labelName = ""
            validationObj={{
             ...register('cpass', {
               required: {
                 value: true,
                 message:"Please enter your Confirm Password."
               },
               validate : {
                same: v => v  ===  getValues().password || "Password and Confirm Password don't match!"
               }
             }),
           }}
           error = {errors.cpass?.message }
          />
        



      </div>
    
      <button type='submit' className='border-2 border-black w-28 text-xl p-3 pt-1 pb-1 mt-3 rounded-lg'>Submit</button>
      <p>Already have an account? <span onClick= {() => navigate('/signin/company')} className='text-blue-700 font-semibold underline'>SignIn</span></p>

      </div>
      </form>
  </div>
  )
}

export default SignupCompany