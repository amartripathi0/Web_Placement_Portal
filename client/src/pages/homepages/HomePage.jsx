import React, { useEffect } from "react";
import Navbar from "../../components/header/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { getLoginStatus } from "../../redux/features/common/globalSlice";
import { useSelector, useDispatch } from "react-redux";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedin, isSuccess, userType } = useSelector(
    (state) => state.globalAuth
  );
  useEffect(() => {
    if (
      isLoggedin &&
      isSuccess &&
      userType !== ("visitor" || "")
    ) {
      navigate(userType);
    } else {
      dispatch(getLoginStatus());
    }
  }, [isLoggedin, userType]);

  return (
    <main>
      <section className={`relative`}>
        <Navbar />
        <Outlet />
      </section>
    </main>
  );
};

export default HomePage;
