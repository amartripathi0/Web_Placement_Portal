import React, { useEffect } from "react";
import InputWithEdit from "../../../../components/inputField/InputWithEdit";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import { NavLink } from "react-router-dom";
import {
  getJobs,
  jobApplyByStudent,
} from "../../../../redux/features/student/utilsServices/utilSlice";
import JobCard from "../../../../components/job-card";
import UserLayout from "../../../../components/layout/UserLayout";

const JobVacancies = () => {
  const { isLoggedIn, isError, isSuccess, isLoading, data, message } =
    useSelector((state) => state.studentUtils);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess && data) {
      // console.log(data);
    } else {
      dispatch(getJobs());
    }
  }, [isSuccess, data, dispatch, message]);

  // console.log(message);
  // if(message) {
  //   toast.success(message , {
  //     position : toast.POSITION.TOP_RIGHT
  //   })
  // }
  function handleJobApply(jobID) {
    // console.log(jobID);
    dispatch(jobApplyByStudent(jobID));
  }
  return (
    <UserLayout slateBgStyles={"flex flex-col gap-8 w-2/3 p-8 bg-neutral-50"}>
      {data &&
        data.map((eachCompany) => (
          <JobCard key={eachCompany.company} company={eachCompany} handleJobApply ={handleJobApply}/>
        ))}
    </UserLayout>
  );
};

export default JobVacancies;
