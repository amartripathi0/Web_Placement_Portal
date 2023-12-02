import React from "react";
import { AiOutlineProfile } from "react-icons/ai";
import { HiOutlineAcademicCap } from "react-icons/hi";
import { FaEnvelopeOpenText } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { RiLockPasswordLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";

const StudentSidemenu = () => {
  return (
    <div className="w-[20%] h-full bg-slate-600 text-white font-medium fixed  top-20">
      <h1 className="text-xl pl-12 pt-10 mb-10">Hi, Amar Narayan Tripathi </h1>

      <ul className="flex flex-col  text-xl gap-2 ">
        <NavLink to="profile" className={({isActive}) => isActive && 'bg-slate-800'}>
          <div className="pl-12 w-full hover:bg-slate-500 h-16 gap-4 flex items-center">
            <AiOutlineProfile size={17} />
            <li className=""> Profile</li>
          </div>
        </NavLink>

        <NavLink to="academicDetails" className={({isActive}) => isActive && 'bg-slate-800'}>
          <div className="pl-12 w-full hover:bg-slate-500 h-16 gap-4 flex items-center">
            <HiOutlineAcademicCap size={17} />
            <li>Academic Details</li>
          </div>
        </NavLink>

        <NavLink to="resume" className={({isActive}) => isActive && 'bg-slate-800'}>
          <div className="pl-12 w-full hover:bg-slate-500 h-16 gap-4 flex items-center">
            <FaEnvelopeOpenText size={13} />
            <li>Resume</li>
          </div>
        </NavLink>

        <NavLink to="interview" className={({isActive}) => isActive && 'bg-slate-800'}>
          <div className="pl-12 w-full hover:bg-slate-500 h-16 gap-4 flex items-center">
            <IoMdTime />
            <li>Interview</li>
          </div>
        </NavLink>

        <NavLink to="changePassword" className={({isActive}) => isActive && 'bg-slate-800'}>
          <div className="pl-12 w-full hover:bg-slate-500 h-16 gap-4 flex items-center">
            <RiLockPasswordLine />
            <li>Change Password</li>
          </div>
        </NavLink>
      </ul>
    </div>
  );
};

export default StudentSidemenu;
