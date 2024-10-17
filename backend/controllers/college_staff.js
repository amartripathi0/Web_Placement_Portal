const mongoose = require('mongoose')
const CollegeStaff = require('../models/college_staff')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const { generateToken } = require('../utils/index')
const Student = require('../models/student')
const uploadToCloudinaryModule = require('../utils/index')
const Company = require('../models/Company')

const handleCollegeSignUP = asyncHandler(async (req, res, next) => {
  try {
    //get credentials from body
    // First Name , Last Name , Email , phone password confirm pass
    const { emailID, firstName, lastName, phone, password, cpass, staffID } =
      req.body
    // console.log(req.body);

    if (
      !emailID ||
      !password ||
      !firstName ||
      !lastName ||
      !phone ||
      !cpass ||
      !staffID
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
    if (phone.length !== 10) {
      res.status(401)
      throw new Error('Please enter a valid phone number..')
    }

    // check for existing college staff
    const existingCollegeStaff = await CollegeStaff.findOne({
      $or: [
        { 'personalDetail.emailID': emailID },
        { 'personalDetail.phone': phone },
        { 'personalDetail.staffID': staffID }
      ]
    })

    if (existingCollegeStaff) {
      res.status(409)
      throw new Error('College Staff Already Exists!')
    } else {
      let hashedPass = await bcrypt.hash(password, 10)
      // const updatedCollege = { ...data , personalDetail : { password : hashedPass , ...personalDetail} }

      // storing all docuuments of students and companies
      const students = await Student.find()
      const companies = await Company.find()
      // console.log(students);

      const collegeStaffAccount = await CollegeStaff.create({
        personalDetail: {
          emailID,
          firstName,
          lastName,
          phone,
          password: hashedPass,
          staffID
        },
        studentDetails: students,
        companyDetails: companies
      })

      // console.log(collegeStaffAccount);
      if (collegeStaffAccount) {
        const usrTyp = 'college-staff'
        const token = generateToken(collegeStaffAccount._id.toString(), usrTyp)

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

const handleCollegeSignIN = asyncHandler(async (req, res) => {
  try {
    const { emailID, password } = req.body
    if (!emailID || !password) {
      res.status(401)
      throw new Error('Please fill up all the required fileds')
    }

    const collegeStaff = await CollegeStaff.findOne({
      'personalDetail.emailID': emailID
    })

    if (collegeStaff) {
      const isValdid = await bcrypt.compare(
        password,
        collegeStaff.personalDetail.password
      )

      if (isValdid) {
        const usrTyp = 'college-staff'
        const token = generateToken(collegeStaff._id.toString(), usrTyp)
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
      res.status(403).json({ message: "College Staff doesn't exists." })
    }
  } catch (error) {
    console.log(error)
    res.status(500)
    throw new Error('Internal Server Error')
  }
})

const handleCollegeSignOUT = asyncHandler(async (req, res) => {
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

const handleGetCollegeStaffData = asyncHandler(async (req, res) => {
  try {
    // console.log(req.user);
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

const handleCollegeStaffProfileUpdate = asyncHandler(async (req, res) => {
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
      const user = await CollegeStaff.findById(req.user.id)
      // console.log("" ,{...personalDetail ,password : user.personalDetail.password , ...dataVal} );
      let updatedStaff
      if (dataType === 'personalDetail') {
        updatedStaff = await CollegeStaff.updateOne(
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
      if (updatedStaff.modifiedCount >= 1) {
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
          folder: 'Placement_Web_Portal/college/profile_photo',
          resource_type: 'image',
          public_id: 'profilePic'
        }
      )
      if (upload) {
        const personalDetail = req.user.personalDetail
        const user = await CollegeStaff.findById(req.user.id)
        const updated = await CollegeStaff.updateOne(
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

const handleUpdateStudentDetails = asyncHandler(async (req, res, next) => {
  try {
    const data = req.body

    if (data) {
      const student = await Student.findById(data.id)

      if (student) {
        const studentPass = student.personalDetail.password

        const updateStudent = await Student.updateOne(
          { _id: data.id },
          {
            $set: {
              personalDetail: { ...data.personalDetail, password: studentPass },
              ...data
            }
          }
        )

        if (updateStudent.modifiedCount >= 1) {
          res.status(203).json({ message: 'Data Updated Successfully' })
        } else {
          res.status(422)
          throw new Error('Invalid or Unsufficient data')
        }
      } else {
        res.status(422)
        throw new Error('Invalid or Unsufficient data')
      }
    } else {
      res.status(422)
      throw new Error('Invalid or Unsufficient data')
    }
  } catch (error) {
    next(error)
  }
})

module.exports = {
  handleCollegeSignUP,
  handleCollegeSignIN,
  handleCollegeSignOUT,
  handleGetCollegeStaffData,
  handleCollegeStaffProfileUpdate,
  handleUploadProfilePicture,
  handleGetStudentDetails,
  handleUpdateStudentDetails
}
