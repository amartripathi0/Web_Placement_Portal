import React from "react";
import { Link } from "react-router-dom";
import { computerGif, studentGIF } from "../../constants";
import SocialHandles from "../../components/social-handles";
import { ArrowRight } from "lucide-react";

const Body = () => {
  return (
    <div className="flex-center max-sm:flex-col max-sm:justify-between sm:h-screen  py-20 gap-[10vw] sm:pt-36 max-sm:pb-36 bg-gradient-to-r from-cyan-200  to-pink-300 ">
      {/* left side */}

      <div className="w-[40%] flex flex-col gap-4 max-sm:w-4/5 justify-around p-6">
        {/* Placement Nexus heading */}
        <div className="font-extrabold text-[6vw] max-sm:text-[11vw] text-neutral-950">
          <h1 className="opacity-95">PLACEMENT</h1>
          <h1 className=" leading-3 opacity-90">NEXUS</h1>
        </div>
        <p className="text-[1.5vw] font-medium text-neutral-600 m-4 max-sm:text-[4vw]">
          your gateway to success 🎯
        </p>
        <div className="text-sm text-justify bg-purple-100  p-4 max-sm:p-2 max-sm:text-[2vw] rounded-md  max-sm:w-10/12 text-neutral-800">
          <p>
            Welcome to the Placement Nexus. Discover limitless opportunities,
            connect with top employers, and accelerate your career journey. Get
            ready to step into a world of possibilities.
          </p>
          <p className="mb-6">
            Explore job openings, build your resume, and network with
            professionals. For employers, find exceptional talent to drive your
            organization forward. Unlock your potential with Placement Portal!
          </p>
          <SocialHandles nameDisable={true} />
        </div>
        <Link
          to={"/about"}
          className="text-neutral-700 bg-cyan-300 hover:bg-cyan-500 hover:text-pink-50 rounded text-[1vw] max-sm:text-[2vw] 
          w-fit p-3 px-6 font-semibold flex items-center gap-2"
        >
          PROJECT BACKGROUND
          <ArrowRight size={20} />
        </Link>
      </div>

      {/* right image */}
      <div className="w-1/3 max-sm:w-2/3 rounded-xl flex flex-col gap-4 sm:gap-8">
        <div className="flex justify-start">
          <img
            alt="placement"
            src={computerGif}
            className="h-36 sm:h-64 hover:scale-105 duration-300 hover:rotate-3 transition-transform ease-in-out object-contain rounded-xl"
          />
        </div>
        <div className="flex justify-end">
          <img
            alt="placement"
            src={studentGIF}
            className="h-36 sm:h-64 hover:scale-105 duration-300 hover:-rotate-3 transition-transform ease-in-out object-contain rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};
export default Body;
