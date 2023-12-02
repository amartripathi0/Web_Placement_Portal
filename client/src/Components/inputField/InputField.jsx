import React from 'react'

const InputField = ({
  type , placeholder , xtraStyle , labelName , label , validationObj , error , name , onChange
}) => {
  return (
    <div className={`${xtraStyle} flex flex-col gap-1`}>
    <label htmlFor= {labelName} className='text-md font-medium ml-2'>{label}</label>
      <input type={type} 
      placeholder={placeholder}
      name = {name}
      onChange={onChange}
      className={`${xtraStyle} border-black border-2 h-12  font-semibold rounded-md pl-3 w-96`}
      {...validationObj}
     
      />

    <p className='text-red-500 h-5 font-medium text-base ml-2'> {error}</p>
    </div>
  )
}

export default InputField