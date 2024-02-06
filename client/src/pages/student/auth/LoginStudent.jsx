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
    <PurpleBackground
    isLoading={isLoading}
    >
      {isLoading && <LoadingPage height="screen" width="screen" />}

      <SlateBackground 
      additionalStyles={"w-4/5 h-4/5 relative flex-col-center gap-10  rounded-lg"}
      >
        {/* back arrow */}
        <div
          onClick={() => navigate("/signin")}
          className=" absolute top-20 left-20 bg-white p-3 border-2 border-purple-400 rounded-full hover:shadow-md "
        >
          <IoMdArrowBack size={20} />
        </div>

        <form
          action=""
          onSubmit={handleSubmit(loginStudent)}
          noValidate
          className="flex flex-col px-14 py-5 gap-5 w-2/5 h-11/12 "
        >
          <h1 className="text-3xl text-center font-medium mb-10">
            Student Login Form
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
                onClick={() => navigate("/signup/student")}
                className="text-blue-800 underline ml-2 cursor-pointer	 "
              >
                Signup
              </span>
            </p>
          </div>
        </form>
      </SlateBackground>
    </PurpleBackground>
  );
};

export default LoginStudent;
