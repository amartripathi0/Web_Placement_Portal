import React from "react";
import CommonAuthCard from "../components/CommonAuthCard";
import Navbar from "../../src/components/header/Navbar";
import { authCardDetails } from "../constants";

const MainLogin = () => {
  return (
    <section className="flex flex-col min-h-screen py-16 justify-center w-screen bg-gradient-to-r from-red-200 to-stone-400">
      <Navbar />
      <h3 className="text-2xl sm:text-4xl max-sm:mt-10 text-center font-bold">
        LOGIN 📝
      </h3>

      <div className="flex justify-evenly items-center max-sm:flex-col gap-4 px-4 mt-8 sm:mt-12">
        {authCardDetails.login.map((eachLoginDetail) => (
          <CommonAuthCard
            key={eachLoginDetail.btnLabel}
            imgSrc={eachLoginDetail.imgSrc}
            btnLabel={eachLoginDetail.btnLabel}
            btnColour={eachLoginDetail.btnColour}
            redirectRoute={eachLoginDetail.redirectRoute}
          />
          
        ))}
      </div>
    </section>
  );
};

export default MainLogin;
