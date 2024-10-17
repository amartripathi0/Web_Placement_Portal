import React, { useEffect } from "react";
import InputWithEdit from "../../../../components/inputField/InputWithEdit";
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
import AccountStatus from "../../../../components/AccountStatus";
import FormField from "../../../../components/containers/FormField";
import Label from "../../../../components/label";
import {
  cgpaValidation,
  collegeNameValidation,
  degreeValidation,
  firstNameValidation,
  rollNumberValidation,
  yearOfPassingValidation,
} from "../../../../utils/formValidation";
import Button from "../../../../components/buttons/Button";

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
      className={`h-screen bg-purple-100  flex justify-center items-center p-10 pt-32 ${
        (isLoading || studentUtil.isLoading) && " bg-gray-400 blur-sm"
      }`}
    >
      <div
        
        className="bg-slate-100 h-full w-full rounded-lg shadow-slate-300 shadow-md flex justify-center items-center p-6 px-20"
       
      >
        <form action="" noValidate
        onSubmit={handleSubmit(formSubmit)} className="flex flex-col gap-4 bg-white rounded-md h-full w-full shadow-grey-300 shadow-md border p-8">
          <AccountStatus role={student?.role} />

          <FormField>
            <Label>Roll Number</Label>
            <InputWithEdit
              type="number"
              placeholder="Roll Number"
              validationObj={{
                ...register("rollNumber", rollNumberValidation),
                validate: (v) => v > 0 || "Please enter a valid Roll number.",
              }}
              error={errors.rollNumber?.message}
            />
          </FormField>
          <FormField>
            <Label>Degrees</Label>
            <InputWithEdit
              type="text"
              placeholder="Degree"
              validationObj={{
                ...register("degrees", degreeValidation),
              }}
              error={errors.degrees?.message}
            />
          </FormField>
          <FormField>
            <Label>College</Label>
            <InputWithEdit
              type="text"
              placeholder="College Name"
              validationObj={{
                ...register("collegeName", collegeNameValidation),
              }}
              error={errors.collegeName?.message}
            />
          </FormField>

          <FormField>
            <Label>CGPA</Label>
            <InputWithEdit
              type="number"
              placeholder="CGPA"
              validationObj={{
                ...register("cgpa", cgpaValidation),
                validate: (v) => v > 0 || "Please enter a valid CGPA.",
              }}
              error={errors.cgpa?.message}
            />
          </FormField>

          <FormField>
            <Label>Year Of Passing</Label>
            <InputWithEdit
              type="text"
              placeholder="Year Of Passing"
              validationObj={{
                ...register("yearOfPassing", yearOfPassingValidation),
              }}
              error={errors.yearOfPassing?.message}
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
        </form>
      </div>
    </div>
  );
};

export default AcademicDetail;
