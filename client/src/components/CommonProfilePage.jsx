import React, { useState } from "react";
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
} from "../utils/formValidation";
import Button from "./buttons/Button";
import { useForm } from "react-hook-form";
import { userPlaceholderImage } from "../constants";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const CommonProfilePage = ({
  isLoading,
  handleProfileUpdateForm,
  userAccountStatus,
  userProfilePicture,
  firstName,
  lastName,
  fathersName,
  mothersName,
  emailID,
  phone,
  isLoggedIn,
  isSuccess,
  uploadProfilePicture,
}) => {
  const form = useForm();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = form;
  const dispatch = useDispatch();

  if (isLoggedIn && isSuccess) {
    setValue("firstName", firstName);
    setValue("lastName", lastName);
    setValue("fathersName", fathersName);
    setValue("mothersName", mothersName);
    setValue("emailID", emailID);
    setValue("phone", phone);
  }

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

  return (
    <PurpleBackground
      additionalStyles={`h-full w-full  px-[2vw]  pt-20 max-tablet:p-[3vw] max-tablet:mt-16 max-sm:mt-16
    ${isLoading && " opacity-70 bg-gray-400"}
    `}
    >
      {isLoading && <LoadingPage height="full" width="full" />}

      <SlateBackground
        additionalStyles={"h-[96%] w-[96%] p-[2vw] flex-center max-sm:p-0"}
      >
        <form
          action=""
          onSubmit={handleSubmit(handleProfileUpdateForm)}
          noValidate
          className="w-full h-full p-[0.3vw]   flex justify-around items-center max-tablet:flex-col max-tablet:gap-10 max-tablet:p-[3vw] max-sm:py-4 max-sm"
        >
          {/* left side-uploading profile picture */}

          <WhiteBackground
            additionalStyles={
              "flex flex-col items-center p-[3vw] gap-10 h-10/12  w-[30%] max-tablet:w-1/2 tablet:h-10/12  max-sm:w-11/12 max-sm:p-6"
            }
          >
            <div className="flex-center gap-4 w-full font-medium text-[1vw] max-tablet:text-base max-sm:text-medium">
              <p>Status: </p>
              <AccountStatus role={userAccountStatus} />
            </div>

            <div className=" relative z-10   aspect-square w-5/6 rounded-full flex items-center justify-center hover:bg-slate-100 hover:shadow-lg hover:shadow-purple-200">
              <img
                src={
                  userProfilePicture ? userProfilePicture : userPlaceholderImage
                }
                className="h-full w-full rounded-full object-cover hover:opacity-60"
                alt=""
              />

              <p className="absolute left-1/5 opacity-0  z-50 transition-all  hover:opacity-100 text-[0.8vw] rounded-lg hover:bg-purple-200 hover:p-2 max-tablet:text-md   ">
                Click on upload to update profile picture.{" "}
              </p>
            </div>
            <div className="flex flex-col gap-10 ">
              <div className="flex flex-col gap-4 text-[0.8vw] max-tablet:text-base max-sm:text-xs">
                <label
                  className="block  text-center  font-medium text-gray-900 dark:text-white"
                  for="file_input"
                >
                  Click below to upload your picture
                </label>
                <input
                  className="block w-full p-1 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  aria-describedby="file_input_help"
                  id="file_input"
                  type="file"
                  onChange={handleImageChange}
                />

                <p
                  className=" text-gray-500 dark:text-gray-300 text-left"
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
                  "font-semibold m-auto px-8 text-[1vw] max-tablet:text-base max-sm:text-xs max-sm:p-3   max-sm:w-full"
                }
              />
            </div>
          </WhiteBackground>

                {/* Right side : User profile details */}
          <WhiteBackground additionalStyles=" flex flex-col justify-between items-center gap-2  max-sm:gap-8 h-full p-[2vw] py-8  w-1/2   max-tablet:w-11/12">
            <FormField>
              <h2 className="text-[1vw] max-tablet:text-base max-sm:text-sm mt-[0.3vw]">
                First Name
              </h2>
              <InputWithEdit
                inputFieldContainerStyles={"sm:w-3/5  "}
                inputFieldStyle={" h-1/2 max-sm:h-10 max-sm:text-xs"}
                errorMessageStyle={"max-sm:text-xs max-tablet:text-base"}
                type="text"
                placeholder="firstName"
                validationObj={{
                  ...register("firstName", firstNameValidation),
                }}
                error={errors.firstName?.message}
              />
            </FormField>

            <FormField>
              <h2 className="text-[1vw] max-tablet:text-base max-sm:text-sm mt-[0.3vw]">
                Last Name
              </h2>
              <InputWithEdit
                inputFieldContainerStyles={"sm:w-3/5 "}
                inputFieldStyle={" h-1/2 max-sm:h-10 max-sm:text-xs"}
                errorMessageStyle={"max-sm:text-xs max-tablet:text-base"}
                type="text"
                placeholder="Last Name"
                validationObj={{
                  ...register("lastName", lastNameValidation),
                }}
                error={errors.lastName?.message}
              />
            </FormField>

            <FormField>
              <h2 className="text-[1vw] max-tablet:text-base max-sm:text-sm mt-[0.3vw]">
                Father's Name
              </h2>
              <InputWithEdit
                type="text"
                placeholder="Father's Name"
                inputFieldContainerStyles={"sm:w-3/5"}
                inputFieldStyle={" h-1/2 max-sm:h-10 max-sm:text-xs"}
                errorMessageStyle={"max-sm:text-xs max-tablet:text-base"}
                validationObj={{
                  ...register("fathersName", fathersNameValidation),
                }}
                error={errors.fathersName?.message}
              />
            </FormField>

            <FormField>
              <h2 className="text-[1vw] max-tablet:text-base max-sm:text-sm mt-[0.3vw]">
                Mother's Name
              </h2>
              <InputWithEdit
                type="text"
                inputFieldContainerStyles={"sm:w-3/5"}
                inputFieldStyle={" h-1/2 max-sm:h-10 max-sm:text-xs"}
                errorMessageStyle={"max-sm:text-xs max-tablet:text-base"}
                placeholder="Mother's Name"
                validationObj={{
                  ...register("mothersName", mothersNameValidation),
                }}
                error={errors.mothersName?.message}
              />
            </FormField>

            <FormField>
              <h2 className="text-[1vw] max-tablet:text-base max-sm:text-sm  mt-[0.3vw]">
                Email
              </h2>
              <InputWithEdit
                type="email"
                inputFieldContainerStyles={"sm:w-3/5  "}
                inputFieldStyle={" h-1/2 max-sm:text-xs"}
                errorMessageStyle={"max-sm:text-xs max-tablet:text-base"}
                placeholder="Email Address"
                validationObj={{
                  ...register("emailID", emailValidation),
                }}
                error={errors.emailID?.message}
              />
            </FormField>

            <FormField>
              <h2 className="text-[1vw] max-tablet:text-base max-sm:text-sm mt-[0.3vw]">
                Phone
              </h2>
              <InputWithEdit
                type="number"
                placeholder="Phone Number"
                inputFieldContainerStyles={"sm:w-3/5"}
                inputFieldStyle={" h-1/2 max-sm:text-xs"}
                errorMessageStyle={"max-sm:text-xs max-tablet:text-base"}
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
                "w-2/5  m-auto font-semibold mt-8 text-[1vw] max-sm:w-10/12 max-sm:text-xs max-sm:p-3  "
              }
            />
          </WhiteBackground>
        </form>
      </SlateBackground>
    </PurpleBackground>
  );
};

export default CommonProfilePage;
