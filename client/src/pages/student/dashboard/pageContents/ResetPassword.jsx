import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PasswordInput from "../../../../components/inputField/PasswordInput";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signin,
  RESET,
} from "../../../../redux/features/student/auth/authSlice";
import LoadingPage from "../../../LoadingPage";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  function handleResetData(data) {
    // console.log(data);
  }
  return (
    <div
      className={`h-screen bg-purple-100  flex justify-center items-center ${
        isLoading && " opacity-70 bg-gray-400"
      }`}
    >
      {isLoading && <LoadingPage height="screen" width="screen" />}

      <div className="bg-slate-100  w-[85%] h-[85%] rounded-lg shadow-slate-300 shadow-md flex flex-col gap-10 justify-center items-center">
        <form
          action=""
          onSubmit={handleSubmit(handleResetData)}
          noValidate
          className="flex flex-col px-14 py-20 gap-12 bg-white rounded-md shadow-grey-300  shadow-md"
        >
          <h1 className="text-3xl text-center font-medium ">
            Reset Password Form
          </h1>

          <div className="flex flex-col gap-4">
            <PasswordInput
              placeholder="Enter your Current Password"
              label="Current Password"
              labelName="currentPassword"
              validationObj={{
                ...register("currentPassword", {
                  required: {
                    value: true,
                    message: "Please enter your Current Password.",
                  },
                  minLength: {
                    value: 6,
                    message:
                      "Please enter a strong password of length more than 5.",
                  },
                }),
              }}
              error={errors.currentPassword?.message}
            />
            <PasswordInput
              placeholder="Enter your New Password"
              label="New Password"
              labelName="newPassword"
              validationObj={{
                ...register("newPassword", {
                  required: {
                    value: true,
                    message: "Please enter your New Password.",
                  },
                  minLength: {
                    value: 6,
                    message:
                      "Please enter a strong password of length more than 5.",
                  },
                }),
              }}
              error={errors.newPassword?.message}
            />
            <PasswordInput
              placeholder="Enter your Confirm New Password"
              label="Comfirm New Password"
              labelName="confirmNewPassword"
              validationObj={{
                ...register("confirmNewPassword", {
                  required: {
                    value: true,
                    message: "Please enter your Confirm New Password.",
                  },
                  minLength: {
                    value: 6,
                    message:
                      "Please enter a strong password of length more than 5.",
                  },
                }),
              }}
              error={errors.confirmNewPassword?.message}
            />
          </div>
          <div className="flex flex-col gap-2">
            <button
              type="submit"
              className="border-2 bg-blue-400 border-black w-full text-xl p-3 pt-1 pb-1 mt-1 rounded-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
