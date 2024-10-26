import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../../../redux/features/student/auth/authSlice";
import { toast } from "react-toastify";
import { SET_GLOBAL } from "../../../redux/features/common/globalSlice";
import CommonLoginForm from "../../../components/CommonLoginForm";

const LoginStudent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isLoggedIn, isError, isSuccess, message } = useSelector(
    (state) => state.studentAuth
  );

  const handleStudentLoginSubmit = (data, event) => {
    dispatch(signin(data));
  };
  useEffect(() => {
    if (isLoggedIn && isSuccess) {
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch(SET_GLOBAL("student"));
      navigate("/student");
    }
    if (isError) {
      toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [isLoggedIn, isSuccess, isError, navigate]);

  return (
    <CommonLoginForm
      isLoading={isLoading}
      onLoginFormSubmitHandler={handleStudentLoginSubmit}
      userType={"student"}
      loginFormHeading={"Student Login Form "}
    />
  );
};

export default LoginStudent;
