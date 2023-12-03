const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../utils/index");
const Student = require("../models/student");
const uploadToCloudinaryModule = require("../utils/index"); 
const Company = require("../models/Company");
const CollegeStaff = require("../models/college_staff");
const handleCompanySignUP = asyncHandler(async (req, res , next ) => {

    try {
      //get credential from body
      // First Name , Last Name , Email , phnono password confirm pass
      const { emailID, firstName, lastName, phone, password, cpass, staffID } =
        req.body;
        // console.log(req.body); 
  
      if (!emailID || !password || !firstName || !lastName || !phone || !cpass || !staffID) {
        res.status(401);
        throw new Error("Please fill up all the required fileds");
      }
      if (password.length < 6 || cpass.length < 6) {
        res.status(401); 
        throw new Error( 
          "Password must be at least 6 characters long. Please choose a stronger password."
        );
      }
  
      if (password !== cpass) {
        res.status(401);
        throw new Error(
          "Password and confirmation password do not match. Please ensure both passwords are the same."
        );
      }

      const college = await CollegeStaff.find() 
      const existingCompany = await Company.findOne({
        $or: [
          { "personalDetail.emailID": emailID },
          { "personalDetail.phone": phone },
          { "personalDetail.staffID": staffID },
        ],
      }); 

      if (existingCompany) {
        res.status(409);
        throw new Error("Company Already Exists!");
      } 
      else if(college.length === 0) {
        throw new Error ("Internal Server Error")
      }

      else {
        let hashedPass = await bcrypt.hash(password, 10);
        // const updatedCollege = { ...data , personalDetail : { password : hashedPass , ...personalDetail} }
        const pass = hashedPass;
      
        const students = await Student.find();
        // console.log(students);
        let companyAccount;
        if (students) {
          // console.log(students);

          companyAccount = await Company.create({
            personalDetail: {
              emailID,
              firstName,
              lastName,
              phone,
              password: pass,
              staffID,
            },
            studentDetails: students,
          });
        }
  
        if (companyAccount) {

          const companyID = new mongoose.Types.ObjectId(companyAccount.id)      
          const settingCompanyIdInCollege = await CollegeStaff.updateMany({$push : {"companyDetails" : companyID}})
         
          const usrTyp = "company";
          const token = generateToken(companyAccount._id.toString(), usrTyp);
  
          res.cookie("token", token, {
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400), // 1 day
            sameSite: "none",
            secure: true,
          }); 
          res.cookie("userType", usrTyp, {
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400), // 1 day
            sameSite: "none",
            secure: true,
          }); 
          res.status(201).json({message : "Account created Successfully"});
        } else {
          res.status(403);
          throw new Error("Invalid user data");
        }
      }
    } catch (error) {
      // console.log("error" , error);
      next(error)
  
    }
  });

  module.exports = {
    handleCompanySignUP
  }