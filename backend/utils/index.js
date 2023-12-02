const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;

const generateToken = (id , usrTyp) => {
  let secretKey ;
  if(usrTyp === "student"){
     secretKey = process.env.JWT_SECRET_KEY_STUDENT
  }
  else if(usrTyp === "college-staff"){
     secretKey = process.env.JWT_SECRET_KEY_COLLEGE
  }
  else if(usrTyp === "company"){
     secretKey = process.env.JWT_SECRET_KEY_STUDENT
  }
  // console.log("secretKey" , secretKey);
  return jwt.sign({ id }, secretKey, { expiresIn: "1d" });
};


cloudinary.config({
  cloud_name: 'dxh6v9voc',
  api_key: '482957476972261',
  api_secret: 'YkgIZcd8xRDJuzqmiaodYQUxrzU',
  secure: true,
});

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUDNAME,
//   api_key: process.env.CLOUDINARY_APIKEY,
//   api_secret: process.env.CLOUDINARY_APISECRET,
// });

module.exports = {
  generateToken,
  cloudinary,
};
