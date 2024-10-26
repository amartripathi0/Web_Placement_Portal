import React from "react";
import cn from "../../utils/cn";

const InputField = ({
  type,
  placeholder,
  inputFieldContainerStyles,
  labelName,
  label,
  labelClass,
  validationObj,
  errorMessageStyle,
  inputFieldStyle,
  error,
  name,
  onChange,
}) => {
  return (
    <div className={cn(inputFieldContainerStyles, "flex flex-col gap-1 w-64")}>
      <label
        htmlFor={labelName}
        className={cn(labelClass, "text-sm font-medium ml-2")}
      >
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        className={cn(
          inputFieldStyle ? inputFieldStyle : "h-10 w-full",
          "border focus:border-neutral-700 border-neutral-500 focus:bg-neutral-50 text-sm rounded flex-center px-2"
        )}
        {...validationObj}
      />

      <p className={cn("text-red-500 text-xs ml-2", errorMessageStyle)}>
        {error}
      </p>
    </div>
  );
};

export default InputField;
