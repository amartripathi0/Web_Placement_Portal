import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

// import Home from './pages/homepages/Home'
import About from "./pages/homepages/About";
import Page from "./pages/homepages/Page";
import Contact from "./pages/homepages/Contact";
import Support from "./pages/homepages/Support";

import StudentDashboard from "./pages/student/dashboard/StudentDashboard";
import StudentProfile from "./pages/student/dashboard/pageContents/StudentProfile";
import AcademicDetail from "./pages/student/dashboard/pageContents/AcademicDetail";
import Resume from "./pages/student/dashboard/pageContents/Resume";
import Interview from "./pages/student/dashboard/pageContents/Interview";
import ChangePassword from "./pages/student/dashboard/pageContents/ResetPassword";
import HomePage from "./pages/homepages/HomePage";
import Body from "./pages/homepages/Body";
import MainLogin from "./pages/MainLogin";
import MainSignUp from "./pages/MainSignUp";
import SignUpStudent from "./pages/student/auth/SignUpStudent";
import LoginCollege from "./pages/college/auth/LoginCollege";
import LoginCompany from "./pages/company/auth/LoginCompany";
import LoginStudent from "./pages/student/auth/LoginStudent";
import SignupCollege from "./pages/college/auth/SignupCollege";
import SignupCompany from "./pages/company/auth/SignupCompany";
import PreviousInternships from "./pages/student/dashboard/pageContents/PreviousInternships";
import Project from "./pages/student/dashboard/pageContents/Project";
import ApplicationStatus from "./pages/student/dashboard/pageContents/ApplicationStatus";
import ResetPassword from "./pages/student/dashboard/pageContents/ResetPassword";
import CollegeDashboard from "./pages/college/dashboard/CollegeDashboard";
import ProfileCollege from "./pages/college/dashboard/pageContents/ProfileCollege";
import StudentDetailToClg from "./pages/college/dashboard/pageContents/StudentDetailToClg";
import StudentsToCollege from "./pages/college/dashboard/pageContents/StudentsToCollege";
import CompaniesToCollege from "./pages/college/dashboard/pageContents/CompaniesToCollege";
import CompanyToCollege from "./pages/college/dashboard/pageContents/CompanyToCollege";
import ResetPasswordClg from "./pages/college/dashboard/pageContents/ResetPasswordClg";

import CompanyDashboard from './pages/company/dashboard/CompanyDashboard'
import ProfileCompany from './pages/company/dashboard/pageContents/ProfileCompany'
import  PostJobs from './pages/company/dashboard/pageContents/JobPosts'
import ApplicantsDetails from './pages/company/dashboard/pageContents/ApplicantsDetails'
import JobApplicants from './pages/company/dashboard/pageContents/JobApplicants'
import ResetPasswordCompany from './pages/company/dashboard/pageContents/ResetPasswordCompany'
import StudentsToCompamy from './pages/company/dashboard/pageContents/StudentsToCompany'
import StudentDetailToCompany from './pages/company/dashboard/pageContents/StudentDetailToCompany'
import JobPosts from "./pages/company/dashboard/pageContents/JobPosts";
import JobVacancies from "./pages/student/dashboard/pageContents/JobVacancies";



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<HomePage />}>
        <Route path="/" element={<Body />} />
        <Route path="/about" element={<About />} />
        <Route path="/page" element={<Page />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/support" element={<Support />} />
      </Route>

      <Route path="/signin" element={<MainLogin />} />
      <Route path="/signup" element={<MainSignUp />} />
      <Route path="/signup/student" element={<SignUpStudent />} />
      <Route path="/signup/college-staff" element={<SignupCollege />} />
      <Route path="/signup/company" element={<SignupCompany />} />

      <Route path="/signin/student" element={<LoginStudent />} />
      <Route path="/signin/college-staff" element={<LoginCollege />} />
      <Route path="/signin/company" element={<LoginCompany />} />

      <Route path="/student" element={<StudentDashboard />}>
        <Route path="/student/profile" element={<StudentProfile />} />
        <Route path="/student/academicDetails" element={<AcademicDetail />} />
        <Route path="/student/resume" element={<Resume />} />
        <Route path="/student/previousInternships" element={<PreviousInternships />}/>
        <Route path="/student/projects" element={<Project />} />
        <Route path="/student/jobVacancies" element={<JobVacancies />} />
        <Route path="/student/applicationStatus" element={<ApplicationStatus />}/>
        <Route path="/student/interview" element={<Interview />} />
        <Route path="/student/resetPassword" element={<ResetPassword />} />
      </Route>

      <Route path="/college-staff" element={<CollegeDashboard />}>
        <Route path="/college-staff/profile" element={<ProfileCollege />} />
        <Route path="/college-staff/students" element={<StudentsToCollege />} />
        <Route path="/college-staff/studentDetails/:id" element={<StudentDetailToClg />}/>
        <Route path="/college-staff/companies" element={<CompaniesToCollege />}/>
        <Route path="/college-staff/companyDetails" element={<CompanyToCollege />}/>
        <Route path="/college-staff/resetPassword" element={<ResetPasswordClg />}/>
      </Route>

       <Route path="/company" element={<CompanyDashboard />}>
        <Route path="/company/profile" element={<ProfileCompany/>} />
        <Route path="/company/students" element={<StudentsToCompamy />} />
        <Route path="/company/studentDetails/:id" element={<StudentDetailToCompany/>}/>
       <Route path="/company/jobposts" element={<JobPosts/>}/>
       <Route path="/company/applicants" element={<JobApplicants />}/>
       <Route path="/company/applicantDetails/:id" element={<ApplicantsDetails />}/>

       <Route path="/company/postJobs" element={<PostJobs />}/>
        <Route path="/company/resetPassword" element={<ResetPasswordCompany />}/>
      </Route>

    </Route>

  
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  <RouterProvider router={router} />
  </React.StrictMode>
);
