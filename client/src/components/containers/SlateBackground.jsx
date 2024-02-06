import React from 'react'

const SlateBackground = ({children , additionalStyles}) => {
  return (
    <div
    className={`${additionalStyles}  bg-slate-100 shadow-slate-300 shadow-md`}
    >{children}</div>
  )
}

export default SlateBackground