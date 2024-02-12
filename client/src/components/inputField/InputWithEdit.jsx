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
    <div className={`flex flex-col gap-1 h-full  ${inputFieldContainerStyles}`}>

    <div className= {`border-black ${showEdit && "border-2"} h-3/5 w-full text-md rounded-md  flex justify-between items-center`}>
      <input
      type= {type}
      readOnly = {!showEdit ? true : false}
      placeholder={placeholder}
      className={`h-full pl-3 w-[90%] font-medium text-[1vw] text-right pr-4  ${!showEdit && " outline-none"} ${inputFieldStyle} `}
      {...validationObj}
      onClick={() => !showEdit && toast.warn("Please click on the edit button to edit the fields.",{position : toast.POSITION.TOP_RIGHT})}
      value={value}
      />
      
      <div onClick={toggleEdit} className={`${showEdit &&  "border-2 border-l-black"} border-r-white border-y-white h-full pl-2 px-1 flex justify-center items-center`}>
        {
          showEdit ?
          <FaSave size={20}  />
          :
        <MdModeEdit size={20} />
        }
      </div>
    </div>
        
    <p className={` ${errorMessageStyle  } ${ !error && "hidden"} h-2/5 font-medium text-[0.9vw] text-red-500  text-right`}> {error}</p>
      
    </div>
  );
};

export default InputWithEdit;
