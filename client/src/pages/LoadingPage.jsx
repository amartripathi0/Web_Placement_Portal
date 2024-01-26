import React from 'react'
import {DotLoader, SyncLoader} from 'react-spinners'
const LoadingPage = ({height = "screen" , width = "screen"}) => {


  return (
    <div className={`h-${height} w-${width} absolute z-50 opacity-100 blur-0 flex justify-center items-center ` }>

        <SyncLoader color="purple" />
    </div>
  )
}

export default LoadingPage 