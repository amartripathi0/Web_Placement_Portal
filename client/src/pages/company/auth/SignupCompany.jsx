import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  RESET,
  companyStaffSignUp,
} from "../../../redux/features/company/auth/authSlice";
import CommonSignupForm from "../../../components/CommonSignupForm";

const SignupCompany = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { isLoading, isLoggedIn, isError, isSuccess, message } = useSelector(
    (state) => state.companyAuth
  );
  function handleCompanyStaffSignUp(data) {
    const { cpass, emailID, firstName, lastName, password, phone, staffID } =
      data;
    // console.log(data);
    dispatch(
      companyStaffSignUp({
        personalDetail: {
          cpass,
          emailID,
          firstName,
          lastName,
          password,
          phone,
          staffID,
        },
        company: data.company,
      })
    );

    dispatch(RESET());
  }

  useEffect(() => {
    if (isLoggedIn && isSuccess) {
      navigate("/company");
    }

    if (isSuccess && !isLoggedIn && message === "Company Already Exists!") {
      navigate("/signin/company");
      toast.info("Please,Sigin", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }

    dispatch(RESET());
  }, [isSuccess, isLoggedIn]);

  return (
    <CommonSignupForm
    isLoading={isLoading}
    signupHeading={"Company Signup"}
    userType={"company"}
    onSignupFormSubmitHandler={handleCompanyStaffSignUp}
    />
  );
};

export default SignupCompany;
