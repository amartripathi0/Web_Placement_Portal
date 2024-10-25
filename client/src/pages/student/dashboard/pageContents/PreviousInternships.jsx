import React, { useEffect } from "react";
import InputWithEdit from "../../../../components/inputField/InputWithEdit";
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
import PurpleBackground from "../../../../components/containers/PurpleBackground";
import SlateBackground from "../../../../components/containers/SlateBackground";
import FormField from "../../../../components/containers/FormField";
import Label from "../../../../components/label";
import Button from "../../../../components/buttons/Button";
import UserLayout from "../../../../components/layout/UserLayout";
import InternshipCard from "../../../../components/internship-card";

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
    console.log(data);
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

      dispatch(getUserData());
    }
  }, [updateProfileDetail, isSuccess, dispatch]);

  return (
    <UserLayout
      slateBgStyles={"gap-20 p-10 "}
      purpleBgStyles={"justify-start flex-col gap-20"}
    >
      <form
        onSubmit={handleSubmit(handleUploadInternshipDetails)}
        className="flex flex-col items-center p-8 mx-auto bg-white gap-8 rounded-md w-3/5 shadow-grey-300 shadow-md"
      >
        <div>
          <h3 className="text-xl font-medium">Internship-Form</h3>
        </div>

        <div className="flex flex-wrap gap-4 justify-between">
          <FormField additionalStyles={"max-w-[48%]"}>
            <Label>Company Name</Label>
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
          </FormField>
          <FormField additionalStyles={"max-w-[48%]"}>
            <Label> Intern Role</Label>
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
          </FormField>
          <FormField additionalStyles={"max-w-[48%]"}>
            <Label> Internship Duration</Label>
            <InputWithEdit
              type="text"
              placeholder="Intern Role"
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
          </FormField>
          <FormField additionalStyles={"max-w-[48%]"}>
            <Label> Description</Label>
            <InputWithEdit
              type="text"
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
          </FormField>

          <Button
            type={"submit"}
            color={"pink"}
            label={"Save Details"}
            additionalStyles={
              "w-40 mt-4 mx-auto max-sm:w-10/12 max-sm:text-xs max-sm:p-3  "
            }
          />
        </div>
      </form>

      {student?.pastInternshipsProjects.internships.length > 0 ? (
        <SlateBackground
          additionalStyles={
            "flex flex-col gap-6 w-full justify-center items-center mt-10 bg-neutral-50 p-6 w-4/5 mx-auto"
          }
        >
          {student?.pastInternshipsProjects.internships.map(
            (eachInternship) => (
              <InternshipCard
                key={nanoid()}
                internshipIndex={
                  student.pastInternshipsProjects.internships.indexOf(
                    eachInternship
                  ) + 1
                }
                role={eachInternship.role}
                duration={eachInternship.duration}
                description={eachInternship.description}
              />
            )
          )}
        </SlateBackground>
      ) : (
        <div className={"bg-neutral-50 mt-10 w-2/3 mx-auto p-10 flex-center"}>
          You don't have any internship. Please fill up above form to add one.
        </div>
      )}
    </UserLayout>
  );
};

export default PreviousInternships;
