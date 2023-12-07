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
    if (isSuccess && message) {
      console.log(message);
    } else {
      dispatch(getJobs());
    }
  }, [isSuccess, message]);

  return (
    <div className="h-screen bg-purple-100 flex flex-col  items-center gap-10 pt-20 ">
      {message &&
        message.map((eachJobObj) => (
          <div className="bg-slate-100 w-[90%] p-10 gap-5 flex flex-col  rounded-xl hover:bg-slate-200  transition-all">
            <div className="flex justify-between items-center px-2">
              <div>
                <h1 className=" bg-white p-3 rounded-md  text-2xl">
                  Company Name :{" "}
                  <span className="font-bold">{eachJobObj.company}</span>
                </h1>
              </div>
            </div>

            <div className="bg-white flex flex-col justify-around gap-8 rounded-lg p-10">
              {eachJobObj.jobs.map((eachJob) => (
                <div className="flex items-center justify-between w-full border-2 bg-blue-50 border-purple-600 rounded-lg p-5 transition-all hover:bg-blue-100 hover:shadow-purple-300 shadow-sm">
                  <div className="flex w-4/5 h-24 ">
                    <div className="flex-col flex w-1/2  justify-between  ">
                      <div className="flex gap-3  items-center ">
                        <h1 className="text-2xl ">Job Role: </h1>
                        <span className=" font-semibold text-2xl ">
                          {eachJob.role}
                        </span>
                      </div> 

                      <div className="flex  gap-3  items-center ">
                        <h1 className="text-2xl"> Qualifications:</h1>
                        <div>
                          {eachJob.qualifications.map((qual) => (
                            <span className="font-semibold text-xl">
                              {" "}
                              {qual}
                            </span>
                          ))}
                        </div>
                      </div>

                     
                    </div>

                    <div className="flex-col flex w-1/2 justify-between">
                        <div className="flex gap-3  items-center  ">
                          <h1 className="text-2xl ">End Date: </h1>
                          <span className=" font-semibold text-2xl ">
                            {eachJob.applicationDeadline.split("T")[0]}
                          </span>
                        </div>

                        <div className="flex gap-3  items-center">
                          <h1 className="text-2xl ">Start Date: </h1>
                          <span className=" font-semibold text-2xl ">
                            {eachJob.startDate.split("T")[0]}
                          </span>
                        </div>
                      </div>
                  </div>

                  <button className=" w-40 text-lg font-semibold text-white bg-cyan-500 hover:bg-cyan-600 p-3 pl-6 pr-6 rounded-lg flex items-center justify-center">
                    Apply
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default JobVacancies;
