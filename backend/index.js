const express = require('express')
require('dotenv').config()
const connectToMongoDB = require('./connection')
const PORT = process.env.SERVER_PORT
const DATABASE_PASS = process.env.DATABASE_PASS
const errorHandler  = require('./middlewares/errorHandlerMiddleware')
const cors = require('cors')
const cookieParser = require("cookie-parser");
const studentRouter = require('./routes/student')
const staffRouter  = require('./routes/college_staff')
const companyRouter  = require('./routes/company')
const asyncHandler = require("express-async-handler"); 
const jwt = require("jsonwebtoken");

const app = express()
app.use(express.json())
app.use(cookieParser());

app.use(cors({
    credentials : true,
    origin : "https://impossible-plum-dibbler.cyclic.app"

    // origin : process.env.FRONTEND_URL
    origin : "http://localhost:3000"
}))
app.use(express.urlencoded({extended : false})); 
 

// DataBase Connection 
const dbURL=  `mongodb+srv://amartripathi:${DATABASE_PASS}@cluster0.2kwytrq.mongodb.net/database`
connectToMongoDB(dbURL)
.then(() => {
    console.log("DB Connected") 
    app.listen(PORT, ()=> console.log("server started at " , PORT))  
})
.catch(() => console.log("DB Connection Failed"))

// routes 
app.get('/' , asyncHandler( async = ( req , res , next ) => {
    try{
        const token = req.cookies.token
        const userType = req.cookies.userType
        
        if(token && userType){

            if (userType === "student") {
                const isVerified = jwt.verify(token, process.env.JWT_SECRET_KEY_STUDENT);
                
                if (isVerified) {
                    res.status(200).json({message :userType})
                  } 
              
            }
            else if(userType === "college-staff") {
                // console.log(userType);
                const isVerified = jwt.verify(token, process.env.JWT_SECRET_KEY_COLLEGE);
                // console.log(isVerified);
                if (isVerified) {
                    res.status(200).json({message :userType})
                  } 
              
            }
             else if (userType === "company") {
                const isVerified = jwt.verify(token, process.env.JWT_SECRET_KEY_COMPANY);
                if (isVerified) {
                    res.status(200).json({message :userType})
                  }  
            }
            else{
                res.status(401)
                throw new Error("Session Expired, Please signin again.")

            }
        }
        
}
    catch(error){
        if(error.message === "invalid token"){
            res.status(401)
            throw new Error("Session Expired, Please signin again.")
        }
        else{
            console.log(error);
               next(error)
        }

    }
}))

app.get('/test' , (req , res ) => {
    res.send("Test route is working fine")
})
        
app.use('/student' , studentRouter)
app.use('/college-staff' , staffRouter )
app.use('/company',companyRouter)

//at the end
app.use(errorHandler)
 
 
