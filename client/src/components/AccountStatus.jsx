import React from "react";

const AccountStatus = ({ role }) => {
  return (
    <div
      className={`${
        role === "Allowed"
          ? " bg-green-500 shadow-green-300 shadow-sm"
          : " bg-red-600 shadow-red-500 shadow-sm"
      }
    p-2 w-28 flex-center rounded hover:shadow-md transition-shadow text-white text-sm max-tablet:text-base max-sm:text-medium font-semibold`}
    >
      {role}
    </div>
  );
};

export default AccountStatus;
