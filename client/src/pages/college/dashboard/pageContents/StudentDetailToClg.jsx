import React, { useContext, useEffect, useState } from "react";
import InputWithEdit from "../../../../Components/inputField/InputWithEdit";
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
import InputField from "../../../../Components/inputField/InputField";
import { NavLink, useNavigate } from "react-router-dom";
import { getStudentDetails, updateStudentDetails } from "../../../../redux/features/college/utilServices/collegeUtilSlice";
import { apiContext } from "../CollegeDashboard";

const StudentDetailToClg = () => {
  const { isLoading, isError, isSuccess, isLoggedIn,  student } =
    useSelector((state) => state.collegeStaffUtil);
  const globalAuth = useSelector((state) => state.globalAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const form = useForm();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },

  } = form;



    const [studStatus , setStudStatus] = useState("Allowed")

  function handleUpdateStudentData(data){
    const studentData = {

      id : apiURL,
    personalDetail:{
      firstName: data?.firstName,
      lastName:data?.lastName,
      emailID:data?.emailID,
      fathersName:data?.fathersName,
      mothersName:data?.mothersName,
      phone:data?.phone,
      profilePicture : student?.personalDetail.profilePicture
    },
    educationalDetails:{
     
      rollNumber: data.rollNumber,
      collegeName:data.collegeName,
       cgpa:data.cgpa,
       yearOfPassing: data.yearOfPassing,
       degrees : student?.educationalDetails.degrees
    },

      resume: student?.resume,

      role:studStatus,

      placementStatus:{
      isPlaced:student?.isPlaced,
      companyName:data.companyName,
      packageOffered: data.packageOffered,
      status:data.status
    },

      applicationStatus: student?.applicationStatus,


      pastInternshipsProjects : student?.pastInternshipsProjects


  }
  console.log("sddddddddddd" , studentData);

      dispatch(updateStudentDetails(studentData))
  }
  const {apiURL} = useContext(apiContext)

  useEffect(() => {
    if(apiURL){     
      // console.log("apiURL" , apiURL);
      dispatch(getStudentDetails(apiURL))
    }
    else{
      navigate('/college-staff/students/')
      toast.info("Click on Details for more details.")
    }
  }, [apiURL]);


useEffect(() => {
  if(isSuccess && student){
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
    // setValue("duration", student?.pastInternshipsProjects.projects.duration);
    // setValue("description", student?.pastInternshipsProjects.projects.description);
    // setValue("link", student?.pastInternshipsProjects.projects.link);
    // setValue("title", student?.pastInternshipsProjects.projects.link);

  }

}, [student]);

console.log("student" , student);
 

