import React from "react";
import { useNavigate } from "react-router-dom";
function SignUpCard({ imgSrc, btnLabel, redirectRoute }) {
  const naviagte = useNavigate();
  return (
    <div className=" h-[350px] w-60  border-2 bg-pink-100 border-black flex flex-col  justify-center gap-9  items-center rounded-lg  hover:bg-pink-200 duration-300 transition ease-in-out delay-100 ">
      <img src={imgSrc} alt="" className="w-[80%] rounded-lg" />
      {/* console.log(redirectRoute); */}
      <button
        onClick = {() => naviagte(`${redirectRoute}` , {replace : true })}
        className="w-[80%] border-2 border-black p-2 pl-1 text-md font-semibold rounded-lg bg-cyan-300 hover:bg-cyan-600 duration-300 transition ease-in-out delay-50 hover:text-white"
      >
        {btnLabel}
      </button>
    </div>
  );
}

export default SignUpCard;
