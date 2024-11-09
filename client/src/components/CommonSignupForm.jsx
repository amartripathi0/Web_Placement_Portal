import React from "react";
import Navbar from "./header/Navbar";
import PurpleBackground from "./containers/PurpleBackground";
import LoadingPage from "../pages/LoadingPage";
import SlateBackground from "./containers/SlateBackground";
import WhiteBackground from "./containers/WhiteBackground";
import { IoMdArrowBack } from "react-icons/io";
import InputField from "./inputField/InputField";
import {
  companyNameValidation,
  emailValidation,
  firstNameValidation,
  lastNameValidation,
  passwordValidation,
  phoneValidation,
  staffIdValidation,
} from "../utils/formValidation";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import PasswordInput from "./inputField/PasswordInput";
import Button from "./buttons/Button";

const CommonSignupForm = ({
  isLoading,
  onSignupFormSubmitHandler,
  signupHeading,
  userType,
}) => {
  const form = useForm();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = form;

  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <PurpleBackground
        isLoading={isLoading}
        additionalStyles={"pt-20 min-h-screen max-sm:py-22 "}
      >
        {isLoading && <LoadingPage />}

        <SlateBackground additionalStyles="relative w-full sm:w-3/5 flex-center mx-4 flex-col gap-4 dm:gap-8 p-4 sm:p-10-sm:px-2">
          <WhiteBackground additionalStyles="flex-center text-base sm:text-lg p-4 px-8 font-medium">
            {signupHeading}
          </WhiteBackground>

          {/*Back Arrow  */}
          <span
            onClick={() => navigate("/signup")}
            className=" absolute top-6 left-14 bg-white p-3 border border-purple-400 rounded-full hover:shadow-md "
          >
            <IoMdArrowBack size={20} />
          </span>

          <form
            action=""
            onSubmit={handleSubmit(onSignupFormSubmitHandler)}
            noValidate
            className="flex-center bg-white flex-center flex-col p-8 w-11/12 max-sm:p-4 gap-4 sm:gap-8"
          >
            <div className="flex items-center w-full sm:w-4/5 flex-wrap justify-around gap-2 sm:gap-4">
              <InputField
                placeholder="Enter your first name"
                label="First Name"
                labelName=""
                validationObj={{
                  ...register("firstName", firstNameValidation),
                }}
                error={errors.firstName?.message}
              />

              <InputField
                placeholder="Enter your last name"
                label="Last Name"
                labelName=""
                validationObj={{
                  ...register("lastName", lastNameValidation),
                }}
                error={errors.lastName?.message}
              />

              <InputField
                placeholder="Enter your Email Address"
                label="E-Mail"
                labelName="emailID"
                validationObj={{
                  ...register("emailID", emailValidation),
                }}
                error={errors.emailID?.message}
              />

              <InputField
                placeholder="Enter your Phone Number"
                label="Phone Number"
                labelName=""
                type="number"
                validationObj={{
                  ...register("phone", phoneValidation),
                }}
                error={errors.phone?.message}
              />

              {(userType === "college-staff" || userType === "company") && (
                <InputField
                  placeholder="Enter your Staff-ID"
                  label="Staff-ID"
                  labelName=""
                  type="number"
                  validationObj={{
                    ...register("staffID", staffIdValidation),
                  }}
                  error={errors.staffID?.message}
                />
              )}

              {userType === "company" && (
                <InputField
                  placeholder="Enter your company name"
                  label="Company Name"
                  labelName=""
                  validationObj={{
                    ...register("company", companyNameValidation),
                  }}
                  error={errors.company?.message}
                />
              )}

              <PasswordInput
                placeholder="Enter your Password"
                label="Password"
                labelName=""
                validationObj={{
                  ...register("password", passwordValidation),
                }}
                error={errors.password?.message}
              />

              <PasswordInput
                placeholder="Enter your Confirm Password"
                label="Confirm Password"
                labelName=""
                validationObj={{
                  ...register("cpass", {
                    ...passwordValidation,
                    validate: {
                      same: (v) =>
                        v === getValues().password ||
                        "Password and Confirm Password don't match!",
                    },
                  }),
                }}
                error={errors.cpass?.message}
              />
            </div>

            <div className="flex flex-col items-center gap-1 text-sm">
              <p className="font-medium">
                Already have an account?{" "}
                <span
                  onClick={() => navigate(`/signin/${userType}`)}
                  className="text-blue-700 font-semibold underline cursor-pointer"
                >
                  Signin
                </span>
              </p>
              <p className="text-center text-neutral-700 ">or</p>
              <Button
                type={"submit"}
                label={"Signup"}
                color={"pink"}
                additionalStyles={"w-full sm:w-40 font-semibold text-white "}
                isLoading={isLoading}
              />
            </div>
          </form>
        </SlateBackground>
      </PurpleBackground>
    </>
  );
};

export default CommonSignupForm;
