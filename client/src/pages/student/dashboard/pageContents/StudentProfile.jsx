import React, { useEffect, useState } from "react";
import InputWithEdit from "../../../../Components/inputField/InputWithEdit";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import LoadingPage from "../../../LoadingPage";
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
const StudentProfile = () => {
  const { isLoading, isError, isSuccess, isLoggedIn, message, student } =
    useSelector((state) => state.studentAuth);
  const globalAuth = useSelector((state) => state.globalAuth);
  const dispatch = useDispatch();

  const studentUtil = useSelector((state) => state.studentUtils);
  const form = useForm();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = form;

  function formSubmit(data) {
    const obj = { typ: "personalDetail", value: data };
    dispatch(updateProfileDetail(obj));
    toast.success("Details Updated Succesfully", {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
  useEffect(() => {
    if (globalAuth.isLoggedin) {
      dispatch(getUserData());
      console.log("data fetched");
      toast.success("Data Fetched Succesfully",{
        position : toast.POSITION.TOP_CENTER
      })
    }

    if (studentUtil.isSuccess ) {
      toast.success("Profile picture updated.", {
        position: toast.POSITION.TOP_CENTER,
      });

      dispatch(RESET_UTILS());
    }
    // dispatch(RESET())
  }, [globalAuth.isLoggedin, studentUtil.isSuccess]);

  useEffect(() => {
    if (isLoggedIn && isSuccess) {
      setValue("firstName", student?.personalDetail.firstName);
      setValue("lastName", student?.personalDetail.lastName);
      setValue("fathersName", student?.personalDetail.fathersName);
      setValue("mothersName", student?.personalDetail.mothersName);
      setValue("emailID", student?.personalDetail.emailID);
      setValue("phone", student?.personalDetail.phone);
    }
  }, [student]);

  const [profilePicture, setProfilePicture] = useState("");
  function handleImgageChange(e) {
    setProfilePicture(e.target.files[0]);
  }
  function handleImageUpload(e) {
    console.log(profilePicture);
    e.preventDefault();
    if (profilePicture.size > 1000000) {
      toast.error("Please upload file of size less than 1 MB", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else if (!profilePicture || !profilePicture.type.startsWith("image")) {
      toast.error("Please upload a valid image.", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      const formdata = new FormData();
      formdata.append("profilePicture", profilePicture);
      dispatch(uploadProfilePicture(formdata));
    }
  }

  return (
    <div
      className={`h-full bg-purple-100  flex justify-center items-center ${
        (isLoading || studentUtil.isLoading) && " opacity-70 bg-gray-400"
      }`}
    >
      {/* {(isLoading || studentUtil.isLoading) && (
        <LoadingPage height="full" width="full" />
      )} */}

      <form
        action=""
        onSubmit={handleSubmit(formSubmit)}
        noValidate
        className="bg-slate-100  w-[85%] h-[85%] rounded-lg p-10 py-20 shadow-slate-300 shadow-md flex justify-center gap-20"
      >
        <div className="flex flex-col items-center pt-20 gap-10 bg-white rounded-md w-[30%] shadow-grey-300 shadow-md">
          <div className=" relative z-10  w-96 h-96 rounded-full flex items-center justify-center hover:bg-slate-100 hover:shadow-lg hover:shadow-purple-200">
            <img
              src={student?.personalDetail.profilePicture ? student.personalDetail.profilePicture : "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="}
              className="h-full w-full rounded-full object-cover hover:opacity-60"
              alt=""
            />

            {/* <p className="absolute left-1/5 opacity-0  z-50 transition-all  hover:opacity-100 text-lg  hover:bg-purple-200 hover:p-2  ">Click here to update</p> */}

          </div>
          <div className="flex flex-col gap-20 ">

            <div className="flex flex-col gap-4">
            <label
              class="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
              for="file_input"
            >
              Upload Photo
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              aria-describedby="file_input_help"
              id="file_input"
              type="file"
              onChange={handleImgageChange}
            />
            <p
              class="mt-1 text-sm text-gray-500 dark:text-gray-300"
              id="file_input_help"
            >
              JPEG, PNG, JPG (MAX. 1MB).
            </p>
            </div>

            <button
              onClick={handleImageUpload}
              className="w-60 m-auto font-semibold text-white bg-pink-500 hover:bg-pink-600 p-3 pl-6 pr-6 rounded-lg flex items-center justify-center"
            >
              Upload
            </button>
          </div>
        </div>

        <div className="bg-white flex flex-col gap-5 p-16 px-24 w-1/2 rounded-md shadow-grey-300 shadow-md">
      
         <div 
         className={`${student?.role  === "Allowed" ? " bg-green-500 shadow-green-300 shadow-md" : " bg-red-600 shadow-red-500 shadow-md"}
        p-2 w-40 flex items-center justify-center rounded-md mb-3 ml-6`}>
         <h1
         className="text-white text-2xl font-semibold"
         > {student?.role}</h1>
         </div>
          <div className="flex items-center  justify-between hover:bg-purple-100 rounded-md p-2 px-6 ">
            <h2 className="text-xl">First Name</h2>
            <InputWithEdit
              type="text"
              placeholder="firstName"
              validationObj={{
                ...register("firstName", {
                  required: {
                    value: true,
                    message: "Please enter the First Name.",
                  },
                }),
              }}
              error={errors.firstName?.message}
            />
          </div>

          <div className="flex items-center justify-between gap-6 hover:bg-purple-100 rounded-md p-2 px-6">
            <h2 className="text-xl">Last Name</h2>
            <InputWithEdit
              type="text"
              placeholder="Last Name"
              validationObj={{
                ...register("lastName", {
                  required: {
                    value: true,
                    message: "Please enter the Last Name.",
                  },
                }),
              }}
              error={errors.lastName?.message}
            />
          </div>

          <div className="flex items-center gap-6 justify-between  hover:bg-purple-100 rounded-md p-2 px-6">
            <h2 className="text-xl">Father's Name</h2>
            <InputWithEdit
              type="text"
              placeholder="Father's Name"
              validationObj={{
                ...register("fathersName", {
                  required: {
                    value: true,
                    message: "Please enter the Father Name.",
                  },
                }),
              }}
              error={errors.fathersName?.message}
            />
          </div>

          <div className="flex items-center gap-6 justify-between  hover:bg-purple-100 rounded-md p-2 px-6">
            <h2 className="text-xl">Mother's Name</h2>
            <InputWithEdit
              type="text"
              placeholder="Mother's Name"
              validationObj={{
                ...register("mothersName", {
                  required: {
                    value: true,
                    message: "Please enter the Mother's Name.",
                  },
                }),
              }}
              error={errors.mothersName?.message}
            />
          </div>

          <div className="flex items-center gap-6 justify-between  hover:bg-purple-100 rounded-md p-2 px-6">
            <h2 className="text-xl">Email</h2>
            <InputWithEdit
              type="email"
              placeholder="Email Address"
              validationObj={{
                ...register("emailID", {
                  required: {
                    value: true,
                    message: "Please enter the Email Address.",
                  },
                  pattern: {
                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                    message: "Please enter a valid Email address",
                  },
                }),
              }}
              error={errors.emailID?.message}
            />
          </div>

          <div className="flex items-center gap-6 justify-between  hover:bg-purple-100 rounded-md p-2 px-6">
            <h2 className="text-xl">Phone</h2>
            <InputWithEdit
              type="number"
              placeholder="Phone Number"
              validationObj={{
                ...register("phone", {
                  required: {
                    value: true,
                    message: "Please enter the Phone Name.",
                  },
                }),
              }}
              error={errors.phone?.message}
            />
          </div>

          <button
            type="submit"
            className=" m-auto w-60 font-semibold text-white bg-pink-500 hover:bg-pink-600 p-3 pl-6 pr-6 rounded-lg flex items-center justify-center"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentProfile;
