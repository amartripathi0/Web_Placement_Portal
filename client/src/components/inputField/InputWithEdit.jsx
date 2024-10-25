import React, { useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { toast } from "react-toastify";

const InputWithEdit = ({
  type , placeholder , inputFieldContainerStyles , labelName ,value , label ,labelClass, validationObj , errorMessageStyle , inputFieldStyle , error , name , onChange
}
  ) => {
  const [showEdit, setShowEdit] = useState(false);
  function toggleEdit() {
    setShowEdit(prev => !prev)
  }
  return (
    <div className={`flex flex-col gap-1 w-3/5  ${inputFieldContainerStyles}`}>
      <div
        className={`${
          showEdit &&
          "border border-neutral-400 focus-within:border-neutral-900"
        } w-full h-full flex justify-end items-center`}
      >
        <input
          type={type}
          readOnly={!showEdit ? true : false}
          placeholder={placeholder}
          className={`h-8 px-2 w-full font-medium text-sm  text-right outline-none ${
            !showEdit && "outline-none"
          } ${inputFieldStyle} `}
          {...validationObj}
          onClick={() =>
            !showEdit &&
            toast.warn("Please click on the edit button to edit the fields.", {
              position: toast.POSITION.TOP_RIGHT,
            })
          }
          value={value}
        />

        <div
          onClick={toggleEdit}
          className={`${
            showEdit && "border border-l-neutral-700"
          } border-r-white border-y-white h-full pl-2 px-1 flex justify-center items-center`}
        >
          {showEdit ? <FaSave size={20} /> : <MdModeEdit size={20} />}
        </div>
      </div>

      <p
        className={` ${errorMessageStyle} ${
          !error && "invisible"
        } h-2/5 font-medium text-xs text-red-500 text-right`}
      >
        {" "}
        {error}
      </p>
    </div>
  );
};

export default InputWithEdit;
