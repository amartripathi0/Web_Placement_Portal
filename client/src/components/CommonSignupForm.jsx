import React from 'react'
import Navbar from './header/Navbar'
import PurpleBackground from './containers/PurpleBackground'
import LoadingPage from '../pages/LoadingPage'
import SlateBackground from './containers/SlateBackground'
import WhiteBackground from './containers/WhiteBackground'
import { IoMdArrowBack } from 'react-icons/io'
import InputField from './inputField/InputField'
import { companyNameValidation, emailValidation, firstNameValidation, lastNameValidation, passwordValidation, phoneValidation, staffIdValidation } from '../utils/formValidation'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import PasswordInput from './inputField/PasswordInput'
import Button from './buttons/Button'

const CommonSignupForm = ({isLoading , onSignupFormSubmitHandler , signupHeading , userType}) => {
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
    <Navbar/>
    <PurpleBackground
     isLoading={isLoading}
     additionalStyles={"pt-20  max-sm:py-10 max-sm:pt-24 "}
    >
      {isLoading && <LoadingPage height="screen" width="screen" />}

      <SlateBackground additionalStyles=" relative w-4/5 flex-center   max-sm:w-11/12 flex-col gap-10 p-10 max-sm:py-10 max-sm:px-2">
      
        <WhiteBackground additionalStyles="flex-center px-[2.5vw] py-[1.5vw]  text-[1.5vw] max-tablet:text-[2vw] max-sm:text-xl max-sm:p-4 font-medium">
          {signupHeading}
        </WhiteBackground>

        <div
          onClick={() => navigate("/signup")}
          className=" absolute top-[3.5vw] left-[6vw] max-tablet:p-2 max-sm:p-1 max-sm:top-12 max-sm:left-2 max-tablet:top-12 max-tablet:left-16 bg-white p-3 border-2 border-purple-400 rounded-full hover:shadow-md "
        >
          <IoMdArrowBack size={20} />
        </div>

        <form
          action=""
          onSubmit={handleSubmit(onSignupFormSubmitHandler)}
          noValidate
          className="flex-center w-full"  
        >
          <WhiteBackground additionalStyles=" flex-center flex-col   p-10  w-[90%] max-sm:p-4 gap-10 ">

            <div className="flex items-center w-4/5 max-tablet:flex-col max-sm:w-11/12 flex-wrap justify-around max-sm:py-6">


            <InputField
              placeholder="Enter your first name"
              label="First Name"
              labelName=""
              inputFieldContainerStyles={"w-2/5 max-tablet:w-4/5 max-sm:w-full"}
              labelClass={"text-[1vw]  max-tablet:text-base max-sm:text-base"}
              inputFieldStyle={" h-12 max-sm:h-10 max-sm:text-xs"}
              errorMessageStyle={"max-sm:text-xs h-6 text-[1vw]"}              
              validationObj={{
                ...register("firstName", firstNameValidation),
              }}
              error={errors.firstName?.message}
            />

            <InputField
              placeholder="Enter your last name"
              label="Last Name"
              labelName=""
              inputFieldContainerStyles={"w-2/5 max-tablet:w-4/5 max-sm:w-full"}
              labelClass={"text-[1vw]  max-tablet:text-base max-sm:text-base"}
              inputFieldStyle={"h-12 max-sm:h-10 max-sm:text-xs"}
                errorMessageStyle={"max-sm:text-xs h-6 text-[1vw]"}
              validationObj={{
                ...register("lastName", lastNameValidation),
              }}
              error={errors.lastName?.message}
            />  


            <InputField
                placeholder="Enter your Email Address"
                label="E-Mail"
                labelName="emailID"
                inputFieldContainerStyles={"w-2/5 max-tablet:w-4/5 max-sm:w-full"}
                labelClass={"text-[1vw]  max-tablet:text-base max-sm:text-base"}
                inputFieldStyle={" h-12 max-sm:h-10 max-sm:text-xs"}
                errorMessageStyle={"max-sm:text-xs h-6 text-[1vw]"}
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
              inputFieldContainerStyles={"w-2/5 max-tablet:w-4/5 max-sm:w-full"}
              labelClass={"text-[1vw]  max-tablet:text-base max-sm:text-base"}
              inputFieldStyle={" h-12 max-sm:h-10 max-sm:text-xs"}
                errorMessageStyle={"max-sm:text-xs h-6 text-[1vw]"}
              validationObj={{
                ...register("phone", phoneValidation)
              }}
              error={errors.phone?.message}
            />

            {
                (userType === "college-staff" || userType === 'company')
                &&
              <InputField
                placeholder="Enter your Staff-ID"
                label="Staff-ID"
                labelName=""
                type="number"
                inputFieldContainerStyles={"w-2/5 max-tablet:w-4/5 max-sm:w-full"}
                labelClass={"text-[1vw]  max-tablet:text-base max-sm:text-base"}
                inputFieldStyle={" h-12 max-sm:h-10 max-sm:text-xs"}
                    errorMessageStyle={"max-sm:text-xs h-6 text-[1vw]"}
                validationObj={{
                    ...register("staffID", staffIdValidation)
                }}
                error={errors.staffID?.message}
            />
            }

            {
                userType === 'company' &&
                <InputField
                    placeholder="Enter your company name"
                    label="Company Name"
                    labelName=""
                    inputFieldContainerStyles={"w-2/5 max-tablet:w-4/5 max-sm:w-full"}
                    labelClass={"text-[1vw]  max-tablet:text-base max-sm:text-base"}
                    inputFieldStyle={"h-12 max-sm:h-10 max-sm:text-xs"}
                        errorMessageStyle={"max-sm:text-xs h-6 text-[1vw]"}
                    validationObj={{
                        ...register("company", companyNameValidation),
                    }}
                    error={errors.company?.message}
            />
            }
              
            <PasswordInput
              placeholder="Enter your Password"
              label="Password"
              labelName=""
              inputFieldContainerStyles={"w-2/5 max-tablet:w-4/5 max-sm:w-full max-sm:py-2"}
              labelClass={"text-[1vw]  max-tablet:text-base max-sm:text-base"}
              inputFieldStyle={" h-12 max-sm:h-10 max-sm:text-xs"}
                errorMessageStyle={"max-sm:text-xs h-6 text-[1vw]"}
              validationObj={{
                ...register("password", passwordValidation),
              }}
              error={errors.password?.message}
            />

            <PasswordInput
              placeholder="Enter your Confirm Password"
              label="Confirm Password"
              labelName=""
              inputFieldContainerStyles={"w-2/5 max-tablet:w-4/5 max-sm:w-full max-sm:py-2"}
              labelClass={"text-[1vw]  max-tablet:text-base max-sm:text-base"}
              inputFieldStyle={" h-12 max-sm:h-10 max-sm:text-xs"}
                errorMessageStyle={"max-sm:text-xs h-6 text-[1vw]"}
              validationObj={{
              ...register("cpass", {...passwordValidation , 
                validate: {
                  same: (v) =>
                    v === getValues().password ||
                    "Password and Confirm Password don't match!",
                }
              })
              }}
              error={errors.cpass?.message}
            />
            </div>
      
          <div className="flex flex-col items-center gap-1">
            <p className="font-medium max-sm:text-sm">
              Already have an account?{" "}
              <span
                onClick={() => navigate(`/signin/${userType}`)}
                className="text-blue-700 font-semibold underline cursor-pointer"
              >
                Signin
              </span>
            </p>
            <p className="text-center">or</p>
            <Button
                type={"submit"}
                label={"Signup"}
                color={"pink"}
                additionalStyles={"max-sm:w-full font-semibold text-white "}
              />

          </div>

          </WhiteBackground>

        </form>
      </SlateBackground>
    </PurpleBackground>
    </>
  )
}

export default CommonSignupForm