import React from 'react'
import Navbar from './header/Navbar'
import PurpleBackground from './containers/PurpleBackground'
import LoadingPage from '../pages/LoadingPage'
import SlateBackground from './containers/SlateBackground'
import { IoMdArrowBack } from 'react-icons/io'
import WhiteBackground from './containers/WhiteBackground'
import InputField from './inputField/InputField'
import PasswordInput from './inputField/PasswordInput'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

const CommonLoginForm = ({onLoginFormSubmitHandler , isLoading , userType , loginFormHeading} ) => {
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
    additionalStyles={"pt-20 max-sm:py-5  "}
    isLoading={isLoading}
    >
      {isLoading && <LoadingPage height="screen" width="screen" />}

      <SlateBackground
      additionalStyles={"w-4/5  max-sm:w-10/12 max-sm-h:3/4  h-4/5 relative flex-col-center  rounded-lg  " }
      >
        {/* back arrow */}
        <div
          onClick={() => navigate("/signin")}
          className=" absolute top-20 left-20 bg-white p-3 border-2 border-purple-400 rounded-full hover:shadow-md max-sm:top-7 max-sm:left-7 max-sm:p-1"
        >
          <IoMdArrowBack size={20} />
        </div>

        <form
          onSubmit={handleSubmit(onLoginFormSubmitHandler)}
          noValidate
          className="h-full w-full flex-center"
        >
        <WhiteBackground
        additionalStyles={"flex flex-col   gap-5 w-1/3 max-tablet:w-1/2   max-sm:w-10/12 max-sm:px-[5vw] max-sm:py-[8vw] max-sm:h-10/12 px-10 py-10"}
        >


          {/* heading */}
          <h1 className="text-[1.8vw] text-center font-medium mb-[1vw] max-sm:text-[5vw]">
            {loginFormHeading}
          </h1>

          {/* Input fields */}
          <div className="flex flex-col gap-[1vw]  ">
              <InputField
                placeholder="Enter your Email Address"
                label="E-Mail"
                labelClass={"text-[1vw]  max-tablet:text-[1.5vw] max-sm:text-[3.6vw]"}
                labelName="emailID"
                inputFieldStyle={"w-full h-12 max-sm:h-10 max-sm:text-xs"}
                errorMessageStyle={"max-sm:text-xs h-6 text-[1vw]"}
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
              <div>
                <PasswordInput
                  placeholder="Enter your Password"
                  label="Password"
                  labelName="password"
                  labelClass={"text-[1vw] max-tablet:text-[1.5vw] max-sm:text-[3.6vw]"}
                  errorMessageStyle={"max-sm:text-xs h-6 text-[1vw]"}
                  inputFieldStyle={"w-full h-12 max-sm:h-10 max-sm:text-xs"}

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
        

          </div>

          <div className="flex flex-col gap-2">
            <p className="text-blue-800 font-semibold text-[1vw] max-tablet:text-[1.5vw] max-sm:text-[3.6vw]">Forgot Password </p>

            <button
              type="submit"
              className="border-1 font-medium bg-blue-500 text-white border-black w-full text-xl text-[1.2vw] max-sm:text-[3.6vw] flex-center py-2 max-sm:py-1 mt-1 rounded-lg"
            >
              Submit
            </button>
            <p className=" font-semibold text-[1vw] max-tablet:text-[1.5vw] max-sm:text-[3.6vw]">
              Don't have an account?
              <span
                onClick={() => navigate(`/signup/${userType}`  ) }
                className="text-blue-800 underline ml-2 cursor-pointer	 "
              >
                Signup
              </span>
            </p>
          </div>
        </WhiteBackground>
        </form>

      </SlateBackground>
    </PurpleBackground>
    </>
  )
}

export default CommonLoginForm