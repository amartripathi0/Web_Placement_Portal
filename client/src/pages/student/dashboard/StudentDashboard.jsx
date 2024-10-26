import { useState, useEffect } from "react";
import StudentDashboardHeader from "./StudentDashboardHeader";
import { Outlet, useNavigate } from "react-router-dom";
import Sidemenu from "../../../components/sidemenu/Sidemenu";
import LoadingPage from "../../LoadingPage";
import { useDispatch, useSelector } from "react-redux";
import { getLoginStatus, RESET_GLOBAL } from "../../../redux/features/common/globalSlice";
import { getUserData } from "../../../redux/features/student/auth/authSlice";
import { toast } from "react-toastify";
import { studentSidebarItems } from "../../../constants";
import cn from "../../../utils/cn";

function StudentDashboard() {
  const { isLoading, isSuccess, isLoggedIn, student } = useSelector(
    (state) => state.studentAuth
  );
  const [sidemenuExpanded, setSidemenuExpanded] = useState(true);
  const globalAuth = useSelector((state) => state.globalAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (globalAuth.isLoggedin && globalAuth.isSuccess) {
      dispatch(getUserData());
    } else if (
      !globalAuth.isLoggedin &&
      globalAuth.isSuccess &&
      globalAuth.userType !== "student"
    ) {
      toast.error("Unauthorized Access! Please SignIn", {
        position: toast.POSITION.TOP_RIGHT,
      });
      navigate("/signin");
      dispatch(RESET_GLOBAL)
    } else {
      dispatch(getLoginStatus());
    }
  }, [getLoginStatus.isLoggedin, globalAuth.isSuccess, globalAuth.userType]);

  function sidemenuState(val) {
    setSidemenuExpanded(!val);
  }

  return (
    <main>
      {student?.role === "Suspended" ? (
        <div className="h-screen w-screen  text-6xl flex justify-center items-center bg-slate-100 absolute z-50 top-0 left-0">
          You are Suspended, Contact Admin{" "}
        </div>
      ) : (
        <>
          {isLoading && <LoadingPage />}
          <div className={`relative flex`}>
            <Sidemenu
              sidemenuState={sidemenuState}
              emailID={student?.personalDetail.emailID}
              firstName={student?.personalDetail.firstName}
              lastName={student?.personalDetail.lastName}
              profileImgLink={student?.personalDetail.profilePicture}
              sidebarItems={studentSidebarItems}
            />

            <section
              className={cn(
                `flex flex-col absolute overflow-x-hidden right-0 min-h-screen max-tablet:w-[92%] max-sm:w-[84%] `,
                sidemenuExpanded ? "w-[85%]" : "w-[95%]"
              )}
            >
              <StudentDashboardHeader
                sidemenuExpanded={sidemenuExpanded}
                userName={
                  student?.personalDetail?.firstName +
                  " " +
                  student?.personalDetail?.lastName
                }
                notficationCount={student?.notifications.length}
                notficationFrom={student?.notifications.from}
                notficationTitle={student?.notifications.title}
                notificationBody={student?.notifications.body}
              />
              <Outlet />
            </section>
          </div>
        </>
      )}
    </main>
  );
}

export default StudentDashboard;
