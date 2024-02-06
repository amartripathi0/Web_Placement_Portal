import React from 'react'

const WhiteBackground = ({children , additionalStyles}) => {
  return (
    <div
    className={`${additionalStyles}  bg-white rounded-md shadow-grey-300 shadow-md`}
    >{children}</div>
  )
}

export default WhiteBackground