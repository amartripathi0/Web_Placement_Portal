const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const { generateToken } = require('../utils/index')
const Student = require('../models/student')
const uploadToCloudinaryModule = require('../utils/index')
const Company = require('../models/Company')
const CollegeStaff = require('../models/college_staff')
const handleCompanySignUP = asyncHandler(async (req, res, next) => {
  try {
    //get credential from body
    // First Name , Last Name , Email , phnono password confirm pass
    const { personalDetail, company } = req.body
    const { emailID, firstName, lastName, phone, password, cpass, staffID } =
      personalDetail

    console.log(req.body)

    if (
      !emailID ||
      !password ||
      !firstName ||
      !lastName ||
      !phone ||
      !cpass ||
      !staffID ||
      !company
    ) {
      res.status(401)
      throw new Error('Please fill up all the required fileds')
    }
    if (password.length < 6 || cpass.length < 6) {
      res.status(401)
      throw new Error(
        'Password must be at least 6 characters long. Please choose a stronger password.'
      )
    }

    if (password !== cpass) {
      res.status(401)
      throw new Error(
        'Password and confirmation password do not match. Please ensure both passwords are the same.'
      )
    }

    const college = await CollegeStaff.find()
    const existingCompany = await Company.findOne({
      $or: [
        { 'personalDetail.emailID': emailID },
        { 'personalDetail.phone': phone },
        { 'personalDetail.staffID': staffID },
        { company: company }
      ]
    })

    if (existingCompany) {
      res.status(409)
      throw new Error('Company Already Exists!')
    } else if (college.length === 0) {
      throw new Error('Internal Server Error')
    } else {
      let hashedPass = await bcrypt.hash(password, 10)
      // const updatedCollege = { ...data , personalDetail : { password : hashedPass , ...personalDetail} }
      const pass = hashedPass

      const students = await Student.find()
      // console.log(students);
      let companyAccount
      if (students) {
        // console.log(students);

        companyAccount = await Company.create({
          personalDetail: {
            emailID,
            firstName,
            lastName,
            phone,
            password: pass,
            staffID
          },
          company: company,
          studentDetails: students
        })
      }

      if (companyAccount) {
        const companyID = new mongoose.Types.ObjectId(companyAccount.id)
        const settingCompanyIdInCollege = await CollegeStaff.updateMany({
          $push: { companyDetails: companyID }
        })

        const usrTyp = 'company'
        const token = generateToken(companyAccount._id.toString(), usrTyp)

        res.cookie('token', token, {
          path: '/',
          httpOnly: true,
          expires: new Date(Date.now() + 1000 * 86400), // 1 day
          sameSite: 'none',
          secure: true
        })
        res.cookie('userType', usrTyp, {
          path: '/',
          httpOnly: true,
          expires: new Date(Date.now() + 1000 * 86400), // 1 day
          sameSite: 'none',
          secure: true
        })
        res.status(201).json({ message: 'Account created Successfully' })
      } else {
        res.status(403)
        throw new Error('Invalid user data')
      }
    }
  } catch (error) {
    // console.log("error" , error);
    next(error)
  }
})

const handleCompanySignIN = asyncHandler(async (req, res, next) => {
  try {
    const { emailID, password } = req.body
    if (!emailID || !password) {
      res.status(401)
      throw new Error('Please fill up all the required fileds')
    }
    console.log(emailID, password)
    const existingCompany = await Company.findOne({
      'personalDetail.emailID': emailID
    })

    console.log(existingCompany)
    if (existingCompany) {
      const isValdid = await bcrypt.compare(
        password,
        existingCompany.personalDetail.password
      )

      if (isValdid) {
        const usrTyp = 'company'
        const token = generateToken(existingCompany._id.toString(), usrTyp)
        res.cookie('token', token, {
          path: '/',
          httpOnly: true,
          expires: new Date(Date.now() + 1000 * 86400), // 1 day
          sameSite: 'none',
          secure: true
        })

        res.cookie('userType', usrTyp, {
          path: '/',
          httpOnly: true,
          expires: new Date(Date.now() + 1000 * 86400), // 1 day
          sameSite: 'none',
          secure: true
        })
        res.status(201).json({ message: 'Login Successfull' })
      } else {
        res.status(401).json({ message: 'Invalid EmailID or Password.' })
      }
    } else {
      res.status(403).json({ message: "Company doesn't exists." })
    }
  } catch (error) {
    console.log(error)
    res.status(500)
    throw new Error('Internal Server Error')
  }
})

const handleCompanySignOUT = asyncHandler(async (req, res) => {
  try {
    res.cookie('token', '', {
      path: '/',
      httpOnly: true,
      expires: new Date(0), // 1 day
      sameSite: 'none',
      secure: true
    })
    res.cookie('userType', '', {
      path: '/',
      httpOnly: true,
      expires: new Date(0), // 1 day
      sameSite: 'none',
      secure: true
    })
    res.status(201).json({ message: 'Signed out successfully' })
  } catch (error) {
    res.status(500)
    throw new Error('Internal Server Error')
  }
})

