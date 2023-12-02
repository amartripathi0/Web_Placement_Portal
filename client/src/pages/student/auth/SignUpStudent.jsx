import React, { useEffect, useState } from 'react'
import {useForm} from 'react-hook-form'
import InputField from '../../../Components/inputField/InputField'
import PasswordInput from '../../../Components/inputField/PasswordInput'
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LoadingPage from '../../LoadingPage'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { signup , RESET  } from '../../../redux/features/student/auth/authSlice'

function SignUpStudent() {
    const form = useForm()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { isLoading, isLoggedIn, isError, isSuccess, message , statusCode } = useSelector((state) => state.studentAuth );
    
    const {register , watch , getValues , handleSubmit ,formState : {errors}} = form
    const [studentData , setStudentData]  = useState({})
    const passwrd = watch("password", false);

    const formSubmit = async (data) =>{
      await dispatch(signup(data))

    }
    useEffect(() => {
      if(isLoggedIn && isSuccess){
        toast.success("Account created successfully!" , {
          position : toast.POSITION.TOP_RIGHT
        })
        
        navigate('/student')
      }
      if(statusCode === 409){ 
        toast.warning("Account already exists" , {
          position : toast.POSITION.TOP_RIGHT
        })
        toast("Please ,Sign In" , {
          position : toast.POSITION.TOP_RIGHT
        })
        navigate('/signin/student')
      }
      dispatch(RESET())
    }, [isLoggedIn , isSuccess , dispatch , statusCode])
  return (

    <div className={`h-screen w-screen bg-purple-100  flex justify-center items-center ${
      (isLoading ) && " opacity-70 bg-gray-400"
    }`}>
      {(isLoading) && <LoadingPage height = "screen" width= "screen" />}

      <div className="bg-slate-100  w-[80%] h-[80%] rounded-lg shadow-slate-300 shadow-md flex flex-col gap-10 justify-center items-center"
>
          <div className="flex flex-col px-14 py-5 bg-white rounded-md shadow-grey-300 shadow-md text-4xl font-medium">

            Student SignUp Form
          </div>
        <form action="" onSubmit={handleSubmit(formSubmit)} noValidate
        className="flex flex-col p-10 py-20 gap-14 bg-white rounded-md w-1/2 shadow-grey-300 shadow-md">
        <div className='flex item-center  justify-around px-10  gap-3 flex-wrap'>

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
             label="Phone Number."
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
        <div className='flex flex-col items-center gap-1'>
        <p className='font-medium'>Already have an account? <span onClick= {() => navigate('/signin/student')} className='text-blue-700 font-semibold underline cursor-pointer'>SignIn</span></p>
          <p className='text-center'>or</p>
        <button type='submit' className="w-40  font-semibold text-white bg-pink-500 hover:bg-pink-600 p-3 pl-6 pr-6 rounded-lg flex items-center justify-center"
>
          Signup</button>

      </div>
        </form>
        </div>
    </div>
  )
}

export default SignUpStudent
 

      
        {/* <div className='flex flex-col gap-2'>
            <label htmlFor="lname" className='text-xl'>Last Name</label>
            <input type="text" name="" id="lname" placeholder='Enter your last name'
              className='border-black border-2 h-10 text-sm rounded-md pl-3 w-[24vw]'
              {...register('lname' , {
                required :{
                 value : true ,
                 message : "Please enter your last name."
                }
             })} />
            <p className='text-red-500  font-medium text-[17px]'> {errors.lname?.message }</p>
        </div> */}

        {/* <div className='flex flex-col gap-2'>
            <label htmlFor="email" className='text-xl'>Email</label>
            <input type="text" name="" id="email" placeholder='Enter your Email'
              className='border-black border-2 h-10 text-sm rounded-md pl-3 w-[24vw]'
              {...register('email' , {
                required :{
                 value : true ,
                 message : "Please enter your email address."
                },
                validate : {
                    pattern : /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
                
                }   
             })} />
            <p className='text-red-500  font-medium text-[17px]'> {errors.email?.message }</p>
        </div> */}

        {/* <div className='flex flex-col gap-2'>
            <label htmlFor="phno" className='text-xl'>Phone Number</label>
            <input type="number" name="" id="phno" placeholder='Enter your phone number' 
              className='border-black border-2 h-10 text-sm rounded-md pl-3 w-[24vw]'
              {...register('phno' , {
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
                }
             })} />
            <p className='text-red-500  font-medium text-[17px]'> {errors.phno?.message }</p>
        </div> */}

        {/* <div className='flex flex-col gap-2'>
            <label htmlFor="password" className='text-xl'>Password</label>
            <input type="text" name="" id="" placeholder='Enter your password'
              className='border-black border-2 h-10 text-sm rounded-md pl-3 w-[24vw]'
              {...register('password' , {
                required :{
                 value : true ,
                 message : "Please enter your password."
                }
             })} />
            <p className='text-red-500  font-medium text-[17px]'> {errors.password?.message }</p>
        </div> */}

        {/* <div className='flex flex-col gap-2'>
            <label htmlFor="cpass" className='text-xl'>Confirm Password</label>
            <input type="text" name="" id="cpass"  placeholder='Enter your confirm password' 
              className='border-black border-2 h-10 text-sm rounded-md pl-3 w-[24vw]'
               {...register('cpass' , {
                required : {
                    value : true , 
                    message : "Please enter your confirm password"
                }
               })}/>
               <p className='text-red-500  font-medium text-[17px]'>{errors.cpass?.message }</p>
        </div> */}

       
 /* <div
className={`h-full bg-purple-100  flex justify-center items-center ${
  (isLoading || studentUtil.isLoading) && " opacity-70 bg-gray-400"
}`}
>
<div className="bg-slate-100  w-[90%] h-[90%] rounded-lg shadow-slate-300 shadow-md flex justify-center items-center"
>

 <div className="flex flex-col p-20 gap-3 bg-white rounded-md w-[85%] shadow-grey-300 shadow-md">

 </div>
</div>

</div> */