import React, { useEffect, useState } from "react";
import InputField from "../../../../components/inputField/InputField";
import axios from "axios";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useDispatch, useSelector } from "react-redux";
import UserLayout from "../../../../components/layout/UserLayout";

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
    if (globalAuth.isLoggedin) {
      dispatch(getUserData());
      toast.success("Data Fetched Successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [globalAuth.isLoggedin, dispatch]);

  useEffect(() => {
    if (studentUtil.isSuccess && !studentUtil.isLoading) {
      toast.success(studentUtil.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      dispatch(getUserData());
      dispatch(RESET_UTILS());
    }
  }, [studentUtil.isSuccess, dispatch]);

  const handleInputChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUploadResume = (e) => {
    e.preventDefault();

    if (file.size > 5000000) {
      toast.error("Please upload a file less than 5 MB", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else if (!file || file.type !== "application/pdf") {
      toast.error("Please upload a valid PDF file.", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      const formdata = new FormData();
      formdata.append("resume", file);
      dispatch(uploadResume(formdata));
    }
  };
  console.log(student?.resume);
  return (
    <UserLayout
      slateBgStyles={"w-full h-full p-10"}
      purpleBgStyles={"justify-start"}
    >
      <div className="bg-slate-200 w-4/5 mx-auto rounded-lg shadow-md flex flex-col justify-center items-center gap-6 p-4">
        <h2 className="text-lg bg-white p-2 w-96 text-center rounded-lg">
          View or Update your Resume
        </h2>

        <form className="flex items-center justify-between bg-white p-4 rounded-lg w-2/5">
          <input
            type="file"
            name="resume"
            onChange={handleInputChange}
            className="border border-neutral-400 w-52 text-xs"
          />
          <button
            onClick={handleUploadResume}
            className="text-white text-sm bg-cyan-500 hover:bg-cyan-600 rounded px-4 py-2"
          >
            Upload
          </button>
        </form>
      </div>

      <div className="bg-white w-full p-8 mt-8 rounded-md min-h-full flex justify-center items-center">
        {student?.resume === "" ? (
          <h1 className="text-base font-medium text-center">
            Please upload a valid resume in PDF format.
          </h1>
        ) : (
          student?.resume && (
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
              <Viewer fileUrl={student?.resume || ""} />
            </Worker>
          )
        )}
      </div>
    </UserLayout>
  );
};

export default Resume;
