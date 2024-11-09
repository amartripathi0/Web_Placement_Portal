import React, { useEffect, useState } from "react";
import InputWithEdit from "../../../../components/inputField/InputWithEdit";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
  getStudentDetails,
  updateStudentDetails,
} from "../../../../redux/features/college/utilServices/collegeUtilSlice";
import CollegePageLayout from "../../../../components/layout/CollegePageLayout";
import { toast } from "react-toastify";

const StudentDetailToClg = () => {
  const { id: studentId } = useParams();
  const { isSuccess, student } = useSelector((state) => state.collegeStaffUtil);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const form = useForm();
  const { handleSubmit, register, setValue } = form;

  const [studStatus, setStudStatus] = useState("Allowed");

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

  const handleUpdateStudentData = (data) => {
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
  };

  return (
    <CollegePageLayout>
      <form
        onSubmit={handleSubmit(handleUpdateStudentData)}
        className="flex flex-wrap bg-slate-100 rounded-lg p-4 shadow-slate-300 shadow-md items-center justify-evenly gap-4"
      >
        <div className="w-full flex gap-3">
          <StudentInfo student={student} register={register} studStatus={studStatus} setStudStatus={setStudStatus} />
          <UpdateButton />
        </div>
        <div className="w-full flex justify-between gap-3">
          <EducationalDetail register={register} />
          <PlacementStatus register={register} />
        </div>
        <InternshipData internships={student?.pastInternshipsProjects?.internships} />
        <ProjectData projects={student?.pastInternshipsProjects?.projects} />
      </form>
    </CollegePageLayout>
  );
};

const StudentInfo = ({ student, register, studStatus, setStudStatus }) => (
  <div className="flex w-4/5 gap-3 bg-white justify-between items-center px-3 pt-3 pb-1 text-base">
    <div className="items-center flex flex-col">
      <img src={student?.personalDetail.profilePicture || ""} alt="" className="border-4 rounded-md h-32 w-32 mb-2" />
      <NavLink to={student?.resume} target="_blank" className="underline cursor:pointer text-blue-600">Resume</NavLink>
    </div>
    <div className="w-3/4 flex-col justify-between">
      <InputField label="Email" type="text" register={register("emailID")} />
      <InputField label="Phone" type="number" register={register("phone")} />
      <StatusSelect studStatus={studStatus} setStudStatus={setStudStatus} />
    </div>
  </div>
);

const InputField = ({ label, type, register }) => (
  <div className="flex gap-4 items-center justify-between">
    <p className="text-sm">{label}:</p>
    <InputWithEdit type={type} customStyle="w-40" validationObj={register} />
  </div>
);

const StatusSelect = ({ studStatus, setStudStatus }) => (
  <div className="flex gap-1 w-full justify-between items-center">
    <p className="text-sm">Status:</p>
    <label className={`font-medium -ml-2 ${studStatus === "Allowed" ? "text-green-500" : "text-red-500"}`}>{studStatus}</label>
    <select onChange={(e) => setStudStatus(e.target.value)} className="w-32 px-2 py-1 rounded-lg font-medium text-sm">
      <option value="Allowed">Allowed</option>
      <option value="Debarred">Debarred</option>
    </select>
  </div>
);

const UpdateButton = () => (
  <div className="bg-white flex flex-col items-center justify-around text-base px-3 rounded-lg w-1/4">
    <p className="font-medium text-sm">Click on the button to update :-<li>Personal details</li><li>Educational details</li><li>Placement details</li></p>
    <button className="w-40 font-semibold text-white bg-pink-500 hover:bg-pink-600 p-3 rounded-lg flex items-center justify-center text-sm">Update Details</button>
  </div>
);

const EducationalDetail = ({ register }) => (
  <div className="bg-white flex flex-col text-base p-4 gap-1 rounded-lg w-1/2">
    <p className="font-semibold text-lg">Educational Detail</p>
    <InputField label="College Name" type="text" register={register("collegeName")} />
    <InputField label="Roll Number" type="number" register={register("rollNumber")} />
    <InputField label="CGPA" type="number" register={register("cgpa")} />
    <InputField label="Year Of Passing" type="number" register={register("yearOfPassing")} />
  </div>
);

const PlacementStatus = ({ register }) => (
  <div className="bg-white flex flex-col text-base p-4 gap-1 rounded-lg w-1/2">
    <p className="font-semibold text-lg">Placement Status</p>
    <InputField label="Status" type="text" register={register("isPlaced")} />
    <InputField label="Company Name" type="text" register={register("companyName")} />
    <InputField label="Package Offered (LPA)" type="number" register={register("packageOffered")} />
    <InputField label="Placement Status" type="text" register={register("status")} />
  </div>
);

const InternshipData = ({ internships }) => (
  <div className="bg-white w-full flex flex-col gap-4 p-4">
    <p className="font-semibold text-lg">Internships</p>
    <div className="grid grid-cols-3 gap-4">
      {internships?.map((internData, index) => (
        <InternshipCard key={internData.company} internData={internData} index={index} />
      ))}
    </div>
  </div>
);

const InternshipCard = ({ internData, index }) => {
  const { register } = useForm(); 
  return (
    <div className="bg-pink-100 hover:border hover:border-pink-500 flex flex-col text-base p-3 gap-1 rounded-lg">
      <p className="font-semibold text-base ml-1">{index + 1}</p>
      <InputField label="Company Name" type="text" register={register("company")} />
      <InputField label="Role" type="text" register={register("role")} />
      <InputField label="Duration" type="text" register={register("duration")} />
      <InputField label="Description" type="text" register={register("description")} />
    </div>
  );
};

const ProjectData = ({ projects }) => (
  <div className="bg-white w-full flex flex-wrap flex-col gap-4 p-4">
    <p className="font-semibold text-lg">Projects</p>
    <div className="grid grid-cols-3 gap-4">
      {projects?.map((projectData, index) => (
        <ProjectCard key={projectData.title} projectData={projectData} index={index} />
      ))}
    </div>
  </div>
);

const ProjectCard = ({ projectData, index }) => {
  const { register } = useForm(); 
  return (
    <div className="bg-blue-50 flex flex-col text-base p-4 gap-1 rounded-lg hover:border-blue-500 hover:border">
      <p className="font-semibold text-base ml-1">{index + 1}</p>
      <InputField label="Project Title" type="text" register={register("title")} />
      <InputField label="Link" type="text" register={register("link")} />
      <InputField label="Duration" type="text" register={register("duration")} />
      <InputField label="Description" type="text" register={register("description")} />
    </div>
  );
};

export default StudentDetailToClg;
