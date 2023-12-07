import React, { useEffect, useState } from 'react'
import {useForm} from 'react-hook-form'
import InputField from '../../../Components/inputField/InputField'
import PasswordInput from '../../../Components/inputField/PasswordInput'
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LoadingPage from '../../LoadingPage'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RESET, companyStaffSignUp } from '../../../redux/features/company/auth/authSlice';
import { IoMdArrowBack } from "react-icons/io";

const SignupCompany = () => {
  const form = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    watch,
    getValues,
    handleSubmit,
    formState: { errors },
  } = form;
  const { isLoading, isLoggedIn, isError, isSuccess, message } = useSelector((state) => state.companyAuth);
  function handleCompanyStaffSignUp(data) {
    const {cpass , emailID,firstName,lastName,password,phone ,staffID} = data
      // console.log(data);
    dispatch(companyStaffSignUp({
      personalDetail : {
        cpass , emailID,firstName,lastName,password,phone ,staffID
      },
      company : data.company
    }));

    dispatch(RESET())
  }

  useEffect(() => {
    if(isLoggedIn && isSuccess){
      navigate('/company')
    }
    
    if(isSuccess && !isLoggedIn &&  message === "Company Already Exists!"){
      navigate('/signin/company')
      toast.info("Please,Sigin", {
        position : toast.POSITION.TOP_RIGHT
    })
    }

    dispatch(RESET())

  }, [isSuccess , isLoggedIn]);

    

  return (
<div
      className={`h-screen w-screen bg-pink-200  flex justify-center items-center ${
        isLoading && " opacity-70 bg-gray-400"
      }`}
    >
      {isLoading && <LoadingPage height="screen" width="screen" />}

      <div className="bg-slate-100  w-[80%] h-[80%] relative rounded-lg shadow-slate-300 shadow-md flex flex-col gap-10 justify-center items-center">
        <div className="flex flex-col  px-14 py-5 bg-white rounded-md shadow-grey-300 shadow-md text-4xl font-medium">
          Company SignUp Form
        </div>

        <div onClick={() => navigate('/signup')}  className=" absolute top-20 left-20 bg-white p-3 border-2 border-purple-400 rounded-full hover:shadow-md ">
      <IoMdArrowBack size={20}/>
      </div>

        <form
          action=""
          onSubmit={handleSubmit(handleCompanyStaffSignUp)}
          noValidate
          className="flex flex-col p-10 py-20 gap-14 bg-white rounded-md w-1/2 shadow-grey-300 shadow-md"
        >
          <div className="flex item-center  justify-around px-10  gap-3 flex-wrap">
            <div className="flex gap-14 w-full justify-between px-5">

            
            <InputField
              placeholder="Enter your first name"
              label="First Name"
              labelName=""
              validationObj={{
                ...register("firstName", {
                  required: {
                    value: true,
                    message: "Please enter your first name.",
                  },
                }),
              }}
              error={errors.firstName?.message}
            />

            <InputField
              placeholder="Enter your last name"
              label="Last Name"
              labelName=""
              validationObj={{
                ...register("lastName", {
                  required: {
                    value: true,
                    message: "Please enter your last name.",
                  },
                }),
              }}
              error={errors.lastName?.message}
            />
</div>

<div className="flex gap-14 w-full justify-between px-5">

            <InputField
              placeholder="Enter your Email Address"
              label="E-Mail"
              labelName=""
              validationObj={{
                ...register("emailID", {
                  required: {
                    value: true,
                    message: "Please enter your email address.",
                  },
                  validate: {
                    matchPattern: (v) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                      "Email address must be a valid address",
                  },
                }),
              }}
              error={errors.emailID?.message}
            />

<InputField
              placeholder="Enter your company name"
              label="Company Name"
              labelName=""
              validationObj={{
                ...register("company", {
                  required: {
                    value: true,
                    message: "Please enter your company name.",
                  },
                }),
              }}
              error={errors.company?.message}
            />
       
</div>       
            <div className="flex  justify-between w-full px-5">
              <InputField
                placeholder="Enter your Phone Number"
                label="Phone No."
                labelName=""
                type="number"
                validationObj={{
                  ...register("phone", {
                    required: {
                      value: true,
                      message: "Please enter your Phone No.",
                    },
                    maxLength: {
                      value: 10,
                      message: "Please Enter Phone Number under 10 digits",
                    },
                    minLength: {
                      value: 10,
                      message: "Please Enter Phone Number under 10 digits",
                    },
                  }),
                }}
                error={errors.phone?.message}
              />

              <InputField
                placeholder="Enter your Staff-ID"
                label="Staff-ID"
                labelName=""
                type="number"
                validationObj={{
                  ...register("staffID", {
                    required: {
                      value: true,
                      message: "Please enter your Staff ID.",
                    },
                    // validate : (v) => {
                    //    v >= 1 || {message: "Please enter a valid Staff ID"}
                    // }
                  }),
                }}
                error={errors.staffID?.message}
              />
            </div>
            <div className="flex  justify-between w-full px-5">
              <PasswordInput
                placeholder="Enter your Password"
                label="Password"
                labelName=""
                validationObj={{
                  ...register("password", {
                    required: {
                      value: true,
                      message: "Please enter your Password.",
                    },
                    // validate : {
                    //   // passwrd : v =>
                    // }
                  }),
                }}
                error={errors.password?.message}
              />
          
            <PasswordInput
              placeholder="Enter your Confirm Password"
              label="Confirm Password"
              labelName=""
              validationObj={{
                ...register("cpass", {
                  required: {
                    value: true,
                    message: "Please enter your Confirm Password.",
                  },
                  validate: {
                    same: (v) =>
                      v === getValues().password ||
                      "Password and Confirm Password don't match!",
                  },
                }),
              }}
              error={errors.cpass?.message}
            />
          </div>
          </div>

          <div className="flex flex-col items-center gap-1">
            <p className="font-medium">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/signin/company")}
                className="text-blue-700 font-semibold underline cursor-pointer"
              >
                SignIn
              </span>
            </p>
            <p className="text-center">or</p>
            <button
              type="submit"
              className="w-40  font-semibold text-white bg-pink-500 hover:bg-pink-600 p-3 pl-6 pr-6 rounded-lg flex items-center justify-center"
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignupCompany