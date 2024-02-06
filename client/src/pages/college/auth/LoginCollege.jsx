import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { SET_GLOBAL } from "../../../redux/features/common/globalSlice";
import {
  collegeStaffSignIn,
  RESET,
} from "../../../redux/features/college/auth/authSlice";
import CommonLoginForm from "../../../components/CommonLoginForm";

const LoginCollege = () => {
  const { isLoading, isLoggedIn, isError, isSuccess, message } = useSelector(
    (state) => state.collegeStaffAuth
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleCollegeStaffLoginSubmit(data) {
    dispatch(collegeStaffSignIn(data));
    // dispatch(RESET())
  }
  useEffect(() => {
    if (isLoggedIn && isSuccess) {
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch(SET_GLOBAL("college-staff"));

      navigate("/college-staff");
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

    <CommonLoginForm
    isLoading={isLoading}
    onLoginFormSubmitHandler={handleCollegeStaffLoginSubmit}
    userType={'college-staff'}
    loginFormHeading={"College Login Form "}
  />
  );
};

export default LoginCollege;
