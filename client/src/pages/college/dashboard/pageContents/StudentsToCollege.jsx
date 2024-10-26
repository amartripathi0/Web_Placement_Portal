import React, { useEffect, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { apiContext } from "../CollegeDashboard";
import InputField from "../../../../components/inputField/InputField";
import { RESET_GLOBAL } from "../../../../redux/features/common/globalSlice";

const StudentsToCollege = () => {
  const { apiURL, setAPIURL } = useContext(apiContext);
  const globalAuth = useSelector((state) => state.globalAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchVal, setSearchVal] = useState("");
  const [debouncedInputValue, setDebouncedInputValue] = useState("");

  const { isSuccess, collegeStaff } = useSelector(
    (state) => state.collegeStaffUtil
  );
  useEffect(() => {
    if (!globalAuth.isLoggedin && !globalAuth.isLoading) {
      navigate("/signin");
      dispatch(RESET_GLOBAL);
    }
  }, [globalAuth.isLoggedin]);

  function handleSetSearchValue(e) {
    setSearchVal(e.target.value);
  }
  useEffect(() => {
    const delayInputTimeoutId = setTimeout(
      () => setDebouncedInputValue(searchVal),
      500
    );
    return () => clearTimeout(delayInputTimeoutId);
  }, [searchVal]);
  console.log(debouncedInputValue);
  return (
    <div
      className={`bg-purple-100 min-h-screen flex flex-col pt-28 items-center gap-8`}
    >
      <SearchBar handleSetSearchValue={handleSetSearchValue} />
      <StudentList
        collegeStaff={collegeStaff}
        setAPIURL={setAPIURL}
        searchVal={debouncedInputValue}
      />
    </div>
  );
};

const SearchBar = ({ handleSetSearchValue }) => (
  <div className="flex justify-center bg-slate-100 w-4/5 py-2  rounded-lg shadow-slate-300 shadow-md">
    <div className="bg-white flex-center py-2 w-1/2 gap-4 rounded">
      <h3 className="text-base">Enter Student's Name : </h3>
      <InputField
        placeholder="Enter the student's name here"
        labelName=""
        onChange={(e) => handleSetSearchValue(e)}
        inputFieldContainerStyles={"w-1/2"}
      />
    </div>
  </div>
);

const StudentList = ({ collegeStaff, setAPIURL, searchVal }) => (
  <div className="flex flex-col bg-slate-100 w-[90%] rounded-lg p-6 shadow-slate-300 shadow-md items-center justify-evenly gap-8">
    {collegeStaff?.studentDetails
      .filter((eachStudent) =>
        (
          eachStudent.personalDetail.firstName +
          " " +
          eachStudent.personalDetail.lastName
        ).startsWith(searchVal)
      )
      .map((eachStudent) => (
        <StudentCard
          key={eachStudent._id}
          eachStudent={eachStudent}
          setAPIURL={setAPIURL}
        />
      ))}
  </div>
);

const StudentCard = ({ eachStudent, setAPIURL }) => (
  <div className="flex items-center justify-evenly p-4 gap-4 bg-slate-200 rounded h-full w-full shadow-grey-700 shadow-md">
    <StudentProfile eachStudent={eachStudent} />
    <StudentDetails eachStudent={eachStudent} setAPIURL={setAPIURL} />
  </div>
);

const StudentProfile = ({ eachStudent }) => (
  <div className="bg-white flex flex-col items-center w-1/6 rounded">
    <img
      src={eachStudent.personalDetail.profilePicture}
      alt=""
      className="p-1 aspect-square"
    />
    <div className="flex justify-between w-full p-4">
      <NavLink
        to={eachStudent.resume}
        target="_blank"
        className="text-sm underline cursor:pointer text-blue-600"
      >
        Resume
      </NavLink>
      <NavLink
        to={`/college-staff/studentDetails/${eachStudent._id}`}
        className="text-sm underline cursor:pointer text-blue-600"
      >
        Details
      </NavLink>
    </div>
  </div>
);

const StudentDetails = ({ eachStudent, setAPIURL }) => (
  <div className="flex justify-between w-4/5 gap-8">
    <StudentAcademicDetails eachStudent={eachStudent} />
    <StudentPlacementDetails eachStudent={eachStudent} />
    <StudentInternshipProjectDetails eachStudent={eachStudent} />
  </div>
);

const StudentAcademicDetails = ({ eachStudent }) => (
  <div className="flex flex-col text-sm gap-4 w-1/3">
    <div className="bg-white p-2 flex flex-col gap-2 rounded">
      <DetailRow
        label="Name:"
        value={`${eachStudent.personalDetail.firstName} ${eachStudent.personalDetail.lastName}`}
      />
      <DetailRow label="Email:" value={eachStudent.personalDetail.emailID} />
      <DetailRow label="Phone:" value={eachStudent.personalDetail.phone} />
    </div>
    <div className="bg-white p-2 flex flex-col gap-2">
      <DetailRow
        label="Roll Number:"
        value={eachStudent.educationalDetails.rollNumber}
      />
      <DetailRow
        label="College Name:"
        value={eachStudent.educationalDetails.collegeName}
      />
      <DetailRow label="CGPA:" value={eachStudent.educationalDetails.cgpa} />
      <DetailRow
        label="Year Of Passing:"
        value={eachStudent.educationalDetails.yearOfPassing}
      />
    </div>
  </div>
);

const StudentPlacementDetails = ({ eachStudent }) => (
  <div className="flex flex-col text-sm gap-4 w-1/3">
    <div className="bg-white p-2 flex flex-col gap-2">
      <DetailRow
        label="Placed:"
        value={eachStudent.placementStatus.isPlaced ? "Placed" : "Not Placed"}
      />
      <DetailRow
        label="Company:"
        value={eachStudent.placementStatus.companyName}
      />
      <DetailRow
        label="Package Offered:"
        value={`${eachStudent.placementStatus.packageOffered} LPA`}
      />
    </div>
    <PlacementStatus eachStudent={eachStudent} />
  </div>
);

const PlacementStatus = ({ eachStudent }) => (
  <div className="flex flex-col justify-between h-1/2 gap-4">
    <SelectRow label="Status:" options={["Allowed", "Suspended"]} />
    <SelectRow
      label="Application Status:"
      options={[
        "Allowed",
        "Debarred",
        "Form Submitted",
        "Shortlisted",
        "Online Assessment",
        "Technical Interview",
        "HR Interview",
        "Offer Letter",
      ]}
    />
  </div>
);

const StudentInternshipProjectDetails = ({ eachStudent }) => (
  <div className="w-1/3 flex flex-col gap-4">
    <InternshipDetails
      internships={eachStudent.pastInternshipsProjects.internships}
    />
    <ProjectDetails projects={eachStudent.pastInternshipsProjects.projects} />
  </div>
);

const InternshipDetails = ({ internships }) => (
  <div className="bg-white flex flex-col gap-4 text-sm full h-1/2">
    <div className="flex flex-col gap-1 p-2">
      <h1>Internships: </h1>
      <ul className="font-medium ml-2 list-inside flex-wrap flex list-decimal gap-2">
        {internships.slice(0, 8).map((internship) => (
          <li key={internship.company + Math.random()}>{internship.company}</li>
        ))}
      </ul>
    </div>
  </div>
);

const ProjectDetails = ({ projects }) => (
  <div className="justify-between bg-white flex flex-col gap-4 text-sm full h-1/2">
    <div className="flex flex-col gap-1 p-2">
      <h1>Projects: </h1>
      <ul className="font-medium ml-2 list-inside flex-wrap flex list-decimal gap-2">
        {projects.slice(0, 8).map((project) => (
          <li key={project.title + Math.random()}>{project.title}</li>
        ))}
      </ul>
    </div>
  </div>
);

const DetailRow = ({ label, value }) => (
  <div className="flex gap-6 justify-between">
    <h1>{label}</h1>
    <span className="font-medium">{value}</span>
  </div>
);

const SelectRow = ({ label, options }) => (
  <div className="bg-white p-2 flex items-center text-sm justify-between rounded">
    <label>{label}</label>
    <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm w-1/2 rounded focus:ring-blue-500 focus:border-blue-500 block p-1">
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default StudentsToCollege;
