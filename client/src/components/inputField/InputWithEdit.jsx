import React, { useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { toast } from "react-toastify";
import cn from "../../utils/cn";

const InputWithEdit = ({
  type,
  placeholder,
  inputFieldContainerStyles,
  labelName,
  value,
  label,
  labelClass,
  validationObj,
  errorMessageStyle,
  inputFieldStyle,
  error,
  name,
  onChange,
}) => {
  const [showEdit, setShowEdit] = useState(false);
  function toggleEdit(e) {
    e.preventDefault();
    setShowEdit((prev) => !prev);
  }
  return (
    <div className={cn("flex flex-col gap-1 w-3/5", inputFieldContainerStyles)}>
      <div
        className={cn(
          "w-full h-full flex justify-end items-center",
          showEdit &&
            "border border-neutral-400 focus-within:border-neutral-900"
        )}
      >
        <input
          type={type}
          readOnly={!showEdit}
          placeholder={placeholder}
          className={cn(
            "h-8 px-2 w-full font-medium text-sm text-right outline-none",
            !showEdit && "outline-none",
            inputFieldStyle
          )}
          {...validationObj}
          onClick={() =>
            !showEdit &&
            toast.warn("Please click on the edit button to edit the fields.", {
              position: toast.POSITION.TOP_RIGHT,
            })
          }
          value={value}
        />

        <button
          onClick={toggleEdit}
          className={cn(
            "border-r-white border-y-white h-full p-1.5 flex justify-center items-center opacity-70 bg-neutral-100",
            showEdit && "border border-l-neutral-700 bg-neutral-200"
          )}
        >
          {showEdit ? <FaSave size={20} /> : <MdModeEdit size={20} />}
        </button>
      </div>

      <p
        className={cn(
          errorMessageStyle,
          !error && "invisible",
          "h-2/5 font-medium text-xs text-red-500 text-right"
        )}
      >
        {error}
      </p>
    </div>
  );
};

export default InputWithEdit;
