import { FaClockRotateLeft, FaFileSignature, FaGithub, FaGlobe, FaLinkedin, FaRegClock, FaRegUser, FaTwitter, FaUsers } from "react-icons/fa6";
import logo from "../src/assets/logo.png";
import { LuGraduationCap } from "react-icons/lu";
import { IoNewspaperOutline } from "react-icons/io5";
import { GiDirectorChair, GiProgression } from "react-icons/gi";
import { MdAutoGraph, MdLockReset } from "react-icons/md";

export const constants = {
  logo,
};

export const navBarLink = [
  { label: "Home", link: "/" },
  { label: "About", link: "/about" },
  // { label: "Page", link: "/page" },
  { label: "Contact", link: "/contact" },
  { label: "Support", link: "/support" },
];

export const authCardDetails = {
  signup: [
    {
      imgSrc:
        "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/logo-design-template-35b0a3e2315d19a46c046165f315b000.jpg?ts=1592240511",
      btnLabel: "Student SignUp",
      redirectRoute: "student",
    },
    {
      imgSrc:
        "https://media.istockphoto.com/id/876177980/vector/university-vector.jpg?s=612x612&w=0&k=20&c=FqW7PHJFlpzTfK3ax3zPhxgTCgCnVQaPnnmTRPmdjjc=",
      btnLabel: "College Staff SignUp",
      redirectRoute: "college-staff",
    },
    {
      imgSrc:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/American_Broadcasting_Company_Logo.svg/767px-American_Broadcasting_Company_Logo.svg.png",
      btnLabel: "Company SignUp",
      redirectRoute: "company",
    },
  ],
  login: [
    {
      imgSrc:
        "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/logo-design-template-35b0a3e2315d19a46c046165f315b000.jpg?ts=1592240511",
      btnLabel: "Student Login",
      redirectRoute: "student",
      btnColour: "blue",
    },

    {
      imgSrc:
        "https://media.istockphoto.com/id/876177980/vector/university-vector.jpg?s=612x612&w=0&k=20&c=FqW7PHJFlpzTfK3ax3zPhxgTCgCnVQaPnnmTRPmdjjc=",
      btnLabel: "College Staff Login",
      redirectRoute: "college-staff",
      btnColour: "blue",
    },
    {
      imgSrc:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/American_Broadcasting_Company_Logo.svg/767px-American_Broadcasting_Company_Logo.svg.png",
      btnLabel: "Company Login",
      redirectRoute: "company",
      btnColour: "blue",
    },
  ],
};

export const signupFormComponents = {
  firstName : {
    placeholder : "Enter your first name" ,
    label : "First Name"
    
  }
}

export const studentSidebarItems = [
  {label : "Profile" , icon : <FaRegUser className="h-5 w-5 max-tablet:w-8 max-tablet:h-8  max-sm:h-6 max-sm:w-6  " />},
  {label : "Academic Details" , icon : <LuGraduationCap  className="h-6 w-6 -ml-1 max-tablet:w-8 max-tablet:h-8  max-sm:h-6 max-sm:w-6  "  />},
  {label : "Resume" , icon : <IoNewspaperOutline  className="h-5 w-5 max-tablet:w-8 max-tablet:h-8  max-sm:h-6 max-sm:w-6 " />},
  {label : "Previous Internships" , icon : <FaClockRotateLeft className="h-5 w-5 max-tablet:w-8 max-tablet:h-8  max-sm:h-6 max-sm:w-6 "  />},
  {label : "Projects" , icon : <FaFileSignature  className="h-5 w-5 max-tablet:w-8 max-tablet:h-8  max-sm:h-6 max-sm:w-6  " />},
  {label : "Job Vacancies" , icon : <MdAutoGraph  className="h-5 w-5 max-tablet:w-8 max-tablet:h-8  max-sm:h-6 max-sm:w-6 " />},
  {label : "Interview" , icon : <FaUsers  className="h-5 w-5 max-tablet:w-8 max-tablet:h-8  max-sm:h-6 max-sm:w-6  " />},
  {label : "Application Status" , icon : <GiProgression  className="h-5 w-5 max-tablet:w-8 max-tablet:h-8  max-sm:h-6 max-sm:w-6 " />},
  {label : "Reset Password" , icon : <MdLockReset  className="h-6 w-6 -ml-1 max-tablet:w-8 max-tablet:h-8  max-sm:h-6 max-sm:w-6 " />},
]
export const collegeStaffSidebarItems = [
  {label : "Profile" , icon : <FaRegUser className="h-5 w-5 max-tablet:w-8 max-tablet:h-8  max-sm:h-6 max-sm:w-6  " />},
  {label : "Students" , icon : <LuGraduationCap  className="h-6 w-6 -ml-1 max-tablet:w-8 max-tablet:h-8  max-sm:h-6 max-sm:w-6  "  />},
  {label : "Companies" , icon : <IoNewspaperOutline  className="h-5 w-5 max-tablet:w-8 max-tablet:h-8  max-sm:h-6 max-sm:w-6 " />},
  {label : "Reset Password" , icon : <MdLockReset  className="h-6 w-6 -ml-1 max-tablet:w-8 max-tablet:h-8  max-sm:h-6 max-sm:w-6 " />},
]
export const companySidebarItems = [
  {label : "Profile" , icon : <FaRegUser className="h-5 w-5 max-tablet:w-8 max-tablet:h-8  max-sm:h-6 max-sm:w-6  " />},
  {label : "Students" , icon : <LuGraduationCap  className="h-6 w-6 -ml-1 max-tablet:w-8 max-tablet:h-8  max-sm:h-6 max-sm:w-6  "  />},
  {label : "Job Posts" , icon : <IoNewspaperOutline  className="h-5 w-5 max-tablet:w-8 max-tablet:h-8  max-sm:h-6 max-sm:w-6 " />},
  {label : "Applicants" , icon : <IoNewspaperOutline  className="h-5 w-5 max-tablet:w-8 max-tablet:h-8  max-sm:h-6 max-sm:w-6 " />},
  {label : "Reset Password" , icon : <MdLockReset  className="h-6 w-6 -ml-1 max-tablet:w-8 max-tablet:h-8  max-sm:h-6 max-sm:w-6 " />},
]

export const userPlaceholderImage = 'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI='

export const socialHandles= [
  {
    name: "My Portfolio",
    icon: FaGlobe,
    link: "https://amartripathi.vercel.app/",
  },
  {
    name: "Github",
    icon: FaGithub,
    link: "https://github.com/amartripathi0",
  },
  {
    name: "Twitter",
    icon: FaTwitter,
    link: "https://twitter.com/amartripathi_",
  },
  {
    name: "Linkedin",
    icon: FaLinkedin,
    link: "https://github.com/amartripathi0",
  },
];
