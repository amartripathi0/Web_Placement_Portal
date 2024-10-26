import React from "react";
import cn from "../../utils/cn";

const Button = ({ label, onClickHandler, additionalStyles, type, color }) => {
  return (
    <button
      onClick={onClickHandler}
      type={type}
      className={cn(
        "text-sm text-white py-2 px-3 rounded flex-center transition-colors duration-200 font-medium",
        color === "pink"
          ? "bg-pink-500 hover:bg-pink-600"
          : "bg-cyan-500 hover:bg-cyan-600",
        additionalStyles
      )}
    >
      {label}
    </button>
  );
};

export default Button;
