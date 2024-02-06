import React from 'react'

const PurpleBackground = ({isLoading , additionalStyles , children}) => {
  return (
    <div
    className={`min-h-screen w-screen bg-purple-100  flex-center 
    ${additionalStyles}
    ${
      isLoading && " opacity-70 bg-gray-400"
    }`}
    >
      {children}
    </div>
  )
}

export default PurpleBackground