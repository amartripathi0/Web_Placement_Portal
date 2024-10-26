import { useEffect } from "react";
import { useSelector } from "react-redux";
import { updateProfileDetail } from "../../../../redux/features/student/auth/authSlice";
import { uploadProfilePicture } from "../../../../redux/features/student/utilsServices/utilSlice";
import CommonProfilePage from "../../../../components/CommonProfilePage";
import { useNavigate } from "react-router-dom";

const StudentProfile = () => {
  const { isLoading, isSuccess, isLoggedIn, student } = useSelector(
    (state) => state.studentAuth
  );
  const globalAuth = useSelector((state) => state.globalAuth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!globalAuth.isLoggedin && !globalAuth.isLoading) {
      navigate("/signin");
    }
  }, [globalAuth.isLoggedin]);

  return (
    <CommonProfilePage
      isLoading={isLoading}
      isLoggedIn={isLoggedIn}
      isSuccess={isSuccess}
      userAccountStatus={student?.role}
      userProfilePicture={student?.personalDetail.profilePicture}
      uploadProfilePicture={uploadProfilePicture}
      updateProfileDetail={updateProfileDetail}
      firstName={student?.personalDetail.firstName}
      lastName={student?.personalDetail.lastName}
      fathersName={student?.personalDetail.fathersName}
      mothersName={student?.personalDetail.mothersName}
      emailID={student?.personalDetail.emailID}
      phone={student?.personalDetail.phone}
      userType={"student"}
    />
  );
};

export default StudentProfile;
