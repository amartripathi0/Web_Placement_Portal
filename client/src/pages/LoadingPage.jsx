import React from "react";
import { ClipLoader } from "react-spinners";
import cn from "../utils/cn";
const LoadingPage = ({ height = "screen", width = "screen" }) => {
  return (
    <div
      className={cn(
        `h-full w-full absolute z-50 opacity-100 flex gap-2 justify-center items-center backdrop-blur-sm`,
        height,
        width
      )}
    >
      <p className="text-xl font-medium text-fuchsia-900 ">Loading...</p>
      <ClipLoader color="purple" size={22} />
    </div>
  );
};

export default LoadingPage;
