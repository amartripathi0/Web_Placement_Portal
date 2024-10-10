import React, { useEffect, useState } from "react";
import InputWithEdit from "../../../../components/inputField/InputWithEdit";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import { NavLink } from "react-router-dom";
import {
  companyProfileUpdate,
  getCompanyData,
} from "../../../../redux/features/company/utilService/companyUtilSlice";
import { RESET } from "../../../../redux/features/company/auth/authSlice";

const JobPosts = () => {
  const dispatch = useDispatch();
  const {
    isLoggedIn,
    isLoading,
    isSuccess,
    company,
    message,
    isProfilePhotoUploaded,
  } = useSelector((state) => state.companyUtil);

  const globalAuth = useSelector((state) => state.globalAuth);

  const form = useForm();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = form;

  const [applicationStatus, setApplicationStatus] = useState("Open");
  function handleUploaJobDetails(data) {
    // console.log("applicationStatus" , applicationStatus);
    const qualifications = data.qualifications.split(".");
    const projectData = {
      typ: "jobs",
      value: { ...data, status: applicationStatus, qualifications },
    };
    // console.log(projectData);
    dispatch(companyProfileUpdate(projectData));

    dispatch(RESET());
  }

  // console.log(company);
  useEffect(() => {
    if (globalAuth.isLoggedIn) {
      dispatch(getCompanyData());

      dispatch(RESET());
    }
  }, [globalAuth.isLoggedIn]);

  useEffect(() => {
    // console.log(message);
    if (isSuccess) {
      toast.success(message, {
        position: toast.POSITION.TOP_CENTER,
      });

      dispatch(getCompanyData());
    }
  }, [isSuccess, companyProfileUpdate, dispatch]);

  return (
    <div
      className={` bg-purple-100 p-10 px-40 flex flex-col gap-7 justify-center items-center 
   
    `}
    >
      <div className="bg-slate-100 py-20 w-full rounded-lg shadow-slate-300 shadow-md flex justify-center items-center">
        <form
          onSubmit={handleSubmit(handleUploaJobDetails)}
          className="flex flex-col items-center p-10 gap-12 bg-white rounded-md w-[85%] shadow-grey-300 shadow-md"
        >
          <div>
            <h1 className="text-4xl ">New Job Form</h1>
          </div>

          <div className=" flex flex-wrap px-16 gap-4  justify-between">
            <div className="flex items-center  justify-between w-[45%]   py-3 px-6 rounded-md  hover:bg-purple-100 ">
              <h2 className="text-xl">Job Role</h2>
              <InputWithEdit
                type="text"
                placeholder="Job Role"
                validationObj={{
                  ...register("role", {
                    required: {
                      value: true,
                      message: "Please enter the Job Role.",
                    },
                  }),
                }}
                error={errors.role?.message}
              />
            </div>

            <div className="flex items-center   justify-between w-[45%]  py-3 px-6 rounded-md  hover:bg-purple-100 ">
              <h2 className="text-xl">Job Description</h2>
              <InputWithEdit
                type="text"
                placeholder="Job Description"
                validationObj={{
                  ...register("description", {
                    required: {
                      value: true,
                      message: "Please enter your Job Description.",
                    },
                  }),
                }}
                error={errors.description?.message}
              />
            </div>
            <div className="flex items-center  justify-between w-[45%] py-3 px-6 rounded-md  hover:bg-purple-100 ">
              <h2 className="text-xl">Job Qualifications</h2>
              <InputWithEdit
                type="text"
                placeholder="Job Qualifications separeted by comma "
                validationObj={{
                  ...register("qualifications", {
                    required: {
                      value: true,
                      message: "Please enter the job qualifications",
                    },
                  }),
                }}
                error={errors.qualifications?.message}
              />
            </div>

            <div className="flex items-center   justify-between w-[45%]  py-3 px-6 rounded-md  hover:bg-purple-100 ">
              <h2 className="text-xl">Start Date</h2>
              <InputWithEdit
                type="date"
                placeholder="Job application start date."
                validationObj={{
                  ...register("startDate", {
                    required: {
                      value: true,
                      message: "Please enter the start date of application",
                    },
                  }),
                }}
                error={errors.startDate?.message}
              />
            </div>

            <div className="flex items-center   justify-between w-[45%]  py-3 px-6 rounded-md  hover:bg-purple-100 ">
              <h2 className="text-xl">
                Application Status: <span>{company?.jobs.status} </span>
              </h2>
              <select
                name="applicationStatus"
                id=""
                onChange={(e) => setApplicationStatus(e.target.value)}
              >
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
            <div className="flex items-center   justify-between w-[45%]  py-3 px-6 rounded-md  hover:bg-purple-100 ">
              <h2 className="text-xl">Application Deadline</h2>
              <InputWithEdit
                type="date"
                placeholder="Job Application Deadline."
                validationObj={{
                  ...register("applicationDeadline", {
                    required: {
                      value: true,
                      message: "Please enter the deadline date of application",
                    },
                  }),
                }}
                error={errors.applicationDeadline?.message}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-60  font-semibold text-white bg-pink-500 hover:bg-pink-600 p-3 pl-6 pr-6 rounded-lg flex items-center justify-center"
          >
            Save
          </button>
        </form>
      </div>

      <div
        className={`flex flex-col gap-10 w-full bg-slate-100 full ${
          company?.jobs.length !== 0 && "py-20"
        } rounded-lg shadow-slate-300 shadow-md  justify-center items-center`}
      >
        {company?.jobs.map((eachJob) => (
          <div
            key={nanoid()}
            className={`flex flex-col p-14 px-20 gap-6 bg-white rounded-md w-[85%] shadow-grey-300 shadow-md transition-all duration-150 ${
              eachJob.status == "Open" && "hover:shadow-green-500"
            } ${eachJob.status == "Closed" && "hover:shadow-red-500"}`}
          >
            <div className="flex gap-10 items-center text-xl font-semibold">
              <div className="">
                Job No: {company.jobs.indexOf(eachJob) + 1}
              </div>
              <div className="flex gap-3  items-center justify-center">
                <h1 className="text-xl ">Status: </h1>
                <span
                  className={` ${
                    eachJob.status == "Open" && " text-green-600"
                  } ${eachJob.status == "Closed" && " text-red-500"}`}
                >
                  {eachJob.status}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between w-full ">
              <div className="flex gap-3 w-1/3 items-center ">
                <h1 className="text-2xl ">Job Role: </h1>
                <span className=" font-bold text-2xl ">{eachJob.role}</span>
              </div>

              <div className="flex gap-3 w-1/3 items-center ">
                <h1 className="text-2xl ">Start Date: </h1>
                <span className=" font-bold text-2xl ">
                  {eachJob.startDate.split("T")[0]}
                </span>
              </div>

              <div className="flex gap-3 w-1/3 items-center ">
                <h1 className="text-2xl ">End Date: </h1>
                <span className=" font-bold text-2xl ">
                  {eachJob.applicationDeadline.split("T")[0]}
                </span>
              </div>

              <div className="flex gap-3 w-1/3 justify-end items-center">
                <h1 className="text-2xl"> Qualifications:</h1>
                <div>
                  {eachJob.qualifications.map((qual) => (
                    <span className="font-medium text-xl"> {qual}</span>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-xl mt-5 ">
              Description:{" "}
              <span className="font-medium">{eachJob.description}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobPosts;
