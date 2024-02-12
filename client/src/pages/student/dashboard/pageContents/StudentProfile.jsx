import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProfileDetail,
  RESET,
  getUserData,
} from "../../../../redux/features/student/auth/authSlice";
import {
  uploadProfilePicture,
  RESET_UTILS,
} from "../../../../redux/features/student/utilsServices/utilSlice";
import { toast } from "react-toastify";
import CommonProfilePage from "../../../../components/CommonProfilePage";
const StudentProfile = () => {
  const { isLoading, isError, isSuccess, isLoggedIn, message, student } =
    useSelector((state) => state.studentAuth);
  const globalAuth = useSelector((state) => state.globalAuth);
  const dispatch = useDispatch();
  const studentUtil = useSelector((state) => state.studentUtils);

  function handleProfileUpdateForm(data) {
    const obj = { typ: "personalDetail", value: data };
    dispatch(updateProfileDetail(obj));
    toast.success("Details Updated Succesfully", {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
  useEffect(() => {
    if (globalAuth.isLoggedin) {
      dispatch(getUserData());
      toast.success("Data Fetched Succesfully", {
        position: toast.POSITION.TOP_CENTER,
      });
    }

    if (studentUtil.isSuccess) {
      dispatch(RESET_UTILS());
    }
    // dispatch(RESET())
  }, [globalAuth.isLoggedin, studentUtil.isSuccess]);

  return (
    <CommonProfilePage
      isLoading={isLoading}
      isLoggedIn={isLoggedIn}
      isSuccess={isSuccess}
      handleProfileUpdateForm={handleProfileUpdateForm}
      userAccountStatus={student?.role}
      userProfilePicture={student?.personalDetail.profilePicture}
      uploadProfilePicture={uploadProfilePicture}
      firstName={student?.personalDetail.firstName}
      lastName={student?.personalDetail.lastName}
      fathersName={student?.personalDetail.fathersName}
      mothersName={student?.personalDetail.mothersName}
      emailID={student?.personalDetail.emailID}
      phone={student?.personalDetail.phone}
    />
  );
};

export default StudentProfile;