return (
    <div
      className={` bg-pink-100 flex flex-col py-10 items-center ${
        (isLoading || globalAuth.isLoading) && " blur-sm"
      }`}
    >
      <form onSubmit = {handleSubmit(handleUpdateStudentData)} 
      className=" flex  flex-wrap bg-slate-100 w-[90%]  rounded-lg px-20 py-16 shadow-slate-300 shadow-md  items-center justify-evenly gap-10">

<div className="w-full flex  gap-10 ">

  <div className="flex w-full gap-10 ">


<div className="bg-white flex justify-between items-center gap-10  px-8 pt-7 pb-2 text-xl w-1/2">

{/* Photo - Resume*/}
<div className=" items-center flex flex-col ">

                  <img src={""} alt=""
                  className="border-4 rounded-md  h-48 w-48 mb-3"
                  />
      
                  <NavLink to = {student?.resume} target="_blank" className= " underline cursor:pointer text-blue-600" >Resume</NavLink>
</div>

         <div className="w-3/4 flex-col justify-between">

          {/* Email */}
                  <div className="flex gap-6  items-center justify-between">
            <h1>Email: </h1>

            <InputWithEdit type="text" customStyle="w-56 " 
            validationObj={{
              ...register("emailID"),
            }}
            />
          </div>

            {/* phone */}
          <div className="flex gap-6  items-center justify-between">
            <h1>Phone: </h1>
            <InputWithEdit type="number" customStyle="w-56 " 
            validationObj={{
              ...register("phone"),
            }}
            />
          </div>

            {/* Status */}
          <div className="flex  gap-3 w-full  justify-between items-center">

           
            <h1 >Status: </h1>
            <label
             className = {`font-medium -ml-8  ${ studStatus === "Allowed" ? "text-green-500" : "text-red-500"}`} > {studStatus} </label>
             
            <select 
            onChange={(e) =>  setStudStatus(e.target.value)}
            className="w-44 px-6 py-2 rounded-lg  font-medium"
>
                        
<option value="Allowed" defaultValue >Allowed</option>
<option value="Debarred" defaultValue >Debarred</option>

            </select>
             
          </div>
      </div>

       </div>

{/* personal detail */}
        <div className="bg-white flex flex-col text-xl p-4 gap-2 rounded-lg w-1/2 ">
          <h1 className="font-semibold text-2xl ">Personal Detail</h1>

          <div className="flex  items-center justify-between  gap-6 ">
            <h1>First Name:</h1>
            <InputWithEdit type="text" customStyle="w-72 text-right " 
               validationObj={{
              ...register("firstName"),
            }} />
          </div>
          <div className="flex  items-center justify-between  gap-6  ">
            <h1>Last Name:</h1>
            <InputWithEdit type="text" customStyle="w-72 " 
            validationObj={{
              ...register("lastName"),
            }}
            />
          </div>

          <div className="flex  items-center justify-between  gap-6 ">
            <h1>Father's Name:</h1>
            <InputWithEdit type="text" customStyle="w-72 "
            validationObj={{
              ...register("fathersName"),
            }}
            />
          </div>

          <div className="flex  items-center justify-between  gap-6 ">
            <h1>Mother Name:</h1>
            <InputWithEdit type="text" customStyle="w-72 " 
            validationObj={{
              ...register("mothersName"),
            }}
            />
          </div>

         
        </div>

        </div>

<div className="bg-white flex flex-col items-center justify-around text-xl  px-10  rounded-lg w-1/5 ">
          <h1 className="font-medium "
          >Click on the button to update :-
          <li>Personal details</li>
          <li>Educational details</li>
          <li>Placement details</li></h1>
            <button className="w-60 font-semibold text-white bg-pink-500 hover:bg-pink-600 p-3 px-6 rounded-lg flex items-center justify-center"
>Update Details
</button>
</div>

 </div>

<div className="w-full flex justify-between gap-10">
{/* educational detail */}
        <div className="bg-white flex flex-col text-xl p-4 gap-2 rounded-lg  w-1/2">
          <h1 className="font-semibold text-2xl ">Educational Detail</h1>

          <div className="flex  items-center justify-between  gap-6 ">
            <h1>College Name:</h1>
            <InputWithEdit type="text" customStyle="w-72 " 
               validationObj={{
              ...register("collegeName"),
            }} />
          </div>

  


          <div className="flex gap-6  items-center justify-between">
            <h1>Roll Number: </h1>
            <InputWithEdit type="number" customStyle="w-72 " 
            validationObj={{
              ...register("rollNumber"),
            }}
            />
          </div>
          <div className="flex gap-6  items-center justify-between">
            <h1>CGPA : </h1>
            <InputWithEdit type="number" customStyle="w-72 " 
            validationObj={{
              ...register("cgpa"),
            }}
            />
          </div>
          <div className="flex gap-6  items-center justify-between">
            <h1>Year Of Passing : </h1>
            <InputWithEdit type="number" customStyle="w-72 " 
            validationObj={{
              ...register("yearOfPassing"),
            }}
            />
          </div>
        </div>

        {/* placement status */}
        <div className="bg-white flex flex-col text-xl p-4 gap-2 rounded-lg  w-1/2">
          <h1 className="font-semibold text-2xl ">Placement Status</h1>

          <div className="flex  items-center justify-between  gap-6 ">
            <h1>Status:</h1>
            <InputWithEdit type="text" customStyle="w-72 " 
               validationObj={{
              ...register("isPlaced"),
            }} />
          </div>

  

          <div className="flex gap-6  items-center justify-between">
            <h1>Company Name </h1>
            <InputWithEdit type="text" customStyle="w-72 " 
            validationObj={{
              ...register("companyName"),
            }}
            />
          </div>
          <div className="flex gap-6  items-center justify-between">
            <h1>Package Offered LPA) : </h1>
            <InputWithEdit type="number" customStyle="w-72 " 
            validationObj={{
              ...register("packageOffered"),
            }}
            />
          </div>
          <div className="flex gap-6  items-center justify-between">
            <h1>Placement Status : </h1>
            <InputWithEdit type="text" customStyle="w-72 " 
            validationObj={{
              ...register("status"),
            }}
            />
          </div>
        </div>

</div>
{/* Internship Data */}

<div className="bg-white  w-full flex flex-col gap-5 p-5">
<h1 className="font-semibold text-2xl ">Internships</h1>

