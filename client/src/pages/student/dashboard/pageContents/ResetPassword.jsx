import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PasswordInput from "../../../../components/inputField/PasswordInput";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import StudentPageLayout from "../../../../components/layout/StudentPageLayout";
import {
  signin,
  RESET,
} from "../../../../redux/features/student/auth/authSlice";
import "react-toastify/dist/ReactToastify.css";
import Button from "../../../../components/buttons/Button";

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
    formState: { errors },
  } = form;

  function handleResetData(data) {
    // console.log(data);
  }
  return (
    <StudentPageLayout
      slateBgStyles={"p-4 sm:p-8 tablet:p-10 w-full tablet:w-4/5 lg:w-2/5"}
    >
      <form
        action=""
        onSubmit={handleSubmit(handleResetData)}
        noValidate
        className="flex flex-col p-4 sm:p-8 gap-6  bg-white rounded-md shadow-grey-300  shadow-md"
      >
        <h3 className="text-xl text-center font-medium ">Reset Password</h3>

        <div className="flex flex-col gap-4">
          <PasswordInput
            placeholder="Enter your Current Password"
            label="Current Password"
            inputFieldContainerStyles={"w-full"}
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
            inputFieldContainerStyles={"w-full"}
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
            label="Confirm New Password"
            labelName="confirmNewPassword"
            inputFieldContainerStyles={"w-full"}
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
        <Button
          label={"Submit"}
          type={"submit"}
          additionalStyles={"bg-blue-500"}
        />
      </form>
    </StudentPageLayout>
  );
};

export default ResetPassword;
