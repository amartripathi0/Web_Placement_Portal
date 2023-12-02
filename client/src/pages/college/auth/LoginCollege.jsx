import React, { useEffect, useState } from "react";
import InputField from "../../../Components/inputField/InputField";
import { useForm } from "react-hook-form";
import PasswordInput from "../../../Components/inputField/PasswordInput";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingPage from "../../LoadingPage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SET_GLOBAL } from "../../../redux/features/common/globalSlice";
import { collegeStaffSignIn , RESET } from "../../../redux/features/college/auth/authSlice";

const LoginCollege = () => {
  const form = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  const { isLoading, isLoggedIn, isError, isSuccess, message } = useSelector(
    (state) => state.collegeStaffAuth
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

    function handleCollegeStaffSignin(data){
        dispatch(collegeStaffSignIn(data))
        // dispatch(RESET())
    }
    useEffect(() => {
      if(isLoggedIn && isSuccess){
         toast.success(message , {
                position : toast.POSITION.TOP_RIGHT
            })
            dispatch(SET_GLOBAL("college-staff"));

            navigate('/college-staff')
      }
      if (isError) {
        // console.log(message);
        toast.error(message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      dispatch(RESET())

    }, [isLoggedIn, isSuccess, isError, navigate]);
  return (
    <div
      className={`h-screen w-screen bg-pink-200  flex justify-center items-center ${
        isLoading && " opacity-70 bg-gray-400"
      }`}
    >
      {isLoading && <LoadingPage height="screen" width="screen" />}
      <div className="bg-slate-100  w-[80%] h-[80%] rounded-lg shadow-slate-300 shadow-md flex flex-col gap-10 justify-center items-center">
        <form
          action=""
          onSubmit={handleSubmit(handleCollegeStaffSignin)}
          noValidate
          className="flex flex-col px-14 py-20 gap-5 bg-white rounded-md shadow-grey-300 shadow-md"
        >
          <h1 className="text-3xl text-center font-medium mb-10">
            College-Staff Login
          </h1>  
          <div>
            <div className="flex flex-col gap-8">
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
                    pattern: {
                      value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                      message: "Please enter a valid Email address",
                    },
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
                  error={errors.password?.message}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-blue-800 font-semibold">Forgot Password </p>

            <button
              type="submit"
              className="border-2 bg-blue-400 border-black w-full text-xl p-3 pt-1 pb-1 mt-1 rounded-lg"
            >
              Submit
            </button>
            <p className=" font-semibold">
              Don't have an account?
              <span
                onClick={() => navigate("/signup/college-staff")}
                className="text-blue-800 underline ml-2 cursor-pointer	 "
              >
                Signup
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginCollege;
