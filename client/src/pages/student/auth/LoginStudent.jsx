import React, { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signin, RESET } from "../../../redux/features/student/auth/authSlice";
import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { SET_GLOBAL } from "../../../redux/features/common/globalSlice";
import CommonLoginForm from "../../../components/CommonLoginForm";

const LoginStudent = () => {
  const studentUtil = useSelector((state) => state.studentUtils);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isLoggedIn, isError, isSuccess, message } = useSelector(
    (state) => state.studentAuth
  );

  const handleStudentLoginSubmit = (data, event) => {
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
    <CommonLoginForm 
      isLoading={isLoading}
      onLoginFormSubmitHandler={handleStudentLoginSubmit}
      userType={'student'}
      loginFormHeading={"Student Login Form "}
    />
  );
};

export default LoginStudent;
