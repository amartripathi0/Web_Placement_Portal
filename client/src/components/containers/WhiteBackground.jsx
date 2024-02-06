import React from 'react'

const WhiteBackground = ({children , additionalStyles}) => {
  return (
    <section
    className={`${additionalStyles}  bg-white rounded-md shadow-grey-300 shadow-md`}
    >{children}</section>
  )
}

export default WhiteBackground