const handleGetCompanyData = asyncHandler(async (req, res) => {
  try {
    console.log('company', req.user)
    if (req.user) {
      res.status(200).json({ message: req.user })
    } else {
      res.status(403)
      throw new Error('No such user')
    }
  } catch (error) {
    throw new Error('Internal Server Error')
  }
})

const handleCompanyProfileUpdate = asyncHandler(async (req, res) => {
  try {
    // console.log("user" , req.user);
    const data = req.body
    // console.log(data);
    const dataType = data.typ
    const dataVal = data.value
    // console.log(data);
    const personalDetail = req.user.personalDetail
    if (!data) {
      res.status(401)
      throw new Error('Unsufficent data')
    } else {
      // const user = await Student.updateOne({_id : req.user.id} , {$set : {"personalDetail" : data}})
      const user = await Company.findById(req.user.id)
      // console.log("" ,{...personalDetail ,password : user.personalDetail.password , ...dataVal} );
      let updatedData
      if (dataType === 'personalDetail') {
        updatedData = await Company.updateOne(
          { _id: req.user.id },
          {
            $set: {
              personalDetail: {
                ...personalDetail,
                password: user.personalDetail.password,
                ...dataVal
              }
            }
          }
        )
      } else if (dataType === 'jobs') {
        updatedData = await Company.findByIdAndUpdate(
          { _id: req.user.id },
          { $push: { jobs: dataVal } },
          { new: true }
        )
        // if(updatedData) {
        //   const lastestJobId = updatedData.jobs[updatedData.jobs.length -1 ].id
        //   console.log(lastestJobId);
        //       // console.log(jobId);
        //       // await Student.updateOne({_id : "656f17934cf8742fea8d6595" }, {$push : {"applicationStatus" : {appliedJobID : jobId}}} )

        // }
      }
      // else if(dataType === "educationalDetails"){
      //    await Student.updateOne({_id : req.user.id} , {$set : {"educationalDetails" : dataVal}})
      // }
      // // const user = await Student.findOneAndUpdate({_id : req.user.id} , {$set : {"personalDetail" : {...personalDetail , ...data}}}
      // // , {returnDocument : "after"})
      // else if(dataType === "internships"){
      //   await Student.updateOne({_id : req.user.id} , {$push : {"pastInternshipsProjects.internships"  : dataVal}})

      // }
      // else if(dataType === "projects"){
      //   await Student.updateOne({_id : req.user.id} , {$push : {"pastInternshipsProjects.projects"  : dataVal}})

      // }
      if (updatedData) {
        res.json({ message: 'Details Updated Successfully' })
      } else {
        res.status(401)
        throw new Error('Details Update Failed')
      }
    }
  } catch (error) {
    console.log(error.message)

    res.status(500)
    throw new Error('Internal Server Error')
  }
})

const handleUploadProfilePicture = asyncHandler(async (req, res) => {
  try {
    if (!req.file) {
      res.status(401)
      throw new Error('Please upload a valid image.')
    } else if (req.file.size > 10000000) {
      res.status(401)
      throw new Error('Please upload file of size less than 1 MB')
    } else {
      const upload = await uploadToCloudinaryModule.cloudinary.uploader.upload(
        req.file.path,
        {
          folder: 'Placement_Web_Portal/company/profile_photo',
          resource_type: 'image',
          public_id: 'profilePic'
        }
      )
      if (upload) {
        const personalDetail = req.user.personalDetail
        const user = await Company.findById(req.user.id)
        const updated = await Company.updateOne(
          { _id: req.user.id },
          {
            $set: {
              personalDetail: {
                ...personalDetail,
                password: user.personalDetail.password,
                profilePicture: upload.secure_url
              }
            }
          }
        )

        if (updated.modifiedCount === 1) {
          fs.unlink(req.file.path, (err) => {
            if (err) {
              console.log(err)
            }
            // else{
            //   console.log("File deleted successfully");
            // }
          })

          res
            .status(201)
            .json({ message: 'Profile picture updated successfully' })
        } else {
          res.status(500)
          throw new Error('Internal Server Error')
        }
      } else {
        res.status(500)
        throw new Error('Internal Server Error')
      }
    }
  } catch (error) {
    console.log(error)
    res.status(500)
    throw new Error('Internal Server Error')
  }
})

const handleGetStudentDetails = asyncHandler(async (req, res, next) => {
  try {
    console.log('id :', req.params.id)
    const studentDetails = await Student.findById(req.params.id).select(
      '-personalDetail.password'
    )
    if (studentDetails) {
      res.status(200).json({ message: studentDetails })
    } else {
      res.status(401)
      throw new Error("Student Doesn't Exists")
    }
  } catch (error) {
    next(error)
  }
})

module.exports = {
  handleCompanySignUP,
  handleCompanySignIN,
  handleCompanySignOUT,
  handleGetCompanyData,
  handleCompanyProfileUpdate,
  handleUploadProfilePicture,
  handleGetStudentDetails
}
