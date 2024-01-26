import React, { useEffect, useState } from "react";
import InputField from "../../../../Components/inputField/InputField";
import axios from "axios";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useDispatch, useSelector } from "react-redux";
import {
  RESET_GLOBAL,
  SET_GLOBAL,
  getLoginStatus,
} from "../../../../redux/features/common/globalSlice";
import {
  RESET,
  getUserData,
  updateProfileDetail,
} from "../../../../redux/features/student/auth/authSlice";
import {
  uploadResume,
  RESET_UTILS,
} from "../../../../redux/features/student/utilsServices/utilSlice";
import { toast } from "react-toastify";

const Resume = () => {
  const studentUtil = useSelector((state) => state.studentUtils);
  const dispatch = useDispatch();

  const [file, setFile] = useState("");
  const { isLoading, isError, isSuccess, isLoggedIn, message, student } =
    useSelector((state) => state.studentAuth);
  const globalAuth = useSelector((state) => state.globalAuth);

  useEffect(() => {
    if (globalAuth.isLoggedin === true) {
      dispatch(getUserData());
      // console.log("data fetched");
      toast.success("Data Fetched Succesfully", {
        position: toast.POSITION.TOP_CENTER,
      });
    }

    // dispatch(RESET())
  }, [globalAuth.isLoggedin, getUserData]);

  useEffect(() => {}, [studentUtil.isSuccess]);
  function handleInputChange(e) {
    setFile(e.target.files[0]);
  }

  useEffect(() => {
    if (studentUtil.isSuccess && !studentUtil.isLoading) {
      // console.log(studentUtil.message);
      toast.success(studentUtil.message, {
        position: toast.POSITION.TOP_CENTER,
      });

      dispatch(getUserData());
      dispatch(RESET_UTILS());
    }
  }, [studentUtil.isSuccess]);
  const handleUploadResume = async (e) => {
    e.preventDefault();

    if (file.size > 5000000) {
      toast.error("Please upload file of size less than 5 MB", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else if (!file || file.type !== "application/pdf") {
      toast.error("Please upload a valid pdf file.", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      const formdata = new FormData();
      formdata.append("resume", file);
      dispatch(uploadResume(formdata));
    }
  };

  return (
    <div
      className={`${student?.resume === "" && "min-h-full"} bg-purple-100 gap-10 py-10 flex flex-col justify-center items-center ${
        (isLoading || studentUtil.isLoading) && "  blur-sm bg-gray-400"
      }`}
    >
      <div className="bg-slate-100  w-[95%] rounded-lg shadow-slate-300 shadow-md flex flex-col justify-center items-center gap-6 p-4">
        <div className=" bg-white p-2 w-96 text-center rounded-lg ">
          <h1 className="text-4xl ">Resume</h1>
        </div>

        <div className="bg-white p-2 rounded-lg w-1/2 px-20">
          <form action="" className="flex items-center justify-between">
            <h2 className="text-xl ">Upload your resume: </h2>

            <div className=" flex gap-20">
              <InputField
                type="file"
                xtraStyle="pt-1"
                name="resume"
                onChange={handleInputChange}
              />

              <button
                onClick={handleUploadResume}
                className=" w-30 text-white bg-cyan-500 hover:bg-cyan-600 p-3 pl-6 pr-6 rounded-lg flex items-center justify-center"
              >
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="bg-slate-100  w-[95%] h-full p-20 rounded-lg shadow-slate-300 shadow-md ">
        <div className="bg-white w-full p-10 rounded-md min-h-full flex justify-center items-center ">
          {student?.resume === "" ? 
            <h1 className="text-2xl font-medium text-center ">
              Please upload a valid resume in pdf format.
            </h1>
           : 
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
              {/* <Viewer fileUrl="https://res.cloudinary.com/dxh6v9voc/raw/upload/v1700587397/Placement_Web_Portal/student/resume/y2ex0cozxmawdaxnuryn.pdf" />; */}
              <Viewer fileUrl={`${student?.resume && student.resume} `} />;
            </Worker>
          }
        </div>
      </div>
      {/* <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
<Viewer fileUrl="/path/to/document.pdf" />;

</Worker> */}
    </div>
  );
};

export default Resume;
