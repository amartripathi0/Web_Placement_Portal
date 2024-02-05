import React from 'react'

const Button = ({label , onClickHandler , additionalStyles , color}) => {
  return (
    
    <button className={` ${additionalStyles}  text-md text-white  ${color === "pink" ?  "bg-pink-500 hover:bg-pink-600" : "bg-cyan-500 hover:bg-cyan-600  "} py-2 px-3 rounded-lg flex-center transition-colors duration-200`}>

        {label}
    
    </button>
    
  )
}

export default Button
