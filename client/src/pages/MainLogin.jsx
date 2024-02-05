import React from "react";
import CommonAuthCard from "../components/CommonAuthCard";
import Navbar from "../../src/components/header/Navbar";
import { authCardDetails } from "../constants";

const MainLogin = () => {
  return (
    <div className=" flex flex-col min-h-screen py-16  justify-center gap-16   w-screen bg-gradient-to-r from-red-200 to-stone-400">
      <Navbar />
      <h1 className="text-[3.5vw] max-sm:text-4xl max-sm:mt-10 text-center font-bold">LOGIN📝</h1>

      <div className="  flex justify-evenly items-center max-sm:flex-col max-sm:gap-[8vw] max-sm:w   min-sm:h-[24vw] ">
      {authCardDetails.login.map( eachLoginDetail => (
        <CommonAuthCard 
        key={eachLoginDetail.btnLabel}
        imgSrc={eachLoginDetail.imgSrc}
        btnLabel={eachLoginDetail.btnLabel}
        btnColour={eachLoginDetail.btnColour}
        redirectRoute={eachLoginDetail.redirectRoute}
        />
      ))}
      </div>
    </div>
  );
};

export default MainLogin;
