const express = require('express')
const router = express.Router()

const {
  isSignedIn,
  handleResetPassword
} = require('../middlewares/auth.middleware')
const { uploadImg } = require('../middlewares/fileUploadMiddlware')
const {
  handleCompanySignUP,
  handleCompanySignIN,
  handleCompanySignOUT,
  handleGetCompanyData,
  handleCompanyProfileUpdate,
  handleUploadProfilePicture,
  handleGetStudentDetails
} = require('../controllers/company')

router
  .post('/signup', handleCompanySignUP)
  .post('/signin', handleCompanySignIN)
  .post('/signout', handleCompanySignOUT)
  .get('/getCompanyData', isSignedIn('company'), handleGetCompanyData)
  .put('/resetPassword', isSignedIn('company'), handleResetPassword('company'))
  .put(
    '/companyProfileUpdate',
    isSignedIn('company'),
    handleCompanyProfileUpdate
  )
  .post(
    '/uploadProfilePicture',
    isSignedIn('company'),
    uploadImg.single('profilePicture'),
    handleUploadProfilePicture
  )
  .get('/getStudentDetails/:id', isSignedIn('company'), handleGetStudentDetails)

module.exports = router
