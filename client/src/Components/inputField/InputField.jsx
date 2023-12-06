import React from 'react'

const InputField = ({
  type , placeholder , xtraStyle , labelName , label , validationObj , inputFieldStyle , error , name , onChange
}) => {
  return (
    <div className={`${xtraStyle} flex flex-col gap-1 bg-blue-100 `}>
    <label htmlFor= {labelName} className='text-md font-medium ml-2'>{label}</label>
      <input type={type} 
      placeholder={placeholder}
      name = {name}
      onChange={onChange}
      className={`${inputFieldStyle ? inputFieldStyle:  "h-12 w-96"} border-black border-2 font-semibold rounded-md pl-3 `}
      {...validationObj}
     
      />

    <p className='text-red-500 h-5 font-medium text-base ml-2'> {error}</p>
    </div>
  )
}

export default InputField