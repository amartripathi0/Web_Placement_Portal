import React from "react";
import { useNavigate } from "react-router-dom";
function CommonAuthCard({ imgSrc, btnLabel, btnColour, redirectRoute }) {
  const naviagte = useNavigate();
  return (
    <div className="  h-full w-2/12 max-sm:w-[46vw] py-10 max-sm:py-[4vw] border-2 bg-slate-300 border-slate-200 hover:shadow-lg shadow-purple-200 flex-center flex-col gap-9 max-sm:gap-[3.5vw] rounded-lg  hover:bg-blue-200 duration-200 transition-colors  ">
      <img src={imgSrc} alt="" className="w-[75%] rounded-lg" />
      {/* console.log(redirectRoute); */}
      <button
        onClick = {() => naviagte(`${redirectRoute}` , {replace : true })}
        className={`w-[75%] flex-center border-2 border-slate-400  p-2 px-1 text-[1vw] max-sm:text-[3vw] max-sm:px-1 font-semibold rounded-lg ${btnColour === "blue" ? "bg-cyan-300 hover:bg-cyan-600" : "bg-pink-400 hover:bg-pink-500"}  
         duration-200 transition-color  hover:text-white
         
         `}
      >
        {btnLabel}
      </button>
    </div>
  );
}

export default CommonAuthCard;
