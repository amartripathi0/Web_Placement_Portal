import React, { useEffect } from "react";
import InputWithEdit from "../../../../components/inputField/InputWithEdit";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import {
  getUserData,
  updateProfileDetail,
} from "../../../../redux/features/student/auth/authSlice";
import SlateBackground from "../../../../components/containers/SlateBackground";
import FormField from "../../../../components/containers/FormField";
import Label from "../../../../components/label";
import Button from "../../../../components/buttons/Button";
import StudentPageLayout from "../../../../components/layout/StudentPageLayout";
import InternshipCard from "../../../../components/internship-card";
import { RESET_GLOBAL } from "../../../../redux/features/common/globalSlice";
import { useNavigate } from "react-router-dom";

const PreviousInternships = () => {
  const dispatch = useDispatch();
  const form = useForm();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = form;
  const { isSuccess, message, student } = useSelector(
    (state) => state.studentAuth
  );
  const globalAuth = useSelector((state) => state.globalAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!globalAuth.isLoggedin && !globalAuth.isLoading) {
      navigate("/signin");
      dispatch(RESET_GLOBAL);
    } else if (isSuccess && isSubmitSuccessful) {
      dispatch(getUserData());
      toast.success(message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [
    globalAuth.isLoggedin,
    isSuccess,
    dispatch,
    isSubmitSuccessful,
    navigate,
    globalAuth.isLoading,
  ]);

  function handleUploadInternshipDetails(data) {
    const internshipData = { typ: "internships", value: data };
    dispatch(updateProfileDetail(internshipData));
    reset();
  }
  return (
    <StudentPageLayout
      slateBgStyles={"gap-20 p-10 "}
      purpleBgStyles={"justify-start flex-col gap-20"}
    >
      <form
        onSubmit={handleSubmit(handleUploadInternshipDetails)}
        className="flex flex-col items-center p-8 mx-auto bg-white gap-4 rounded-md w-2/3 shadow-grey-300 shadow-md"
      >
        <h3 className="text-xl font-medium">Internship Form</h3>

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
    </StudentPageLayout>
  );
};

export default PreviousInternships;
