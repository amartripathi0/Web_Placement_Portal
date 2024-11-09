import React, { useContext, useEffect, useState } from "react";
import InputWithEdit from "../../../../components/inputField/InputWithEdit";
import { useFieldArray, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import LoadingPage from "../../../LoadingPage";
import { FiSearch } from "react-icons/fi";

import {
  updateProfileDetail,
  RESET,
  getUserData,
} from "../../../../redux/features/student/auth/authSlice";
import {
  uploadProfilePicture,
  RESET_UTILS,
} from "../../../../redux/features/student/utilsServices/utilSlice";
import { toast } from "react-toastify";
import InputField from "../../../../components/inputField/InputField";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
  getStudentDetails,
  updateStudentDetails,
} from "../../../../redux/features/college/utilServices/collegeUtilSlice";

const StudentDetailToClg = () => {
  const {id: studentId} = useParams();
  console.log(studentId)
  const { isLoading, isError, isSuccess, isLoggedIn, student } = useSelector(
    (state) => state.collegeStaffUtil
  );
  const globalAuth = useSelector((state) => state.globalAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const form = useForm();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = form;

  const [studStatus, setStudStatus] = useState("Allowed");

  function handleUpdateStudentData(data) {
    const studentData = {
      id: studentId,
      personalDetail: {
        firstName: data?.firstName,
        lastName: data?.lastName,
        emailID: data?.emailID,
        fathersName: data?.fathersName,
        mothersName: data?.mothersName,
        phone: data?.phone,
        profilePicture: student?.personalDetail.profilePicture,
      },
      educationalDetails: {
        rollNumber: data.rollNumber,
        collegeName: data.collegeName,
        cgpa: data.cgpa,
        yearOfPassing: data.yearOfPassing,
        degrees: student?.educationalDetails.degrees,
      },

      resume: student?.resume,

      role: studStatus,

      placementStatus: {
        isPlaced: student?.isPlaced,
        companyName: data.companyName,
        packageOffered: data.packageOffered,
        status: data.status,
      },

      applicationStatus: student?.applicationStatus,

      pastInternshipsProjects: student?.pastInternshipsProjects,
    };
    dispatch(updateStudentDetails(studentData));
  }
  useEffect(() => {
    if (studentId) {
      dispatch(getStudentDetails(studentId));
    } else {
      navigate("/college-staff/students/");
      toast.info("Click on Details for more details.");
    }
  }, [studentId]);

  useEffect(() => {
    if (isSuccess && student) {
      setValue("firstName", student?.personalDetail.firstName);
      setValue("lastName", student?.personalDetail.lastName);
      setValue("fathersName", student?.personalDetail.fathersName);
      setValue("mothersName", student?.personalDetail.mothersName);
      setValue("emailID", student?.personalDetail.emailID);
      setValue("phone", student?.personalDetail.phone);
      setStudStatus(student?.role);

      setValue("rollNumber", student?.educationalDetails.rollNumber);
      setValue("collegeName", student?.educationalDetails.collegeName);
      setValue("cgpa", student?.educationalDetails.cgpa);
      setValue("yearOfPassing", student?.educationalDetails.yearOfPassing);

      setValue("isPlaced", student?.placementStatus.isPlaced);

      setValue("companyName", student?.placementStatus.companyName);
      setValue("packageOffered", student?.placementStatus.packageOffered);
      setValue("status", student?.placementStatus.status);
    }
  }, [student]);

  console.log("student", student);

  return (
    <div
      className={` bg-pink-100 flex flex-col py-3 items-center ${
        (isLoading || globalAuth.isLoading) && " blur-sm"
      }`}
    >
      <form
        onSubmit={handleSubmit(handleUpdateStudentData)}
        className=" flex  flex-wrap bg-slate-100 w-[90%]  rounded-lg px-5 py-5 shadow-slate-300 shadow-md  items-center justify-evenly gap-3"
      >
        <div className="w-full flex  gap-3 ">
          <div className="flex w-full gap-3 ">
            <div className="bg-white flex justify-between items-center gap-3  px-3 pt-3 pb-1 text-base w-1/2">
              {/* Photo - Resume*/}
              <div className=" items-center flex flex-col ">
                <img
                  src={""}
                  alt=""
                  className="border-4 rounded-md  h-32 w-32 mb-2"
                />

                <NavLink
                  to={student?.resume}
                  target="_blank"
                  className=" underline cursor:pointer text-blue-600"
                >
                  Resume
                </NavLink>
              </div>

              <div className="w-3/4 flex-col justify-between">
                {/* Email */}
                <div className="flex gap-2  items-center justify-between">
                  <p className="text-sm">Email: </p>

                  <InputWithEdit
                    type="text"
                    customStyle="w-40 "
                    validationObj={{
                      ...register("emailID"),
                    }}
                  />
                </div>

                {/* phone */}
                <div className="flex gap-2  items-center justify-between">
                  <p className="text-sm">Phone: </p>
                  <InputWithEdit
                    type="number"
                    customStyle="w-40 "
                    validationObj={{
                      ...register("phone"),
                    }}
                  />
                </div>

                {/* Status */}
                <div className="flex  gap-1 w-full  justify-between items-center">
                  <p className="text-sm">Status: </p>
                  <label
                    className={`font-medium -ml-2  ${
                      studStatus === "Allowed"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {" "}
                    {studStatus}{" "}
                  </label>

                  <select
                    onChange={(e) => setStudStatus(e.target.value)}
                    className="w-32 px-2 py-1 rounded-lg  font-medium text-sm"
                  >
                    <option value="Allowed" defaultValue>
                      Allowed
                    </option>
                    <option value="Debarred" defaultValue>
                      Debarred
                    </option>
                  </select>
                </div>
              </div>
            </div>

            {/* personal detail */}
            <div className="bg-white flex flex-col text-base p-2 gap-1 rounded-lg w-1/2 ">
              <p className="font-semibold text-lg ">Personal Detail</p>

              <div className="flex  items-center justify-between  gap-2 ">
                <p className="text-sm">First Name:</p>
                <InputWithEdit
                  type="text"
                  customStyle="w-56 text-right "
                  validationObj={{
                    ...register("firstName"),
                  }}
                />
              </div>
              <div className="flex  items-center justify-between  gap-2  ">
                <p className="text-sm">Last Name:</p>
                <InputWithEdit
                  type="text"
                  customStyle="w-56 "
                  validationObj={{
                    ...register("lastName"),
                  }}
                />
              </div>

              <div className="flex  items-center justify-between  gap-2 ">
                <p className="text-sm">Father's Name:</p>
                <InputWithEdit
                  type="text"
                  customStyle="w-56 "
                  validationObj={{
                    ...register("fathersName"),
                  }}
                />
              </div>

              <div className="flex  items-center justify-between  gap-2 ">
                <p className="text-sm">Mother Name:</p>
                <InputWithEdit
                  type="text"
                  customStyle="w-56 "
                  validationObj={{
                    ...register("mothersName"),
                  }}
                />
              </div>
            </div>
          </div>

          <div className="bg-white flex flex-col items-center justify-around text-base  px-3  rounded-lg w-1/5 ">
            <p className="font-medium text-sm">
              Click on the button to update :-
              <li>Personal details</li>
              <li>Educational details</li>
              <li>Placement details</li>
            </p>
            <button className="w-40 font-semibold text-white bg-pink-500 hover:bg-pink-600 p-2 rounded-lg flex items-center justify-center text-sm">
              Update Details
            </button>
          </div>
        </div>

        <div className="w-full flex justify-between gap-3">
          {/* educational detail */}
          <div className="bg-white flex flex-col text-base p-2 gap-1 rounded-lg  w-1/2">
            <p className="font-semibold text-lg ">Educational Detail</p>

            <div className="flex  items-center justify-between  gap-2 ">
              <p className="text-sm">College Name:</p>
              <InputWithEdit
                type="text"
                customStyle="w-56 "
                validationObj={{
                  ...register("collegeName"),
                }}
              />
            </div>

            <div className="flex gap-2  items-center justify-between">
              <p className="text-sm">Roll Number: </p>
              <InputWithEdit
                type="number"
                customStyle="w-56 "
                validationObj={{
                  ...register("rollNumber"),
                }}
              />
            </div>
            <div className="flex gap-2  items-center justify-between">
              <p className="text-sm">CGPA : </p>
              <InputWithEdit
                type="number"
                customStyle="w-56 "
                validationObj={{
                  ...register("cgpa"),
                }}
              />
            </div>
            <div className="flex gap-2  items-center justify-between">
              <p className="text-sm">Year Of Passing : </p>
              <InputWithEdit
                type="number"
                customStyle="w-56 "
                validationObj={{
                  ...register("yearOfPassing"),
                }}
              />
            </div>
          </div>

          {/* placement status */}
          <div className="bg-white flex flex-col text-base p-2 gap-1 rounded-lg  w-1/2">
            <p className="font-semibold text-lg ">Placement Status</p>

            <div className="flex  items-center justify-between  gap-2 ">
              <p className="text-sm">Status:</p>
              <InputWithEdit
                type="text"
                customStyle="w-56 "
                validationObj={{
                  ...register("isPlaced"),
                }}
              />
            </div>

            <div className="flex gap-2  items-center justify-between">
              <p className="text-sm">Company Name </p>
              <InputWithEdit
                type="text"
                customStyle="w-56 "
                validationObj={{
                  ...register("companyName"),
                }}
              />
            </div>
            <div className="flex gap-2  items-center justify-between">
              <p className="text-sm">Package Offered (LPA): </p>
              <InputWithEdit
                type="number"
                customStyle="w-56 "
                validationObj={{
                  ...register("packageOffered"),
                }}
              />
            </div>
            <div className="flex gap-2  items-center justify-between">
              <p className="text-sm">Placement Status : </p>
              <InputWithEdit
                type="text"
                customStyle="w-56 "
                validationObj={{
                  ...register("status"),
                }}
              />
            </div>
          </div>
        </div>
        {/* Internship Data */}

        <div className="bg-white  w-full flex flex-col gap-2 p-2">
          <p className="font-semibold text-lg ">Internships</p>

          <div className="flex gap-2">
            {student?.pastInternshipsProjects?.internships.map((internData) => (
              <div
                key={
                  student?.pastInternshipsProjects?.internships.indexOf(
                    internData
                  ) + internData.company
                }
                className="bg-purple-50 w-1/4  flex flex-col text-base p-2 gap-1 rounded-lg "
              >
                <p className="font-semibold text-base ml-1">
                  {student?.pastInternshipsProjects?.internships.indexOf(
                    internData
                  ) + 1}
                </p>

                <div className="flex  items-center justify-between  gap-2 ">
                  <p className="text-sm">Company Name:</p>
                  <InputWithEdit
                    type="text"
                    customStyle="w-40 bg-purple-50"
                    value={
                      student?.pastInternshipsProjects.internships[
                        student?.pastInternshipsProjects?.internships.indexOf(
                          internData
                        )
                      ].company
                    }
                    name="company"
                  />
                </div>
                <div className="flex  items-center justify-between  gap-2 ">
                  <p className="text-sm">Role:</p>
                  <InputWithEdit
                    type="text"
                    customStyle="w-40 bg-purple-50"
                    value={
                      student?.pastInternshipsProjects.internships[
                        student?.pastInternshipsProjects?.internships.indexOf(
                          internData
                        )
                      ].role
                    }
                    name="role"
                  />
                </div>

                <div className="flex  items-center justify-between  gap-2 ">
                  <p className="text-sm">Duration:</p>
                  <InputWithEdit
                    type="text"
                    customStyle="w-40 bg-purple-50"
                    value={
                      student?.pastInternshipsProjects.internships[
                        student?.pastInternshipsProjects?.internships.indexOf(
                          internData
                        )
                      ].duration
                    }
                    name="duration"
                  />
                </div>

                <div className="flex  items-center justify-between  gap-2 ">
                  <p className="text-sm">Description:</p>
                  <InputWithEdit
                    type="text"
                    customStyle="w-40 bg-purple-50"
                    value={
                      student?.pastInternshipsProjects.internships[
                        student?.pastInternshipsProjects?.internships.indexOf(
                          internData
                        )
                      ].description
                    }
                    name="description"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div className="bg-white  w-full flex flex-col gap-2 p-2">
          <p className="font-semibold text-lg  ">Projects</p>
          <div className="flex gap-2">
            {student?.pastInternshipsProjects?.projects.map((projectData) => (
              <div
                className="bg-blue-50  flex flex-col text-base p-2 gap-1 rounded-lg w-1/4"
                key={projectData.title}
              >
                <p className="font-semibold text-base ml-1">
                  {student?.pastInternshipsProjects?.projects.indexOf(
                    projectData
                  ) + 1}
                </p>

                <div className="flex  items-center justify-between  gap-2 bg-blue-50 ">
                  <p className="text-sm">Project Title:</p>
                  <InputWithEdit
                    type="text"
                    customStyle="w-40  bg-blue-50 "
                    value={
                      student?.pastInternshipsProjects.projects[
                        student?.pastInternshipsProjects?.projects.indexOf(
                          projectData
                        )
                      ].title
                    }
                  />
                </div>
                <div className="flex  items-center justify-between  gap-2 ">
                  <p className="text-sm">Link:</p>
                  <InputWithEdit
                    type="text"
                    customStyle="w-40  bg-blue-50"
                    value={
                      student?.pastInternshipsProjects.projects[
                        student?.pastInternshipsProjects?.projects.indexOf(
                          projectData
                        )
                      ].link
                    }
                  />
                </div>

                <div className="flex  items-center justify-between  gap-2 ">
                  <p className="text-sm">Duration:</p>
                  <InputWithEdit
                    type="text"
                    customStyle="w-40 bg-blue-50"
                    value={
                      student?.pastInternshipsProjects.projects[
                        student?.pastInternshipsProjects?.projects.indexOf(
                          projectData
                        )
                      ].duration
                    }
                  />
                </div>

                <div className="flex  items-center justify-between  gap-2 ">
                  <p className="text-sm">Description:</p>
                  <InputWithEdit
                    type="text"
                    customStyle="w-40 bg-blue-50"
                    value={
                      student?.pastInternshipsProjects.projects[
                        student?.pastInternshipsProjects?.projects.indexOf(
                          projectData
                        )
                      ].description
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default StudentDetailToClg;
