import React, { useEffect } from "react";
import InputWithEdit from "../../../../Components/inputField/InputWithEdit";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {nanoid} from 'nanoid'
import {NavLink} from 'react-router-dom'
import{
  RESET_GLOBAL,
  SET_GLOBAL,
  getLoginStatus,
} from "../../../../redux/features/common/globalSlice";
import {
  RESET,
  getUserData,
  updateProfileDetail,
} from "../../../../redux/features/student/auth/authSlice";


const Project = () => {

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


  function handleUploadProjectDetails(data) {
    const projectData = { typ: "projects", value: data };
    console.log(projectData);
    dispatch(updateProfileDetail(projectData));

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
          onSubmit={handleSubmit(handleUploadProjectDetails)}
          className="flex flex-col items-center p-10 gap-12 bg-white rounded-md w-[85%] shadow-grey-300 shadow-md"
        >
          <div>
            <h1 className="text-4xl ">Project-Form</h1>
          </div>

          <div className=" flex flex-wrap px-16 gap-4  justify-between">
            <div className="flex items-center  justify-between w-[45%]   py-3 px-6 rounded-md  hover:bg-purple-100 ">
              <h2 className="text-xl">Project Title</h2>
              <InputWithEdit
                type="text"
                placeholder="Project Title"
                validationObj={{
                  ...register("title", {
                    required: {
                      value: true,
                      message: "Please enter the Project Title.",
                    },
                  }),
                }}
                error={errors.title?.message}
              />
            </div>

            <div className="flex items-center   justify-between w-[45%]  py-3 px-6 rounded-md  hover:bg-purple-100 ">
              <h2 className="text-xl">Project Link</h2>
              <InputWithEdit
                type="text"
                placeholder="Project Link"
                validationObj={{
                  ...register("link", {
                    required: {
                      value: true,
                      message: "Please enter your link of your project.",
                    },
                  }),
                }}
                error={errors.link?.message}
              />
            </div>
            <div className="flex items-center  justify-between w-[45%] py-3 px-6 rounded-md  hover:bg-purple-100 ">
              <h2 className="text-xl">Project Duration</h2>
              <InputWithEdit
                type="text"
                placeholder="Project Duration"
                validationObj={{
                  ...register("duration", {
                    required: {
                      value: true,
                      message: "Please enter the total Project duration.",
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
                placeholder="Project Description."
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

      <div className={`flex flex-col gap-10 w-full bg-slate-100 full ${student?.pastInternshipsProjects.projects.length !== 0 && "py-20"} rounded-lg shadow-slate-300 shadow-md  justify-center items-center`}>
        {student?.pastInternshipsProjects.projects.map((eachProject) => (
          <div key={nanoid()} className="flex flex-col p-14 px-20 gap-6 bg-white rounded-md w-[85%] shadow-grey-300 shadow-md">
            <div className="text-lg font-semibold">Project No: {student.pastInternshipsProjects.projects.indexOf(eachProject) + 1}</div>
            <div className="flex items-center justify-between w-full ">
                <div className="flex gap-3 w-1/3 items-center ">
                <h1 className="text-2xl ">Project Title:  </h1>
                <span className=" font-medium text-2xl ">{eachProject.title}</span>
                </div>

                <div className="flex gap-3 w-1/3 items-center justify-center">
                <h1 className="text-2xl ">Link: </h1>
                <NavLink to = {eachProject.link} target="_blank" className="text-2xl  text-blue-700 underline font-medium">{eachProject.link}</NavLink>
                </div>

                <div className="flex gap-3 w-1/3 justify-end items-center">
                <h1 className="text-2xl"> Duration:</h1>
                <span className="font-medium text-2xl"> {eachProject.duration}</span>
                </div>
            </div>
            <p className="text-xl mt-5 ">Description: <span className="font-medium">{eachProject.description}</span></p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Project