import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidemenu, { SidebarItem } from "../../../components/sidemenu/Sidemenu";
import LoadingPage from "../../LoadingPage";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createContext } from "react";

import {
  getLoginStatus,
  RESET_GLOBAL,
} from "../../../redux/features/common/globalSlice";
import { CollegeDashHeader } from "./CollegeDashHeader";
import { getCollegeStaffData } from "../../../redux/features/college/utilServices/collegeUtilSlice";
import { collegeStaffSidebarItems } from "../../../constants";
import cn from "../../../utils/cn";

const CollegeDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sidemenuExpanded, setSidemenuExpanded] = useState(true);
  const [apiURL, setAPIURL] = useState("");

  const globalAuth = useSelector((state) => state.globalAuth);
  const { isLoggedIn, isLoading, isSuccess, collegeStaff, message } =
    useSelector((state) => state.collegeStaffUtil);

  useEffect(() => {
    if (globalAuth.isLoggedin && globalAuth.isSuccess) {
      dispatch(getCollegeStaffData());
    } else if (
      !globalAuth.isLoggedin &&
      globalAuth.isSuccess &&
      globalAuth.userType !== "college-staff"
    ) {
      toast.error("Unauthorized Access! Please SignIn", {
        position: toast.POSITION.TOP_RIGHT,
      });
      navigate("/signin");
      dispatch(RESET_GLOBAL);
    } else {
      dispatch(getLoginStatus());
    }
  }, [getLoginStatus.isLoggedin, globalAuth.isSuccess, globalAuth.userType]);

  function sidemenuState(val) {
    setSidemenuExpanded(!val);
  }

  return (
    <main>
      {collegeStaff?.role === "Suspended" ? (
        <div className="h-screen w-screen  text-6xl flex justify-center items-center bg-slate-100 absolute z-50 top-0 left-0">
          You are Suspended, Contact Admin{" "}
        </div>
      ) : (
        <>
          {isLoading && <LoadingPage />}
          <div className={`relative flex`}>
            <Sidemenu
              sidemenuState={sidemenuState}
              emailID={collegeStaff?.personalDetail.emailID}
              firstName={collegeStaff?.personalDetail.firstName}
              lastName={collegeStaff?.personalDetail.lastName}
              profileImgLink={collegeStaff?.personalDetail.profilePicture}
              sidebarItems={collegeStaffSidebarItems}
            />

            <section
              className={cn(
                `flex flex-col absolute overflow-x-hidden right-0 min-h-screen max-tablet:w-[92%] max-sm:w-[84%] `,
                sidemenuExpanded ? "w-[85%]" : "w-[95%]"
              )}
            >
              <apiContext.Provider value={{ apiURL, setAPIURL }}>
                <CollegeDashHeader
                  sidemenuExpanded={sidemenuExpanded}
                  userName={
                    collegeStaff?.personalDetail?.firstName +
                    " " +
                    collegeStaff?.personalDetail?.lastName
                  }
                  notficationCount={collegeStaff?.notifications.length}
                  notficationFrom={collegeStaff?.notifications.from}
                  notficationTitle={collegeStaff?.notifications.title}
                  notificationBody={collegeStaff?.notifications.body}
                />
                <Outlet />
              </apiContext.Provider>
            </section>
          </div>
        </>
      )}
    </main>
  );
};
export const apiContext = createContext();

export default CollegeDashboard;
