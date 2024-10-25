import React from "react";
import cn from "../../utils/cn";

const FormField = ({ children, additionalStyles }) => {
  return (
    <div
      className={cn(
        `flex justify-between sm:gap-4 w-full rounded px-2.5 py-1.5 h-16 max-sm:flex-col max-sm:h-32 max-sm:p-2 max-sm:gap-2 border border-gray-200 hover:bg-gray-50 transition-colors duration-100`,
        additionalStyles
      )}
    >
      {children}
    </div>
  );
};

export default FormField;
