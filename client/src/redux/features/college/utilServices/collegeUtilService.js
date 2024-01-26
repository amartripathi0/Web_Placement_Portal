import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/college-staff/`;

const getCollegeStaffData = async () => {
  const response = await axios.get(API_URL + "getCollegeStaffData");
  return response.data;
};

const collegeStaffProfileUpdate = async (data) => {
  const response = await axios.put(API_URL + "collegeStaffProfileUpdate", data);
  return response.data;
};

const uploadProfilePicture = async (data) => {
  // console.log(data);
  const response = await axios.post(API_URL + "uploadProfilePicture", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

const getStudentDetails = async (studentID) => {
  // console.log("studentID: " , studentID );
  // console.log(API_URL + `getStudentDetails/${studentID}`);
  const response = await axios.get(API_URL + `getStudentDetails/${studentID}` );
  return response.data;
};
const updateStudentDetails = async (studentData) => {
  const response = await axios.put(API_URL + "updateStudentDetails"  , studentData);
  return response.data;
};


const collegeService = {
  getCollegeStaffData,
  collegeStaffProfileUpdate,
  uploadProfilePicture,
  getStudentDetails,
  updateStudentDetails
};

export default collegeService;
