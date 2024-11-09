import React, { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import cn from "../../utils/cn";

const PasswordInput = ({
  placeholder,
  inputFieldStyle,
  errorMessageStyle,
  labelClass,
  inputFieldContainerStyles,
  labelName,
  label,
  ref,
  validationObj,
  error,
}) => {
  const [showPass, setShowPass] = useState(false);
  function togglePassHide(e) {
    e.preventDefault();
    setShowPass((prev) => !prev);
  }

  return (
    <div className={cn("flex flex-col gap-1 w-64", inputFieldContainerStyles)}>
      <label
        htmlFor={labelName}
        className={cn(labelClass, "text-sm font-medium ml-2")}
      >
        {label}
      </label>

      <div
        className={cn(
          inputFieldStyle ? inputFieldStyle : "h-10",
          "border focus-within:border-neutral-900 border-neutral-500 focus-within:bg-neutral-100 text-sm rounded flex-center"
        )}
      >
        <input
          type={showPass ? "text" : "password"}
          placeholder={placeholder}
          {...validationObj}
          className="w-11/12 h-full outline-none focus:bg-neutral-100 pl-2 rounded rounded-r-none font-medium"
        />

        <button onClick={(e) => togglePassHide(e)} className="bg-neutral-200 h-full rounded-r px-2">
          {showPass ? (
            <AiFillEyeInvisible size={25}/>
          ) : (
            <AiFillEye size={25} />
          )}
        </button>
      </div>

      <p className={cn("text-red-500 text-xs ml-2", errorMessageStyle)}>
        {error}
      </p>
    </div>
  );
};

export default PasswordInput;
