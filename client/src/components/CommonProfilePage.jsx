import React, { useEffect, useState } from "react";
import PurpleBackground from "./containers/PurpleBackground";
import LoadingPage from "../pages/LoadingPage";
import SlateBackground from "./containers/SlateBackground";
import WhiteBackground from "./containers/WhiteBackground";
import AccountStatus from "./AccountStatus";
import FormField from "./containers/FormField";
import InputWithEdit from "./inputField/InputWithEdit";
import {
  emailValidation,
  fathersNameValidation,
  firstNameValidation,
  lastNameValidation,
  mothersNameValidation,
  phoneValidation,
  staffIdValidation,
} from "../utils/formValidation";
import Button from "./buttons/Button";
import { useForm } from "react-hook-form";
import { userPlaceholderImage } from "../constants";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import Label from "./label";

const CommonProfilePage = ({
  isLoading,
  userAccountStatus,
  userProfilePicture,
  updateProfileDetail,
  firstName,
  lastName,
  fathersName,
  mothersName,
  emailID,
  phone,
  isLoggedIn,
  isSuccess,
  uploadProfilePicture,
  userType,
  staffID,
}) => {
  const form = useForm();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = form;
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn && isSuccess) {
      setValue("firstName", firstName);
      setValue("lastName", lastName);
      setValue("fathersName", fathersName);
      setValue("mothersName", mothersName);
      setValue("emailID", emailID);
      setValue("phone", phone);
      setValue("staffID", staffID);
    }
  }, [isSuccess]);

  const [profilePicture, setProfilePicture] = useState("");
  function handleImageChange(e) {
    setProfilePicture(e.target.files[0]);
  }
  function handleImageUpload(e) {
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
      toast.success("Profile picture updated.", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }

  function handleProfileUpdateForm(data) {
    const obj = { typ: "personalDetail", value: data };
    dispatch(updateProfileDetail(obj));
    toast.success("Details Updated Succesfully", {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
  return (
    <PurpleBackground
      additionalStyles={`h-full w-full px-[2vw]  pt-20 max-tablet:p-[3vw] max-tablet:mt-16 max-sm:mt-16
    `}
    >
      <SlateBackground
        additionalStyles={"h-[96%] w-[96%] p-[2vw] flex-center max-sm:p-0"}
      >
        <form
          action=""
          onSubmit={handleSubmit(handleProfileUpdateForm)}
          noValidate
          className="w-full h-full p-[0.3vw] flex justify-around items-center max-tablet:flex-col max-tablet:gap-10 max-tablet:p-[3vw] max-sm:py-4 max-sm"
        >
          {/* left side-uploading profile picture */}

          <WhiteBackground
            additionalStyles={
              "flex flex-col items-center p-10 gap-8  w-[30%] max-tablet:w-1/2 tablet:h-10/12  max-sm:w-11/12 max-sm:p-6"
            }
          >
            <div className="flex-center gap-4 w-full font-medium text-[1vw] max-tablet:text-base max-sm:text-medium">
              <p>Status: </p>
              <AccountStatus role={userAccountStatus} />
            </div>

            <div className=" relative z-10  p-2 aspect-square w-5/6 rounded-full flex items-center justify-center hover:bg-slate-100 hover:shadow-lg hover:shadow-purple-200">
              <img
                src={
                  userProfilePicture ? userProfilePicture : userPlaceholderImage
                }
                className="h-full w-full rounded-full  object-center hover:opacity-60"
                alt=""
              />

              <p className="absolute left-1/5 opacity-0  z-50 transition-all  hover:opacity-100 text-xs text-center rounded-lg hover:bg-purple-200 hover:p-2 max-tablet:text-md   ">
                Click on upload to update profile picture.{" "}
              </p>
            </div>
            <div className="flex flex-col gap-4 ">
              <div className="flex flex-col gap-2 text-sm max-sm:text-xs">
                <label
                  className="block text-center  font-medium text-gray-900 dark:text-white"
                  for="file_input"
                >
                  Click below to upload your picture
                </label>
                <input
                  className="block w-full p-1 text-gray-900 border border-gray-300 rounded cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 text-xs py-2"
                  aria-describedby="file_input_help"
                  id="file_input"
                  type="file"
                  onChange={handleImageChange}
                />

                <p
                  className=" text-gray-500 text-xs dark:text-gray-300 text-left"
                  id="file_input_help"
                >
                  JPEG, PNG, JPG (MAX. 1MB).
                </p>
              </div>

              <Button
                onClickHandler={handleImageUpload}
                color={"pink"}
                label={"Update Profile Picture"}
                type={"submit"}
                additionalStyles={
                  "mx-auto px-8 tablet:text-sm mt-4 text-xs max-sm:p-3 max-sm:w-full"
                }
              />
            </div>
          </WhiteBackground>

          {/* Right side : User profile details */}
          <WhiteBackground additionalStyles=" flex flex-col justify-between items-center gap-2  max-sm:gap-8 h-full p-[2vw] py-8  w-1/2   max-tablet:w-11/12">
            <FormField>
              <Label>First Name</Label>
              <InputWithEdit
                type="text"
                placeholder="firstName"
                validationObj={{
                  ...register("firstName", firstNameValidation),
                }}
                error={errors.firstName?.message}
              />
            </FormField>

            <FormField>
              <Label>Last Name</Label>
              <InputWithEdit
                type="text"
                placeholder="Last Name"
                validationObj={{
                  ...register("lastName", lastNameValidation),
                }}
                error={errors.lastName?.message}
              />
            </FormField>

            {userType === "student" && (
              <>
                <FormField>
                  <Label>Father's Name</Label>
                  <InputWithEdit
                    type="text"
                    placeholder="Father's Name"
                    validationObj={{
                      ...register("fathersName", fathersNameValidation),
                    }}
                    error={errors.fathersName?.message}
                  />
                </FormField>

                <FormField>
                  <Label>Mother's Name</Label>
                  <InputWithEdit
                    type="text"
                    placeholder="Mother's Name"
                    validationObj={{
                      ...register("mothersName", mothersNameValidation),
                    }}
                    error={errors.mothersName?.message}
                  />
                </FormField>
              </>
            )}

            <FormField>
              <Label>Email</Label>

              <InputWithEdit
                type="email"
                placeholder="Email Address"
                validationObj={{
                  ...register("emailID", emailValidation),
                }}
                error={errors.emailID?.message}
              />
            </FormField>

            {(userType === "college-staff" || userType === "company") && (
              <FormField>
                <Label>Staff-ID</Label>
                <InputWithEdit
                  type="number"
                  placeholder="Staff-ID"
                  validationObj={{
                    ...register("staffID", staffIdValidation),
                  }}
                  error={errors.staffID?.message}
                />
              </FormField>
            )}

            <FormField>
              <Label>Phone</Label>

              <InputWithEdit
                type="number"
                placeholder="Phone Number"
                validationObj={{
                  ...register("phone", phoneValidation),
                }}
                error={errors.phone?.message}
              />
            </FormField>

            <Button
              type={"submit"}
              color={"pink"}
              label={"Update Profile Details"}
              additionalStyles={
                "w-2/5 m-auto mt-4 max-sm:w-10/12 max-sm:text-xs max-sm:p-3  "
              }
            />
          </WhiteBackground>
        </form>
      </SlateBackground>
    </PurpleBackground>
  );
};

export default CommonProfilePage;
