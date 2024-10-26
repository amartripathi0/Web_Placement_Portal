import React, { useEffect } from "react";
import Navbar from "../../components/header/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { getLoginStatus } from "../../redux/features/common/globalSlice";
import { useSelector, useDispatch } from "react-redux";
import LoadingPage from "../LoadingPage";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedin, isSuccess, isLoading, userType } = useSelector(
    (state) => state.globalAuth
  );
  useEffect(() => {
    if (isLoggedin && isSuccess && userType !== "") {
      navigate(userType);
    } else {
      dispatch(getLoginStatus());
    }
  }, [isLoggedin, userType]);

  return (
    <main>
      {isLoading && <LoadingPage />}
      <section className={`relative`}>
        <Navbar />
        <Outlet />
      </section>
    </main>
  );
};

export default HomePage;
