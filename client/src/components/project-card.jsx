import React from 'react';
import { NavLink } from 'react-router-dom'; 

export default function ProjectCard({ link, title , duration ,description,index }) {
  return (
    <div className="flex flex-col p-4 px-8 gap-2 bg-white rounded-md w-full shadow-grey-300 shadow-md border-neutral-300 border hover:-translate-y-2 transition-transform duration-150">
      <h3 className="text-base font-medium">Project No: {index}</h3>
      <div className="flex items-center justify-between w-full">
        <div className="flex gap-3 w-1/3 items-center">
          <h1 className="text-sm">Project Title: </h1>
          <span className="font-medium text-sm">{title}</span>
        </div>

        <div className="flex gap-3 w-1/3 items-center justify-center">
          <h1 className="text-sm">Link: </h1>
          <NavLink
            to={link}
            target="_blank"
            className="text-sm text-blue-700 underline font-medium"
          >
            {link}
          </NavLink>
        </div>

        <div className="flex gap-3 w-1/3 justify-end items-center">
          <h1 className="text-sm">Duration:</h1>
          <span className="font-medium text-sm">{duration}</span>
        </div>
      </div>
      <p className="text-sm line-clamp-4 text-ellipsis h-20">
        Description: <span className="font-medium">{description}</span>
      </p>
    </div>
  );
}
