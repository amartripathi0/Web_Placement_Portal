const express=require('express')
const router = express.Router()

const { isSignedIn} = require('../middlewares/auth.middleware');
const { uploadImg } = require('../middlewares/fileUploadMiddlware');
const { handleCompanySignUP } = require('../controllers/company');

router
.post("/signup" , handleCompanySignUP)
// .post('/signin' , handleStudentSignIN)
// .post('/signout', handleStudentSignOUT)


module.exports = router 