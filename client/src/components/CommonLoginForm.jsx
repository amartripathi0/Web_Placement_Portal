import React from "react";
import Navbar from "./header/Navbar";
import PurpleBackground from "./containers/PurpleBackground";
import SlateBackground from "./containers/SlateBackground";
import { IoMdArrowBack } from "react-icons/io";
import InputField from "./inputField/InputField";
import PasswordInput from "./inputField/PasswordInput";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Loader } from "lucide-react";

const CommonLoginForm = ({
  onLoginFormSubmitHandler,
  isLoading,
  userType,
  loginFormHeading,
}) => {
  const form = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <PurpleBackground
        additionalStyles={"tablet:pt-20 pt-14"}
        isLoading={isLoading}
      >
        <SlateBackground
          additionalStyles={
            "p-6 tablet:p-16 relative flex-col-center rounded-lg"
          }
        >
          {/* back arrow */}
          <span
            onClick={() => navigate("/signin")}
            className=" absolute  bg-white  border-2 border-purple-400 rounded-full hover:shadow-md tablet:top-6 left-10 top-10 tablet:left-6 p-1 tablet:p-2"
          >
            <IoMdArrowBack size={20} />
          </span>

          <form
            onSubmit={handleSubmit(onLoginFormSubmitHandler)}
            noValidate
            className="h-full w-full flex-center bg-white flex flex-col gap-8 p-8"
          >
            {/* heading */}
            <h3 className="text-lg text-center font-medium">
              {loginFormHeading}
            </h3>

            {/* Input fields */}
            <div className="flex flex-col gap-[1vw]  ">
              <InputField
                placeholder="Enter your Email Address"
                label="E-Mail"
                labelName="emailID"
                validationObj={{
                  ...register("emailID", {
                    required: {
                      value: true,
                      message: "Please enter your email address.",
                    },
                    pattern: {
                      value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                      message: "Please enter a valid Email address",
                    },
                  }),
                }}
                error={errors.emailID?.message}
              />
              <PasswordInput
                placeholder="Enter your Password"
                label="Password"
                labelName="password"
                validationObj={{
                  ...register("password", {
                    required: {
                      value: true,
                      message: "Please enter your Password.",
                    },
                  }),
                }}
                error={errors.password?.message}
              />
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-blue-800 font-medium text-sm">
                Forgot Password{" "}
              </p>

              <button
                type="submit"
                className="font-medium bg-blue-500 text-white w-full text-sm flex-center gap-2 py-2 rounded"
                disabled={isLoading}
              >
                {isLoading ? "Logging..." : "Login"}
                {isLoading && <Loader size={16} className="animate-spin" />}
              </button>
              <p className=" font-medium text-sm">
                Don't have an account?
                <span
                  onClick={() => navigate(`/signup/${userType}`)}
                  className="text-blue-800 underline ml-2 cursor-pointer"
                >
                  Signup
                </span>
              </p>
            </div>
          </form>
        </SlateBackground>
      </PurpleBackground>
    </>
  );
};

export default CommonLoginForm;
