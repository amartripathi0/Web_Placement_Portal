import React, { useEffect, useState } from "react";
import InputField from "../../../components/inputField/InputField";
import { useForm } from "react-hook-form";
import PasswordInput from "../../../components/inputField/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signin, RESET } from "../../../redux/features/student/auth/authSlice";
import LoadingPage from "../../LoadingPage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SET_GLOBAL } from "../../../redux/features/common/globalSlice";
import { IoMdArrowBack } from "react-icons/io";
import PurpleBackground from "../../../components/containers/PurpleBackground";
import SlateBackground from "../../../components/containers/SlateBackground";
import WhiteBackground from "../../../components/containers/WhiteBackground";
import Navbar from "../../../components/header/Navbar";

const LoginStudent = () => {
  const form = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const studentUtil = useSelector((state) => state.studentUtils);

  const { isLoading, isLoggedIn, isError, isSuccess, message } = useSelector(
    (state) => state.studentAuth
  );

  const loginStudent = (data, event) => {
    // console.log(data);
    dispatch(signin(data));
  };
  // console.log(message);
  useEffect(() => {
    if (isLoggedIn && isSuccess) {
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch(SET_GLOBAL("student"));
      navigate("/student");
    }
    if (isError) {
      // console.log(message);
      toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }

    dispatch(RESET());
  }, [isLoggedIn, isSuccess, isError, navigate]);

  return (
    <>
    <Navbar />
    <PurpleBackground
    additionalStyles={"pt-20 max-sm:py-5  "}
    isLoading={isLoading}
    >
      {isLoading && <LoadingPage height="screen" width="screen" />}

      <SlateBackground 
      additionalStyles={"w-4/5  max-sm:w-10/12 max-sm-h:3/4  h-4/5 relative flex-col-center  rounded-lg  " }
      >
        {/* back arrow */}
        <div
          onClick={() => navigate("/signin")}
          className=" absolute top-20 left-20 bg-white p-3 border-2 border-purple-400 rounded-full hover:shadow-md max-sm:top-7 max-sm:left-7 max-sm:p-1"
        >
          <IoMdArrowBack size={20} />
        </div>

        <form
          onSubmit={handleSubmit(loginStudent)}
          noValidate
          className="h-full w-full flex-center"
        >
        <WhiteBackground 
        additionalStyles={"flex flex-col   gap-5 w-1/3 max-tablet:w-1/2   max-sm:w-10/12 max-sm:px-4 max-sm:py-8 max-sm:h-10/12 px-10 py-10"}
        >


          {/* heading */}
          <h1 className="text-[1.8vw] text-center font-medium mb-[1vw] max-sm:text-[5vw]">
            Student Login Form
          </h1>

          {/* Input fields */}
          <div className="flex flex-col gap-[1vw]  ">
              <InputField
                placeholder="Enter your Email Address"
                label="E-Mail"
                labelClass={"text-[1vw]  max-tablet:text-[1.5vw] max-sm:text-[3.6vw]"}
                labelName="emailID"
                inputFieldStyle={"w-full h-12 max-sm:h-10 max-sm:text-xs"}
                errorMessageStyle={"max-sm:text-xs h-6 text-[1vw]"}
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
                  labelClass={"text-[1vw] max-tablet:text-[1.5vw] max-sm:text-[3.6vw]"}
                  errorMessageStyle={"max-sm:text-xs h-6 text-[1vw]"}
                  inputFieldStyle={"w-full h-12 max-sm:h-10 max-sm:text-xs"}

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

          <div className="flex flex-col gap-2">
            <p className="text-blue-800 font-semibold text-[1vw] max-tablet:text-[1.5vw] max-sm:text-[3.6vw]">Forgot Password </p>

            <button
              type="submit"
              className="border-1 font-medium bg-blue-500 text-white border-black w-full text-xl text-[1.5vw] max-sm:text-[3.6vw] flex-center py-1 mt-1 rounded-lg"
            >
              Submit
            </button>
            <p className=" font-semibold text-[1vw] max-tablet:text-[1.5vw] max-sm:text-[3.6vw]">
              Don't have an account?
              <span
                onClick={() => navigate("/signup/student")}
                className="text-blue-800 underline ml-2 cursor-pointer	 "
              >
                Signup
              </span>
            </p>
          </div>
        </WhiteBackground>
        </form>

      </SlateBackground>
    </PurpleBackground>
    </>
  );
};

export default LoginStudent;
