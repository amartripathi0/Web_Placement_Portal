import React from 'react'

const BlueButton = ({label , onClickHandler , additionalStyles}) => {
  return (
    
    <button className={` ${additionalStyles} w-30 text-white  p-3 pl-6 pr-6 rounded-lg flex justify-center items-center`}>

        {label}
    
    </button>
    
  )
}

export default BlueButton