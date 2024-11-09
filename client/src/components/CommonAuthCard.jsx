import React from "react";
import { useNavigate } from "react-router-dom";
import cn from "../utils/cn";

function CommonAuthCard({ imgSrc, btnLabel, btnColour, redirectRoute }) {
  const navigate = useNavigate();
  return (
    <div
      className={cn(
        "h-full max-w-60 w-60 p-4 py-6 sm:p-6 sm:py-8 border bg-slate-300 border-slate-200 hover:shadow-lg shadow-purple-200 flex-center flex-col rounded gap-4 sm:gap-8 hover:bg-slate-300 duration-200 transition-colors"
      )}
    >
      <img src={imgSrc} alt="" className="w-3/4 rounded-lg" />
      <button
        onClick={() => navigate(`${redirectRoute}`, { replace: true })}
        className={cn(
          "w-full flex-center border border-neutral-400 p-3 max-sm:px-2 text-sm font-medium rounded transition-all duration-300 transform",
          {
            "bg-cyan-400 hover:bg-cyan-500 text-neutral-900":
              btnColour === "blue",
            "bg-pink-500 hover:bg-pink-600 text-white": btnColour !== "blue",
          }
        )}
      >
        {btnLabel}
      </button>
    </div>
  );
}

export default CommonAuthCard;
