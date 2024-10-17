const express = require('express')
const {
  handleCollegeSignUP,
  handleCollegeSignIN,
  handleGetCollegeStaffData,
  handleCollegeSignOUT,
  handleCollegeStaffProfileUpdate,
  handleUploadProfilePicture,
  handleGetStudentDetails,
  handleUpdateStudentDetails
} = require('../controllers/college_staff')
const router = express.Router()
const {
  isSignedIn,
  handleResetPassword
} = require('../middlewares/auth.middleware')
const { uploadImg } = require('../middlewares/fileUploadMiddlware')

router
  .post('/signup', handleCollegeSignUP)
  .post('/signin', handleCollegeSignIN)
  .post('/signout', handleCollegeSignOUT)
  .get(
    '/getCollegeStaffData',
    isSignedIn('college-staff'),
    handleGetCollegeStaffData
  )
  .put(
    '/collegeStaffProfileUpdate',
    isSignedIn('college-staff'),
    handleCollegeStaffProfileUpdate
  )
  .post(
    '/uploadProfilePicture',
    isSignedIn('college-staff'),
    uploadImg.single('profilePicture'),
    handleUploadProfilePicture
  )
  .get(
    '/getStudentDetails/:id',
    isSignedIn('college-staff'),
    handleGetStudentDetails
  )
  .put(
    '/updateStudentDetails',
    isSignedIn('college-staff'),
    handleUpdateStudentDetails
  )
  .put(
    '/resetPassword',
    isSignedIn('college-staff'),
    handleResetPassword('college-staff')
  )

// .get('/students' , handleGetAllStudents)
module.exports = router
