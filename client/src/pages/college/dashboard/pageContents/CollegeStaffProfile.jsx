import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  RESET_COLLEGE_UTIL,
  collegeStaffProfileUpdate,
  getCollegeStaffData,
  uploadProfilePicture,
} from "../../../../redux/features/college/utilServices/collegeUtilSlice";
import CommonProfilePage from "../../../../components/CommonProfilePage";

const CollegeStaffProfile = () => {
  const globalAuth = useSelector((state) => state.globalAuth);
  const {
    isLoggedIn,
    isLoading,
    isSuccess,
    collegeStaff,
    message,
    isProfilePhotoUploaded,
  } = useSelector((state) => state.collegeStaffUtil);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isSuccess && message) {
      toast.success(message, {
        position: toast.POSITION.TOP_CENTER,
      });
    } else if (globalAuth.isLoggedin && isProfilePhotoUploaded) {
      // console.log(isProfilePhotoUploaded);

      dispatch(RESET_COLLEGE_UTIL());

      toast.success("Data Fetched Succesfully", {
        position: toast.POSITION.TOP_CENTER,
      });
    }

    // dispatch(RESET())
  }, [message, collegeStaffProfileUpdate, isProfilePhotoUploaded]);

  // useEffect(() => {
  //   if (isProfilePhotoUploaded && isSuccess) {
  //     toast.success(message, {
  //       position: toast.POSITION.TOP_CENTER,
  //     });

  //   }
  //   dispatch(RESET_COLLEGE_UTIL());
  // }, [isProfilePhotoUploaded]);



  return (
    <CommonProfilePage
    isLoading={isLoading}
    isLoggedIn={isLoggedIn}
    isSuccess={isSuccess}
    userAccountStatus={collegeStaff?.role}
    userProfilePicture={collegeStaff?.personalDetail.profilePicture}
    uploadProfilePicture={uploadProfilePicture}
    updateProfileDetail={collegeStaffProfileUpdate}
    firstName={collegeStaff?.personalDetail.firstName}
    lastName={collegeStaff?.personalDetail.lastName}
    staffID={collegeStaff?.personalDetail.staffID}
    emailID={collegeStaff?.personalDetail.emailID}
    phone={collegeStaff?.personalDetail.phone}
    userType={"college-staff"}
  />
  );
};

export default React.memo(CollegeStaffProfile);
