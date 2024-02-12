import React from 'react'

const FormField = ({children , additionalStyles}) => {
  return (
    <div
    className={` ${additionalStyles} flex justify-between sm:gap-4 w-11/12   rounded-lg  px-6 py-1  h-[4.5vw] max-tablet:h-[8vw]
    max-sm:flex-col max-sm:h-32 max-sm:p-2 max-sm:gap-2 
    border-2 border-gray-200 hover:bg-gray-50 transition-colors duration-100
     
    `}
    >
        {children}
    </div>
  )
}

export default FormField
