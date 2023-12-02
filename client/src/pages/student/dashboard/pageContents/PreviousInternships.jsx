import React, { useEffect } from "react";
import InputWithEdit from "../../../../Components/inputField/InputWithEdit";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import {
  RESET_GLOBAL,
  SET_GLOBAL,
  getLoginStatus,
} from "../../../../redux/features/common/globalSlice";
import {
  RESET,
  getUserData,
  updateProfileDetail,
} from "../../../../redux/features/student/auth/authSlice";

const PreviousInternships = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, isLoggedIn, message, student } =
    useSelector((state) => state.studentAuth);
  const globalAuth = useSelector((state) => state.globalAuth);
  const studentUtil = useSelector((state) => state.studentUtils);

  const form = useForm();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = form;

  function handleUploadInternshipDetails(data) {
    const internshipData = { typ: "internships", value: data };
    dispatch(updateProfileDetail(internshipData));

    dispatch(RESET());

  }
  useEffect(() => {
    if (globalAuth.isLoggedIn) {
      dispatch(getUserData());

      dispatch(RESET());
    }
  }, [globalAuth.isLoggedIn]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(message, {
        position: toast.POSITION.TOP_CENTER,
      });

      dispatch(getUserData())
    }
  }, [updateProfileDetail, isSuccess , dispatch]);
  return (
    <div
      className={` bg-purple-100 p-10 px-40 flex flex-col gap-7 justify-center items-center ${
        (isLoading || studentUtil.isLoading) && "  blur-sm bg-gray-400"
      }`}
    >
      <div className="bg-slate-100 py-20 w-full rounded-lg shadow-slate-300 shadow-md flex justify-center items-center">
        <form
          onSubmit={handleSubmit(handleUploadInternshipDetails)}
          className="flex flex-col items-center p-10 gap-12 bg-white rounded-md w-[85%] shadow-grey-300 shadow-md"
        >
          <div>
            <h1 className="text-4xl ">Internship-Form</h1>
          </div>

          <div className=" flex flex-wrap px-16 gap-4  justify-between">
            <div className="flex items-center  justify-between w-[45%]   py-3 px-6 rounded-md  hover:bg-purple-100 ">
              <h2 className="text-xl">Company Name</h2>
              <InputWithEdit
                type="text"
                placeholder="Company"
                validationObj={{
                  ...register("company", {
                    required: {
                      value: true,
                      message: "Please enter the company name.",
                    },
                  }),
                }}
                error={errors.company?.message}
              />
            </div>

            <div className="flex items-center   justify-between w-[45%]  py-3 px-6 rounded-md  hover:bg-purple-100 ">
              <h2 className="text-xl">Intern Role</h2>
              <InputWithEdit
                type="text"
                placeholder="Intern Role"
                validationObj={{
                  ...register("role", {
                    required: {
                      value: true,
                      message: "Please enter your role in the company.",
                    },
                  }),
                }}
                error={errors.role?.message}
              />
            </div>
            <div className="flex items-center  justify-between w-[45%] py-3 px-6 rounded-md  hover:bg-purple-100 ">
              <h2 className="text-xl">Internship Duration</h2>
              <InputWithEdit
                type="text"
                placeholder="Internship Duration"
                validationObj={{
                  ...register("duration", {
                    required: {
                      value: true,
                      message: "Please enter the total Internship duration.",
                    },
                  }),
                }}
                error={errors.duration?.message}
              />
            </div>

            <div className="flex items-center   justify-between w-[45%]  py-3 px-6 rounded-md  hover:bg-purple-100 ">
              <h2 className="text-xl">Description</h2>
              <InputWithEdit
                type="description"
                placeholder="Describe your internship experience."
                validationObj={{
                  ...register("description", {
                    required: {
                      value: true,
                      message: "Please enter your internship experience.",
                    },
                  }),
                }}
                error={errors.description?.message}
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

      <div className={`flex flex-col gap-10 w-full bg-slate-100 full ${student?.pastInternshipsProjects.internships.length !== 0 && "py-20"} rounded-lg shadow-slate-300 shadow-md  justify-center items-center`}>
        {student?.pastInternshipsProjects.internships.map((eachInternship) => (
          <div key={nanoid()} className="flex flex-col p-14 px-20 gap-6 bg-white rounded-md w-[85%] shadow-grey-300 shadow-md">
            <div className="text-lg font-semibold">Internship No: {student.pastInternshipsProjects.internships.indexOf(eachInternship) + 1}</div>
            <div className="flex items-center justify-between w-full ">
                <div className="flex gap-10 w-1/3 items-center">
                <h1 className="text-2xl ">Company Name:  </h1>
                <span className=" font-medium text-2xl ">{eachInternship.company}</span>
                </div>

                <div className="flex gap-10 w-1/3 items-center justify-center">
                <h1 className="text-2xl ">Role : </h1>
                <span className="text-2xl font-medium">{eachInternship.role}</span>
                </div>

                <div className="flex gap-10 w-1/3  justify-end item-center">
                <h1 className="text-2xl">Internship Duration:</h1>
                <span className="font-medium text-2xl"> {eachInternship.duration}</span>
                </div>
            </div>
            <p className="text-xl mt-5 ">Description: <span className="font-medium">{eachInternship.description}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviousInternships;

{
  /* <div
className={`h-full bg-purple-100  flex justify-center items-center ${
  (isLoading || studentUtil.isLoading) && " opacity-70 bg-gray-400"
}`}
>
<div className="bg-slate-100  w-[90%] h-[90%] rounded-lg shadow-slate-300 shadow-md flex justify-center items-center"
>

 <div className="flex flex-col p-20 gap-3 bg-white rounded-md w-[85%] shadow-grey-300 shadow-md">

 </div>
</div>

</div> */
}
