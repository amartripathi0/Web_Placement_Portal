import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidemenu, { SidebarItem } from "../../../components/sidemenu/Sidemenu";
import { FaRegUser } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import { IoNewspaperOutline } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa";
import { GiDirectorChair } from "react-icons/gi";
import LoadingPage from "../../LoadingPage";
import { MdAutoGraph } from "react-icons/md";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createContext } from "react";

import {
  RESET_GLOBAL,
  SET_GLOBAL,
  getLoginStatus,
} from "../../../redux/features/common/globalSlice";
import { CollegeDashHeader } from "./CollegeDashHeader";
import {
  RESET_COLLEGE_UTIL,
  getCollegeStaffData,
} from "../../../redux/features/college/utilServices/collegeUtilSlice";
import { collegeStaffSidebarItems } from "../../../constants";

const CollegeDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const globalAuth = useSelector((state) => state.globalAuth);
  const { isLoggedIn, isLoading, isSuccess, collegeStaff, message } =
    useSelector((state) => state.collegeStaffUtil);
  useEffect(() => {
    if (
      isLoggedIn &&
      isSuccess &&
      globalAuth.isLoggedin &&
      globalAuth.userType === "college-staff" &&
      collegeStaff.role !== "suspended"
    ) {
      toast.success(
        `Welcome, ${
          collegeStaff.personalDetail.firstName +
          " " +
          collegeStaff.personalDetail.lastName
        }`,
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
    } else if (globalAuth.isLoggedin && globalAuth.isSuccess) {
      dispatch(getCollegeStaffData());
    } else if (
      !globalAuth.isLoggedin &&
      globalAuth.isSuccess &&
      globalAuth.userType !== "college-staff"
    ) {
      toast.info("Signed Out successfully", {
        position: toast.POSITION.TOP_RIGHT,
      });
      // dispatch(SET_GLOBAL("college-staff"));
      navigate("/signin");
    } else {
      dispatch(getLoginStatus());
    }
  }, [getLoginStatus.isLoggedin, globalAuth.isSuccess, globalAuth.userType]);

  // useEffect(() => {
  //   if (
  //     isLoggedIn &&
  //     isSuccess &&
  //     globalAuth.isLoggedin &&
  //     globalAuth.userType === "college-staff" &&
  //     collegeStaff.role !== "suspended"
  //   ) {
  //     toast.success(
  //       `Welcome ${
  //         collegeStaff.personalDetail.firstName +
  //         " " +
  //         collegeStaff.personalDetail.lastName
  //       }`,
  //       {
  //         position: toast.POSITION.TOP_RIGHT,
  //       }
  //     );
  //   }
  // }, [collegeStaff]);

  const [sidemenuExpanded, setSidemenuExpanded] = useState(true);

  function sidemenuState(val) {
    setSidemenuExpanded(!val);
    // console.log(sidemenuExpanded);
  }

  const [apiURL, setAPIURL] = useState("");
  // console.log("render");
  return (
    <div>
      {collegeStaff?.role && collegeStaff.role === "Suspended" ? (
        <div className="h-screen w-screen  text-6xl flex justify-center items-center bg-slate-100 absolute z-50 top-0 left-0">
          You are Suspended, Contact Admin{" "}
        </div>
      ) : (
        <div
          className={`relative flex w-screen h-screen  ${
            isLoading && " opacity-50 "
          }`}
        >
          {isLoading && <LoadingPage height="screen" width="screen" />}

          <Sidemenu
              sidemenuState={sidemenuState}
              emailID={collegeStaff?.personalDetail.emailID}
              firstName={collegeStaff?.personalDetail.firstName}
              lastName={collegeStaff?.personalDetail.lastName}
              profileImgLink={collegeStaff?.personalDetail.profilePicture}
            >
              {collegeStaffSidebarItems.map(item => 
                 (
                  <SidebarItem key={item.label} text={item.label} icon={item.icon} active  />
                ))}
            </Sidemenu>

          <div
             className={`flex flex-col  absolute  overflow-x-hidden right-0 top-0 min-h-screen 
             max-tablet:w-[92%] max-sm:w-[84%] 
            ${sidemenuExpanded ? "w-[85%]" : "w-[95%] "} `}
          >
            <apiContext.Provider value={{ apiURL, setAPIURL }}>
              <CollegeDashHeader  sidemenuExpanded = {sidemenuExpanded}/>
              <Outlet />
            </apiContext.Provider>
          </div>
        </div>
      )}
    </div>
  );
};
export const apiContext = createContext();

export default CollegeDashboard;
