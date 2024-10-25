import React from "react";

export default function InternshipCard({
  internshipIndex,
  company,
  role,
  duration,
  description,
}) {
  return (
    <div className="flex flex-col p-4 px-8 gap-2 bg-white rounded-md w-full shadow-grey-300 shadow-md border-neutral-300 border hover:-translate-y-2 transition-transform duration-150">
      <h3 className="text-base font-medium">
        Internship No: {internshipIndex}
      </h3>
      <div className="flex items-center justify-between w-full">
        <div className="flex gap-2 w-1/3 items-center">
          <h1 className="text-sm">Company Name: </h1>
          <span className="font-medium text-sm">{company}</span>
        </div>

        <div className="flex gap-2 w-1/3 items-center justify-center">
          <h1 className="text-sm">Role: </h1>
          <span className="text-sm font-medium">{role}</span>
        </div>

        <div className="flex gap-2 w-1/3 justify-end item-center">
          <h1 className="text-sm">Internship Duration:</h1>
          <span className="font-medium text-sm">{duration}</span>
        </div>
      </div>
      <p className="text-sm line-clamp-4 text-ellipsis h-20">
        Description: <span className="font-medium">{description}</span>
      </p>
    </div>
  );
}
