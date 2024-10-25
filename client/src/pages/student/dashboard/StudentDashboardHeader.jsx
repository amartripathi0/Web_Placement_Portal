import { useDispatch } from "react-redux";
import { signout, RESET } from "../../../redux/features/student/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RESET_GLOBAL } from "../../../redux/features/common/globalSlice";
import NavbarDashboard from "../../../components/header/NavbarDashboard";

const StudentDashboardHeader = ({
  sidemenuExpanded,
  userName,
  notficationCount,
  notficationFrom,
  notficationTitle,
  notificationBody,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleStudentSignout() {
    dispatch(signout());
    dispatch(RESET());
    dispatch(RESET_GLOBAL());

    toast.success("Signed Out successfully", {
      position: toast.POSITION.TOP_RIGHT,
    });
    navigate("/signin/");
  }

  return (
    <NavbarDashboard
      userName={userName}
      navbarButtonHandler={handleStudentSignout}
      notficationCount={notficationCount}
      notficationFrom={notficationFrom}
      notficationTitle={notficationTitle}
      notificationBody={notificationBody}
      sidemenuExpanded={sidemenuExpanded}
    />
  );
};

export default StudentDashboardHeader;
