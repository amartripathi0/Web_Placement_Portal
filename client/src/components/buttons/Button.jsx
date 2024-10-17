import React from "react";

const Button = ({ label, onClickHandler, additionalStyles, type, color }) => {
  // console.log(onClickHandler);
  return (
    <button
      onClick={onClickHandler}
      type={type}
      className={` ${additionalStyles}  text-sm text-white  ${
        color === "pink"
          ? "bg-pink-500 hover:bg-pink-600"
          : "bg-cyan-500 hover:bg-cyan-600  "
      } py-2 px-3 rounded flex-center transition-colors duration-200 font-medium`}
    >
      {label}
    </button>
  );
};

export default Button;
