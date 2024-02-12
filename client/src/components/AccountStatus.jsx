import React from 'react'

const AccountStatus = ({role}) => {
  return (
    <div
    className={`${
      role === "Allowed"
        ? " bg-green-500 shadow-green-300 shadow-sm"
        : " bg-red-600 shadow-red-500 shadow-sm"
    }
    p-2 w-2/5 flex-center rounded-md hover:shadow-md transition-shadow`}
  >
    <h1 className="text-white text-[1.2vw] max-tablet:text-base max-sm:text-medium font-semibold">
      {role}
    </h1>
  </div>
  )
}

export default AccountStatus
