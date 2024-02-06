import React, { useState } from 'react'
import {AiFillEyeInvisible , AiFillEye} from 'react-icons/ai'

const PasswordInput = ({ type , placeholder ,inputFieldStyle,errorMessageStyle ,labelClass, inputFieldContainerStyles , handlePassChange,labelName , label ,ref, validationObj , error}) => {

    const [showPass , setShowPass] = useState(false)
    function togglePassHide(){
            setShowPass(prev => !prev)
    }
  return (
    <div className={`${inputFieldContainerStyles} flex flex-col gap-1 `}>
    <label htmlFor= {labelName} className={`${labelClass} text-md font-medium ml-2`}>{label}</label>
  
    <div className= {` ${inputFieldStyle ? inputFieldStyle:  "h-12 w-full"} border-black border-2  text-md rounded-md  flex justify-between items-center`}>
      <input
      type= {showPass ? "text": "password"}
      placeholder={placeholder}
    
      onChange={handlePassChange}
      {...validationObj}
      className='w-11/12 h-full !outline-none pl-3  font-semibold '

      />

      <button onClick={togglePassHide}>
        {
            showPass ? 
            <AiFillEyeInvisible size = {25} className='mr-2'/>
            :
            <AiFillEye size = {25} className = 'mr-2' />
        }
      </button>

    </div>
      
    <p className={` ${errorMessageStyle ? errorMessageStyle : "h-5 font-medium text-base"} text-red-500  ml-2`}> {error}</p>
    </div>

  )
}

export default PasswordInput