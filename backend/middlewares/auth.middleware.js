const Student = require('../models/student')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const CollegeStaff = require('../models/college_staff')
const Company = require('../models/Company')
const bcrypt = require('bcrypt')

const isSignedIn = (userType) =>
  asyncHandler(async (req, res, next) => {
    try {
      const token = req.cookies.token
      if (!token) {
        res.status(401)
        throw new Error('Unauthorized User,Please Login')
      } else {
        let documentObjOfUser

        if (userType === 'student') {
          documentObjOfUser = jwt.verify(
            token,
            process.env.JWT_SECRET_KEY_STUDENT
          )
        } else if (userType === 'college-staff') {
          documentObjOfUser = jwt.verify(
            token,
            process.env.JWT_SECRET_KEY_COLLEGE
          )
        } else if (userType === 'company') {
          documentObjOfUser = jwt.verify(
            token,
            process.env.JWT_SECRET_KEY_COMPANY
          )
        }

        // console.log(documentObjOfUser);
        if (!documentObjOfUser) {
          res.status(401)
          throw new Error('Unauthorized User,Please Login')
        } else {
          const userId = documentObjOfUser.id
          let user
          if (userType === 'student') {
            user = await Student.findById(userId).select(
              '-personalDetail.password'
            )
          } else if (userType === 'college-staff') {
            user = await CollegeStaff.findById(userId)
              .select('-personalDetail.password')
              .populate({
                path: 'studentDetails',
                select: '-personalDetail.password'
              })
              .populate({
                path: 'companyDetails',
                select: '-personalDetail.password'
              })
          } else if (userType === 'company') {
            user = await Company.findById(userId)
              .select('-personalDetail.password')
              .populate({
                path: 'studentDetails',
                select: '-personalDetail.password'
              })
          }
          if (!user) {
            res.status(401)
            throw new Error('Unauthorized User,Please Login')
          }
          if (user.role === 'suspended') {
            res.status(400)
            throw new Error('User suspended!! ')
          }

          // console.log(user);
          req.user = user
          next()
        }
      }
    } catch (error) {
      res.status(401)
      throw new Error('Unauthorized User,Please Login')
    }
  })

// General purpose

const handleResetPassword = (userType) =>
  asyncHandler(async (req, res, next) => {
    try {
      const { currentPassword, newPassword, confirmNewPassword } = req.body

      if (currentPassword.length < 6) {
        res.status(404)
        throw new Error('Invalid Credentials')
      } else if (newPassword.length < 6 || confirmNewPassword.length < 6) {
        // console.log();
        res.status(404)
        throw new Error(
          'Please enter a strong password of length greater than or equal to 6'
        )
      } else if (newPassword !== confirmNewPassword) {
        res.status(404)
        throw new Error('New Password and Confirm password do not match')
      }
      const userId = req.user._id
      if (userType === 'student') {
        const user = await Student.findById(userId)

        const isValdid = await bcrypt.compare(
          currentPassword,
          user.personalDetail.password
        )

        if (isValdid) {
          const hashedPass = await bcrypt.hash(newPassword, 10)
          const updatedUser = await Student.updateOne(
            { _id: user._id },
            {
              $set: {
                personalDetail: { ...user.personalDetail, password: hashedPass }
              }
            }
          )

          if (updatedUser.modifiedCount >= 1) {
            res.status(203).json({ message: 'Password Reset Successfully' })
          } else {
            res.status(404)
            throw new Error('Invalid Credentials')
          }
        } else {
          res.status(404)
          throw new Error('Invalid Credentials')
        }
      } else if (userType === 'college-staff') {
        const user = await CollegeStaff.findById(userId)

        const isValdid = await bcrypt.compare(
          currentPassword,
          user.personalDetail.password
        )

        if (isValdid) {
          const hashedPass = await bcrypt.hash(newPassword, 10)
          const updatedUser = await CollegeStaff.updateOne(
            { _id: user._id },
            {
              $set: {
                personalDetail: { ...user.personalDetail, password: hashedPass }
              }
            }
          )

          if (updatedUser.modifiedCount >= 1) {
            res.status(203).json({ message: 'Password Reset Successfully' })
          } else {
            res.status(404)
            throw new Error('Invalid Credentials')
          }
        } else {
          res.status(404)
          throw new Error('Invalid Credentials')
        }
      } else if (userType === 'company') {
        const user = await Company.findById(userId)

        const isValdid = await bcrypt.compare(
          currentPassword,
          user.personalDetail.password
        )

        if (isValdid) {
          const hashedPass = await bcrypt.hash(newPassword, 10)
          const updatedUser = await Company.updateOne(
            { _id: user._id },
            {
              $set: {
                personalDetail: { ...user.personalDetail, password: hashedPass }
              }
            }
          )

          if (updatedUser.modifiedCount >= 1) {
            res.status(203).json({ message: 'Password Reset Successfully' })
          } else {
            res.status(404)
            throw new Error('Invalid Credentials')
          }
        } else {
          res.status(404)
          throw new Error('Invalid Credentials')
        }
      }
    } catch (error) {
      next(error)
    }
  })

module.exports = {
  isSignedIn,
  handleResetPassword
}
