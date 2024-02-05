import React from "react";
import CommonAuthCard from "../components/CommonAuthCard";
import Navbar from "../../src/components/header/Navbar";
import { authCardDetails } from "../constants";
function MainSignUp() {
  return (
    <div className=" flex flex-col min-h-screen py-16  justify-center gap-16   w-screen bg-gradient-to-r from-purple-300 to-stone-400 ">
      <Navbar />

      <h1 className="text-[3.5vw] max-sm:text-4xl max-sm:mt-10 text-center font-bold">SIGN-UP📝</h1>

      <div className=" flex justify-evenly items-center max-sm:flex-col max-sm:gap-[8vw] max-sm:w   min-sm:h-[24vw]">

      {authCardDetails.signup.map( eachSignupDetail => (
        <CommonAuthCard 
        key={eachSignupDetail.btnLabel}
        imgSrc={eachSignupDetail.imgSrc}
        btnLabel={eachSignupDetail.btnLabel}
        btnColour={eachSignupDetail.btnColour}
        redirectRoute={eachSignupDetail.redirectRoute}

        />
      ))}

      </div>
    </div>
  );
}

export default MainSignUp;
