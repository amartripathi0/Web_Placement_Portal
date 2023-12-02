const Student = require("../models/student");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const CollegeStaff = require("../models/college_staff");

const isSignedIn = (userType) =>
  asyncHandler(async (req, res, next) => {
    try {
      const token = req.cookies.token;
      // console.log(token);
      if (!token) {
        res.status(401);
        throw new Error("Unauthorized User,Please Login");
      } else {
          let documentObjOfUser;

        if (userType === "student") {
          documentObjOfUser = jwt.verify(
            token,
            process.env.JWT_SECRET_KEY_STUDENT
          );
        } else if (userType === "college-staff") {
          documentObjOfUser= jwt.verify(
            token,
            process.env.JWT_SECRET_KEY_COLLEGE
          );
        } else if (userType === "company") {
          documentObjOfUser = jwt.verify(
            token,
            process.env.JWT_SECRET_KEY_COMPANY
          ); 
        }

        // console.log(documentObjOfUser);
        if (!documentObjOfUser) {
          res.status(401);
          throw new Error("Unauthorized User,Please Login");
        } else {
          const userId = documentObjOfUser.id; 
          if (userType === "student") {
            user = await Student.findById(userId).select(
              "-personalDetail.password"
            );
          } else if (userType === "college-staff") {
            user = await CollegeStaff.findById(userId).select(
              "-personalDetail.password"
            ).populate({ path: "studentDetails" , select: "-personalDetail.password" });
          } else if (userType === "company") {
            user = await Student.findById(userId).select(
              "-personalDetail.password"
            );
          }
          if (!user) {
            res.status(401);
            throw new Error("Unauthorized User,Please Login");
          }
          if (user.role === "suspended") {
            res.status(400);
            throw new Error("User suspended!! ");
          }

          req.user = user;
          next();
        }
      }
    } catch (error) {
      res.status(401);
      throw new Error("Unauthorized User,Please Login");
    }
  });

module.exports = {
  isSignedIn,
};
