import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signup, RESET } from "../../../redux/features/student/auth/authSlice";
import CommonSignupForm from "../../../components/CommonSignupForm";

function SignUpStudent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, isLoggedIn, isSuccess, isError, message } = useSelector(
    (state) => state.studentAuth
  );
  
  const handleStudentStaffSignUp = async (data) => {
    // console.log(data);
    dispatch(signup(data));
  };
  useEffect(() => {
    if (isLoggedIn && isSuccess) {
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      navigate("/student");
    } else if (isError) {
      toast.warning(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      if (message == "Student Already Exists!") {
        toast.info("Please ,Sign In", {
          position: toast.POSITION.TOP_RIGHT,
        });
        navigate("/signin/student");
      }
    }
    dispatch(RESET());
  }, [isLoggedIn, isSuccess, isError, dispatch, message]);

  return (
    <CommonSignupForm 
    isLoading={isLoading}
    signupHeading={"Student Signup"}
    userType={"student"}
    onSignupFormSubmitHandler={handleStudentStaffSignUp}
    />
  );
}

export default SignUpStudent;


