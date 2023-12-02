import React, { useEffect } from "react";
import InputWithEdit from "../../../../Components/inputField/InputWithEdit";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
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

const AcademicDetail = () => {
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
  function formSubmit(data) {
    const obj = { typ: "educationalDetails", value: data };
    dispatch(updateProfileDetail(obj));
    toast.success("Details Updated Succesfully", {
      position: toast.POSITION.TOP_CENTER,
    });
  }

  useEffect(() => {
    if (globalAuth.isLoggedin === true) {
      dispatch(getUserData());
      // console.log("data fetched");
      toast.success("Data Fetched Succesfully", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    // dispatch(RESET())
  }, [globalAuth.isLoggedin]);
  useEffect(() => {
    if (isLoggedIn && isSuccess) {
      setValue("rollNumber", student?.educationalDetails.rollNumber);
      setValue("degrees", student?.educationalDetails.degrees);
      setValue("collegeName", student?.educationalDetails.collegeName);
      setValue("cgpa", student?.educationalDetails.cgpa);
      setValue("yearOfPassing", student?.educationalDetails.yearOfPassing);
    }
  }, [student]);
  // console.log(student);
  return (
    <div
      className={`h-full bg-purple-100  flex justify-center items-center ${
        (isLoading || studentUtil.isLoading) && " bg-gray-400 blur-sm"
      }`}
    >

      
      <form action="" onSubmit={handleSubmit(formSubmit)} 
      className="bg-slate-100  w-[85%] h-[85%] rounded-lg shadow-slate-300 shadow-md flex justify-center items-center"
      noValidate>
        
        
        <div className="flex flex-col p-20 gap-3 bg-white rounded-md w-[85%] shadow-grey-300 shadow-md">

        <div 
         className={`${student?.role  === "Allowed" ? " bg-green-500 shadow-green-300 shadow-md" : " bg-red-600 shadow-red-500 shadow-md"}
        p-2 w-40 flex items-center justify-center rounded-md mb-10 ml-6 `}>
         <h1
         className="text-white text-2xl font-semibold"
         > {student?.role}</h1>
         </div>


        <div className="flex items-center gap-56  justify-between  w-3/5 py-3 px-6 rounded-md  hover:bg-purple-100 ">
          <h2 className="text-xl">Roll Number</h2>
          <InputWithEdit
            type="number"
            placeholder="Roll Number"
            validationObj={{
              ...register("rollNumber", {
                required: {
                  value: true,
                  message: "Please enter the Roll Number.",
                },
                validate: (v) => v > 0 || "Please enter a valid Roll number.",
              }),
            }}
            error={errors.rollNumber?.message}
          />
        </div>

        <div className="flex items-center justify-between  gap-56   w-3/5 py-3 px-6 rounded-md  hover:bg-purple-100">
          <h2 className="text-xl">Degree</h2>
          <InputWithEdit
            type="select"
            placeholder="Degree"
            validationObj={{
              ...register("degrees", {
                required: {
                  value: true,
                  message: "Please enter your Degrees",
                },
              }),
            }}
            error={errors.degrees?.message}
          />
        </div>

        <div className="flex items-center gap-56  justify-between  w-3/5 py-3 px-6 rounded-md  hover:bg-purple-100 ">
          <h2 className="text-xl">College</h2>
          <InputWithEdit
            type="text"
            placeholder="College"
            validationObj={{
              ...register("collegeName", {
                required: {
                  value: true,
                  message: "Please enter the College Name.",
                },
              }),
            }}
            error={errors.collegeName?.message}
          />
        </div>

        <div className="flex items-center gap-56  justify-between  w-3/5 py-3 px-6 rounded-md  hover:bg-purple-100 ">
          <h2 className="text-xl">CGPA</h2>
          <InputWithEdit
            type="number"
            placeholder="CGPA"
            validationObj={{
              ...register("cgpa", {
                required: {
                  value: true,
                  message: "Please enter the latest CGPA",
                },
              }),
            }}
            error={errors.cgpa?.message}
          />
        </div>

        <div className="flex items-center gap-56  justify-between  w-3/5 py-3 px-6 rounded-md  hover:bg-purple-100 ">
          <h2 className="text-xl"> Year Of Passing</h2>
          <InputWithEdit
            type="text"
            placeholder="Year Of Passing"
            validationObj={{
              ...register("yearOfPassing", {
                required: {
                  value: true,
                  message: "Please enter the Year of Passing",
                },
              }),
            }}
            error={errors.yearOfPassing?.message}
          />
        </div>

        <button
          type="submit"
          className="w-60 mx-5 mt-20 font-semibold text-white bg-pink-500 hover:bg-pink-600 p-3 pl-6 pr-6 rounded-lg flex items-center justify-center"
        >
          Save
        </button>

        </div>

      </form>
    </div>
  );
};

export default AcademicDetail;
