import React, { useEffect } from "react";
import Navbar from "../../components/header/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import {
  RESET_GLOBAL,
  SET_GLOBAL,
  getLoginStatus,
} from "../../redux/features/common/globalSlice";
import { useSelector, useDispatch } from "react-redux";
import LoadingPage from "../LoadingPage";
import { toast } from "react-toastify";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedin, isSuccess, isLoading, userType, message } = useSelector(
    (state) => state.globalAuth
  );
  const { isLoggedIn } = useSelector((state) => state.studentAuth);

  useEffect(() => {
    console.log("u", userType);
    if (isLoggedin && isSuccess && userType !== "") {
      navigate(userType);
      // if(userType === 'student'){
      // }
      // else if(userType === 'college-staff'){
      //   // navigate(userType)
      // }
      // else if(userType === 'company'){
      //   // navigate(userType)
      // }
    } else {
      dispatch(getLoginStatus());

      dispatch(RESET_GLOBAL());
    }
  }, [isLoggedin, userType]);

  return (
    <div>
      {isLoading && <LoadingPage height="screen" width="screen" />}
      <div className={`relative ${isLoading ? "bg-black opacity-0" : ""}`}>
        <Navbar />
        <Outlet />

       
      </div>
    </div>
  );
};

export default HomePage;
