const express = require('express')
const router =  express.Router()
const {handleStudentSignUP , handleStudentSignIN, handleStudentSignOUT, handleUploadResume, handleStudentProfileUpdate , handleGetUserData, handleUploadProfilePicture} = require('../controllers/student');
const { uploadPdf, uploadImg } = require('../middlewares/fileUploadMiddlware');
const { isSignedIn} = require('../middlewares/auth.middleware')
router
.post("/signup" , handleStudentSignUP)
.post('/signin' , handleStudentSignIN)
.post('/signout', handleStudentSignOUT)
.put('/updateProfileDetail' , isSignedIn("student") , handleStudentProfileUpdate)
.get('/getUserData' , isSignedIn("student") , handleGetUserData)
.post('/uploadResume' ,isSignedIn("student") ,  uploadPdf.single("resume") , handleUploadResume)
.post('/uploadProfilePicture' , isSignedIn("student") ,  uploadImg.single("profilePicture") , handleUploadProfilePicture)
module.exports = router; 