import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { SET_GLOBAL } from "../../../redux/features/common/globalSlice";
import {
  RESET,
  companyStaffSignIn,
} from "../../../redux/features/company/auth/authSlice";
import CommonLoginForm from "../../../components/CommonLoginForm";

const LoginCompany = () => {


  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isLoggedIn, isError, isSuccess, message } = useSelector(
    (state) => state.companyAuth
  );

  function handleCompanyLoginSubmit(data) {
    dispatch(companyStaffSignIn(data));
    // dispatch(RESET())
  }
  useEffect(() => {
    if (isLoggedIn && isSuccess) {
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch(SET_GLOBAL("company"));

      navigate("/company");
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
    onLoginFormSubmitHandler={handleCompanyLoginSubmit}
    userType={'company'}
    loginFormHeading={"Company Login Form "}
  />
  );
};

export default LoginCompany;
