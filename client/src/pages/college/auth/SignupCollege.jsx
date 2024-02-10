import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

import {
  collegeStaffSignUp,
  RESET,
} from "../../../redux/features/college/auth/authSlice";
import CommonSignupForm from "../../../components/CommonSignupForm";
const SignupCollege = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, isLoggedIn, isError, isSuccess, message } = useSelector(
    (state) => state.collegeStaffAuth
  );
  function handleCollegeStaffSignUp(data) {
    // console.log(data);
    dispatch(collegeStaffSignUp(data));

    dispatch(RESET());
  }

  useEffect(() => {
    if (isLoggedIn && isSuccess) {
      // navigate('/college-staff')
    }

    if (
      isSuccess &&
      !isLoggedIn &&
      message === "College Staff Already Exists!"
    ) {
      toast.info("Please,SignIn ", {
        position: toast.POSITION.TOP_RIGHT,
      });
      navigate("/signin/college-staff");
    }

    dispatch(RESET());
  }, [isSuccess, isLoggedIn]);

return (
    <CommonSignupForm 
    isLoading={isLoading}
    signupHeading={"College Signup"}
    userType={"college-staff"}
    onSignupFormSubmitHandler={handleCollegeStaffSignUp}
    />
  );
};

export default SignupCollege;