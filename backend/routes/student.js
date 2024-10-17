const express = require('express')
const router = express.Router()
const {
  handleStudentSignUP,
  handleStudentSignIN,
  handleStudentSignOUT,
  handleUploadResume,
  handleStudentProfileUpdate,
  handleGetUserData,
  handleUploadProfilePicture,
  handleGetJobs,
  handleJobApplyByStudent
} = require('../controllers/student')
const { uploadPdf, uploadImg } = require('../middlewares/fileUploadMiddlware')
const {
  isSignedIn,
  handleResetPassword
} = require('../middlewares/auth.middleware')
router
  .post('/signup', handleStudentSignUP)
  .post('/signin', handleStudentSignIN)
  .post('/signout', handleStudentSignOUT)
  .put(
    '/updateProfileDetail',
    isSignedIn('student'),
    handleStudentProfileUpdate
  )
  .get('/getUserData', isSignedIn('student'), handleGetUserData)
  .post(
    '/uploadResume',
    isSignedIn('student'),
    uploadPdf.single('resume'),
    handleUploadResume
  )
  .post(
    '/uploadProfilePicture',
    isSignedIn('student'),
    uploadImg.single('profilePicture'),
    handleUploadProfilePicture
  )
  .put('/resetPassword', isSignedIn('student'), handleResetPassword('student'))
  .get('/getJobs', isSignedIn('student'), handleGetJobs)
  .post('/jobApplyByStudent', isSignedIn('student'), handleJobApplyByStudent)
module.exports = router