<div className="flex gap-5">


  {
    student?.pastInternshipsProjects?.internships.map(internData => (
      
      <div key={student?.pastInternshipsProjects?.internships.indexOf(internData) + internData.company} className="bg-purple-50 w-1/4  flex flex-col text-xl p-4 gap-2 rounded-lg ">

      <h1 className="font-semibold text-xl ml-1">{ student?.pastInternshipsProjects?.internships.indexOf(internData) + 1}</h1>
     
      {/* {
      setValue("internDuration", student?.pastInternshipsProjects.internships[student?.pastInternshipsProjects?.internships.indexOf(internData)].duration)
}

     { setValue("company", student?.pastInternshipsProjects.internships[student?.pastInternshipsProjects?.internships.indexOf(internData)].company)}
     { setValue("role", student?.pastInternshipsProjects.internships[student?.pastInternshipsProjects?.internships.indexOf(internData)].role)}
     { setValue("internDescription", student?.pastInternshipsProjects.internships[student?.pastInternshipsProjects?.internships.indexOf(internData)].description)} */}
     
      <div className="flex  items-center justify-between  gap-6 ">
        <h1>Company Name:</h1>
        <InputWithEdit type="text" customStyle="w-56 bg-purple-50" 
          value={student?.pastInternshipsProjects.internships[student?.pastInternshipsProjects?.internships.indexOf(internData)].company}
          name= "company"

         />
      </div>
      <div className="flex  items-center justify-between  gap-6 ">
        <h1>Role:</h1>
        <InputWithEdit type="text" customStyle="w-56 bg-purple-50" 
                 value={student?.pastInternshipsProjects.internships[student?.pastInternshipsProjects?.internships.indexOf(internData)].role}
                 name= "role"


        />
      </div>

      <div className="flex  items-center justify-between  gap-6 ">
        <h1>Duration:</h1>
        <InputWithEdit type="text" customStyle="w-56 bg-purple-50"
           value={student?.pastInternshipsProjects.internships[student?.pastInternshipsProjects?.internships.indexOf(internData)].duration}
           name= "duration"


        />
      </div>

      <div className="flex  items-center justify-between  gap-6 ">
        <h1>Description:</h1>
        <InputWithEdit type="text" customStyle="w-56 bg-purple-50" 
           value={student?.pastInternshipsProjects.internships[student?.pastInternshipsProjects?.internships.indexOf(internData)].description}
          name= "description"

        />
      </div>

    
    </div>
    ))
  }
</div>

      
        </div>
        
{/* Projects */}
<div className="bg-white  w-full flex flex-col gap-5 p-5">
          <h1 className="font-semibold text-2xl  ">Projects</h1>
          <div className="flex gap-5">

  {
    student?.pastInternshipsProjects?.projects.map(projectData => (
<div className="bg-blue-50  flex flex-col text-xl p-4 gap-2 rounded-lg w-1/4" 
key={projectData.title}>
<h1 className="font-semibold text-xl ml-1">{ student?.pastInternshipsProjects?.projects.indexOf(projectData) + 1}</h1>

          <div className="flex  items-center justify-between  gap-6 bg-blue-50 ">
            <h1>Project Title:</h1>
            <InputWithEdit type="text" customStyle="w-56  bg-blue-50 " 
          value={student?.pastInternshipsProjects.projects[student?.pastInternshipsProjects?.projects.indexOf(projectData)].title}
           
            />
          </div>
          <div className="flex  items-center justify-between  gap-6 ">
            <h1>Link:</h1>
            <InputWithEdit type="text" customStyle="w-56  bg-blue-50" 
             value={student?.pastInternshipsProjects.projects[student?.pastInternshipsProjects?.projects.indexOf(projectData)].link}
      
            />
          </div>

          <div className="flex  items-center justify-between  gap-6 ">
            <h1>Duration:</h1>
            <InputWithEdit type="text" customStyle="w-56 bg-blue-50" 
         value={student?.pastInternshipsProjects.projects[student?.pastInternshipsProjects?.projects.indexOf(projectData)].duration}
          
            />
          </div>

          <div className="flex  items-center justify-between  gap-6 ">
            <h1>Description:</h1>
            <InputWithEdit type="text" customStyle="w-56 bg-blue-50" 
         value={student?.pastInternshipsProjects.projects[student?.pastInternshipsProjects?.projects.indexOf(projectData)].description}

            />
          </div>

        
        </div>  
          ))
        }

    </div>
    </div>
      </form>
    </div> 
  );
};

export default StudentDetailToClg;
