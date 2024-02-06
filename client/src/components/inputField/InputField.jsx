import React from 'react'

const InputField = ({
  type , placeholder , inputFieldContainerStyles , labelName , label ,labelClass, validationObj , errorMessageStyle , inputFieldStyle , error , name , onChange
}) => {
  return (
    <div className={`${inputFieldContainerStyles} flex flex-col gap-1 `}>
    <label htmlFor= {labelName} className={`${labelClass} text-md font-medium ml-2`}>{label}</label>
      <input type={type} 
      placeholder={placeholder}
      name = {name}
      onChange={onChange}
      className={`${inputFieldStyle ? inputFieldStyle:  "h-12 w-full"} border-black border-2 font-semibold rounded-md pl-3 `}
      {...validationObj}
     
      />

    <p className={` ${errorMessageStyle ? errorMessageStyle : "h-5 font-medium text-base"} text-red-500  ml-2`}> {error}</p>
    </div>
  )
}

export default InputField