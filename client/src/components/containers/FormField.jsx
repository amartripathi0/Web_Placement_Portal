import React from "react";

const FormField = ({ children, additionalStyles }) => {
  return (
    <div
      className={` ${additionalStyles} flex justify-between sm:gap-4 w-11/12 rounded  px-2.5 py-1.5 h-16 max-tablet:h-[8vw] max-sm:flex-col max-sm:h-32 max-sm:p-2 max-sm:gap-2 
      border border-gray-200 hover:bg-gray-50 transition-colors duration-100
    `}
    >
      {children}
    </div>
  );
};

export default FormField;
