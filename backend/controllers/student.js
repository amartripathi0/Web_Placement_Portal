const mongoose = require("mongoose");
const Student = require("../models/student");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../utils/index");
const uploadToCloudinaryModule = require("../utils/index");
const CollegeStaff = require("../models/college_staff");
const Company = require("../models/Company");
const handleStudentSignUP = asyncHandler(async (req, res , next) => {
  try {
    

  //get credential from body
  // First Name , Last Name , Email , phnono password confirm pass
  const { emailID, firstName, lastName, phone, password, cpass } = req.body;
  if (!emailID || !password) {
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

  const existingStudent = await Student.findOne({
    $or: [
      { "personalDetail.emailID": emailID },
      { "personalDetail.phone": phone },
    ],
  });

  const company = await Company.find()
  const college = await CollegeStaff.find()
 
  if (existingStudent) {
    res.status(409);
    throw new Error("Student Already Exists!");
  } 

  else if(company.length === 0 || college === 0){
      throw new Error("Internal Server Error")
  }
  else {
    let hashedPass = await bcrypt.hash(password, 10);
    // const updatedStudent = { ...data , personalDetail : { password : hashedPass , ...personalDetail} }
    const pass = hashedPass;

    let student = await Student.create({
      personalDetail: { emailID, firstName, lastName, phone, password: pass },
    });

    const studentID = new mongoose.Types.ObjectId(student.id)

    // console.log(studentID);

    const settingStudentIdInCollege = await CollegeStaff.updateMany({$push : {"studentDetails" : studentID}})
    const settingStudentIdInCompany = await Company.updateMany({$push : {"studentDetails" : studentID}})
    // console.log(settingStudentIdInCollege);
    if (student && settingStudentIdInCollege.modifiedCount >=1 && settingStudentIdInCompany.modifiedCount >=1 ) {

      const populatedCollegeStaff = await CollegeStaff.find({}).populate({ path: "studentDetails" , select: "-personalDetail.password" })
      const populatedCompany = await Company.find({}).populate({ path: "studentDetails" , select: "-personalDetail.password" })
      // res.json({msg : populatedCollegeStaff})  
      // .populate({ path: "studentDetails" , select: "-personalDetails.password" })

      
      const usrTyp = "student"
      const token = generateToken(student._id.toString(), usrTyp); 

      // console.log(token);
      res.cookie("token", token, {
        path: "/", 
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), // 1 day
        sameSite: "none",  
        secure: true,
      }); 
      res.cookie("userType"  , usrTyp , {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), // 1 day
        sameSite: "none",
        secure: true,
      } )
      res.status(201).json({ emailID, firstName, lastName, phone });
    } else {
      res.status(403);
      throw new Error("Invalid user data");
    }
  }
} catch (error) {
  next(error)

}
}); 

const handleStudentSignIN = asyncHandler(async (req, res) => {
  try {    
  const { emailID, password } = req.body;
  // console.log(emailID);
  if (!emailID || !password) {
    res.status(401);
    throw new Error("Please fill up all the required fileds");
  }

  const student = await Student.findOne({ "personalDetail.emailID": emailID });
  if (student) {
    // console.log(student.personalDetail.password ,  password);
  
    const isValdid = await bcrypt.compare(
      password,
      student.personalDetail.password
    );

    if (isValdid) {
      const usrTyp = "student"
      const token = generateToken(student._id.toString(), usrTyp);
      res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), // 1 day
        sameSite: "none",
        secure: true,
      });
      
      res.cookie("userType"  , usrTyp , {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), // 1 day
        sameSite: "none",
        secure: true,
      } )
      res.status(201).json({ message: "Login Successfull" });
    } else {
      res.status(401).json({message : "Invalid EmailID or Password."}); 
    }
  } else {
    res.status(403).json({message : "Student doesn't exists."}); 
  }
} catch (error) {
  console.log(error);
    res.status(500)
    throw new Error("Internal Server Error")
}
});

const handleStudentSignOUT = asyncHandler(async (req, res) => {
  try {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0), // 1 day
    sameSite: "none",
    secure: true,
  });
  res.cookie("userType", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0), // 1 day
    sameSite: "none",
    secure: true,
  });
  res.status(201).json({ message: "signout successfull" });
} catch (error) {
  res.status(500)
  throw new Error("Internal Server Error")
}
});

