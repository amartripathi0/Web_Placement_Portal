import { useState, useEffect } from "react";
import StudentDashboardHeader from "./StudentDashboardHeader";
import { Outlet, useNavigate } from "react-router-dom";
import Sidemenu, { SidebarItem } from "../../../components/sidemenu/Sidemenu";
import LoadingPage from "../../LoadingPage";
import { useDispatch, useSelector } from "react-redux";
import {
  RESET_GLOBAL,
  SET_GLOBAL,
  getLoginStatus,
} from "../../../redux/features/common/globalSlice";
import {
  RESET,
  getUserData,
} from "../../../redux/features/student/auth/authSlice";

import { toast } from "react-toastify";
import {  studentSidebarItems } from "../../../constants";

function StudentDashboard() {
  const { isLoading, isError, isSuccess, isLoggedIn, message, student } =
    useSelector((state) => state.studentAuth);
  const studentUtil = useSelector((state) => state.studentUtils);
  const { isLoggedin } = useSelector((state) => state.globalAuth);
  const globalAuth = useSelector((state) => state.globalAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // console.log("check if loggedin");
    dispatch(getLoginStatus());

    // return () => dispatch(RESET_GLOBAL());
    // dispatch(RESET_GLOBAL())
  }, []);

  // useEffect(() => {
  //   //  console.log("loggedin " , isLoggedin ,"load" , globalAuth.isLoading , "success" , globalAuth.isSuccess);
  //   if (isLoggedin && globalAuth.isSuccess) {
  //     dispatch(getUserData());
  //   } else if (
  //     !isLoggedIn &&
  //     globalAuth.isSuccess &&
  //     globalAuth.userType !== "student"
  //   ) {
  //     toast.info("Signed Out successfully", {
  //       position: toast.POSITION.TOP_RIGHT,
  //     });
  //     navigate("/signin");
  //   }
  // }, [isLoggedin, globalAuth.isSuccess, globalAuth.userType]);

  useEffect(() => {
    if (isLoggedIn && isSuccess && isLoggedin && student.role !== "Suspended") {
      toast.success(
        `Welcome ${
          student.personalDetail.firstName +
          " " +
          student.personalDetail.lastName
        }`,
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
      // console.log("welcome");
    }
  }, [isLoggedIn]);

  const [sidemenuExpanded, setSidemenuExpanded] = useState(true);
  function sidemenuState(val) {
    setSidemenuExpanded(!val);
  }
  return (
    <div>
      {student?.role && student.role === "Suspended" ? (
        <div className="h-screen w-screen  text-6xl flex justify-center items-center bg-slate-100 absolute z-50 top-0 left-0">
          You are Suspended, Contact Admin{" "}
        </div>
      ) : (
        <div
          className={`relative flex w-screen h-screen  ${
            isLoading && " blur-sm -z-10 "
          }`}
        >
          {isLoading && <LoadingPage height="screen" width="screen" />}

            <Sidemenu
              sidemenuState={sidemenuState}
              emailID={student?.personalDetail.emailID}
              firstName={student?.personalDetail.firstName}
              lastName={student?.personalDetail.lastName}
              profileImgLink={student?.personalDetail.profilePicture}
            >
              {studentSidebarItems.map(item => 
                 (
                  <SidebarItem key={item.label} text={item.label} icon={item.icon} active  />
                ))}
            </Sidemenu>

           {/* sidemenuExpanded ? "w-[85%]" : "w-[97%]" */}
          <div
            className={`flex flex-col  absolute  overflow-x-hidden right-0 top-0 min-h-screen 
             max-tablet:w-[92%] max-sm:w-[84%] 
            ${sidemenuExpanded ? "w-[85%]" : "w-[95%] "} `}
          >
            <StudentDashboardHeader sidemenuExpanded={sidemenuExpanded}/>
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentDashboard;
