import React, { useEffect } from "react";
import InputWithEdit from "../../../../Components/inputField/InputWithEdit";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import { NavLink } from "react-router-dom";
import { getJobs } from "../../../../redux/features/student/utilsServices/utilSlice";

const JobVacancies = () => {
  const { isLoggedIn, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.studentUtils
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if(isSuccess && message){
      console.log(message);
    }
    else{

      dispatch(getJobs());
    }
  }, [isSuccess, message]);

  return (

    <div className=" bg-purple-100 flex flex-col gap-10 p-20">
      
     {
        message &&
        message.map(eachJobObj => (
        <div className="bg-slate-100 w-[90%] ">
        
        
        <h1>Company Name : <span>{eachJobObj.company}</span></h1>

        <div className="bg-white flex flex-col gap-10">
          {
            eachJobObj.jobs.map( eachJob => (


              <div className="flex items-center justify-between w-full border-2 border-solid-1">

              <div className="flex gap-3 w-1/3 items-center ">
               <h1 className="text-2xl ">Job Role:  </h1>
               <span className=" font-bold text-2xl ">{eachJob.role}</span>
               </div>
 
               <div className="flex gap-3 w-1/3 items-center ">
               <h1 className="text-2xl ">Start Date:  </h1>
               <span className=" font-bold text-2xl ">{eachJob.startDate.split('T')[0]}</span>
               </div>
 
               <div className="flex gap-3 w-1/3 items-center ">
               <h1 className="text-2xl ">End Date:  </h1>
               <span className=" font-bold text-2xl ">{eachJob.applicationDeadline.split('T')[0]}</span>
               </div>
 
               <div className="flex gap-3 w-1/3 justify-end items-center">
               <h1 className="text-2xl"> Qualifications:</h1>
               <div>
                 {
                     eachJob.qualifications.map(qual => (
                       <span className="font-medium text-xl"> {qual}</span>
 
                     ))
                 }
 
               </div>
               </div>
           </div>

            ))
          }
            </div>
        
        </div>

        ))

      }
      
    </div>
  );
};

export default JobVacancies;