const handleStudentProfileUpdate = asyncHandler(async (req, res) => {
  try{
    const data = req.body
    
    const dataType = data.typ
    const dataVal = data.value
    // console.log(data);
    const personalDetail = req.user.personalDetail;
    if(!data){
        res.status(401);
    throw new Error("Unsufficent data");

    } 
    else{
        // const user = await Student.updateOne({_id : req.user.id} , {$set : {"personalDetail" : data}})
        const user = await Student.findById(req.user.id);
        // console.log("" ,{...personalDetail ,password : user.personalDetail.password , ...dataVal} );

        if(dataType === "personalDetail"){
        await Student.updateOne({_id : req.user.id} , {$set : {"personalDetail" : {...personalDetail ,password : user.personalDetail.password , ...dataVal}}})
        }
        else if(dataType === "educationalDetails"){
           await Student.updateOne({_id : req.user.id} , {$set : {"educationalDetails" : dataVal}})
        }
        // const user = await Student.findOneAndUpdate({_id : req.user.id} , {$set : {"personalDetail" : {...personalDetail , ...data}}}
        // , {returnDocument : "after"})
        else if(dataType === "internships"){
          await Student.updateOne({_id : req.user.id} , {$push : {"pastInternshipsProjects.internships"  : dataVal}}) 

        } 
        else if(dataType === "projects"){
          await Student.updateOne({_id : req.user.id} , {$push : {"pastInternshipsProjects.projects"  : dataVal}}) 

        } 
        if(user){
            res.json({message : "Details Updated Successfully"})
        }
        else{
            res.status(401);
            throw new Error("Details Update Failed");
        }
    }
  } catch (error) {
    console.log(error);

    res.status(500)
    throw new Error("Internal Server Error")
  }
});


const handleGetUserData = asyncHandler(async (req, res) => {
  try{
    // console.log(req.user);
    if(req.user){
        res.status(200).json({message: req.user})
    }
    else{
        res.status(403)
        throw new Error("No such user")
    }
  } catch (error) {
    throw new Error("Internal Server Error")
  }

});
 
const handleUploadResume = asyncHandler(async (req, res) => {
  try{
    if(!req.file){
      res.status(401)
      throw new Error("Please upload a valid file.") 
    }
    else if(req.file.size > 50000000){
      res.status(401)
      throw new Error("Please upload file of size less than 5 MB") 
    }
    else{
      const upload = await uploadToCloudinaryModule.cloudinary.uploader.upload(
        req.file.path,
        { folder: "Placement_Web_Portal/student/resume", resource_type: "image" }
        );

        if(upload){
          const user =  await Student.findById(req.user.id)
          const updated = await Student.updateOne({_id : req.user.id} , {$set : {"resume" :  upload.secure_url}})
          // console.log(upload);

          if(updated.modifiedCount === 1){
              res.status(201).json({message : "Resume uploaded successfully"})
          } 
          else{
            res.status(500)
          throw new Error("Internal Server Error") 
          }
        }
        else{ 
          res.status(500)
          throw new Error("Internal Server Error")  
        } 
    } 
} catch (error) {
  console.log(error);
  res.status(500)
  throw new Error("Internal Server Error")
}
});
const handleUploadProfilePicture = asyncHandler(async (req, res) => {
  try{
    if(!req.file){
      res.status(401)
      throw new Error("Please upload a valid image.") 
    }
    else if(req.file.size > 10000000){
      res.status(401)
      throw new Error("Please upload file of size less than 1 MB") 
    }
    else{
      const upload = await uploadToCloudinaryModule.cloudinary.uploader.upload(
        req.file.path,
        { folder: "Placement_Web_Portal/student/profile_photo", resource_type: "image", public_id : "profilePic"
      }
      ); 
      if(upload){
        const personalDetail = req.user.personalDetail;
        const user =  await Student.findById(req.user.id)
        const updated = await Student.updateOne({_id : req.user.id} , {$set : {"personalDetail" : {...personalDetail , password : user.personalDetail.password , profilePicture : upload.secure_url}}})
        
        if(updated.modifiedCount === 1){
            res.status(201).json({message : "Profile picture updated successfully"})
        }
        else{
          res.status(500)
        throw new Error("Internal Server Error") 
        }
  }
      else{
        res.status(500)
        throw new Error("Internal Server Error") 
      } 
    } 
} catch (error) {
  console.log(error);
  res.status(500)
  throw new Error("Internal Server Error") 
}
});

module.exports = {
  handleStudentSignUP,
  handleStudentSignIN,
  handleStudentSignOUT,
  handleStudentProfileUpdate,
  handleGetUserData,
  handleUploadResume,
  handleUploadProfilePicture
};
