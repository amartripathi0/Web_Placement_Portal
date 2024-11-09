const express = require('express')
require('dotenv').config()
const connectToMongoDB = require('./connection')
const PORT = process.env.PORT
const DATABASE_PASS = process.env.DATABASE_PASS
const errorHandler = require('./middlewares/errorHandlerMiddleware')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const studentRouter = require('./routes/student')
const staffRouter = require('./routes/college_staff')
const companyRouter = require('./routes/company')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
  })
)
app.use(express.urlencoded({ extended: false }))

// DataBase Connection
const dbURL = `mongodb+srv://amartripathi:${DATABASE_PASS}@cluster0.2kwytrq.mongodb.net/database`
connectToMongoDB(dbURL)
  .then(() => {
    console.log('DB Connected')
    app.listen(PORT, () =>
      console.log('server started at ', PORT || 5000)
    )
  })
  .catch(() => console.log('DB Connection Failed'))

// routes
app.get(
  '/',
  asyncHandler(async (req, res, next) => {
    try {
      const token = req.cookies.token;
      const userType = req.cookies.userType;
      
      if (!token && !userType) {
        return res.status(200).json({ message: 'visitor' });
      }

      if (token && userType) {
        let isVerified;
        if (userType === 'student') {
          isVerified = jwt.verify(token, process.env.JWT_SECRET_KEY_STUDENT);
        } else if (userType === 'college-staff') {
          isVerified = jwt.verify(token, process.env.JWT_SECRET_KEY_COLLEGE);
        } else if (userType === 'company') {
          isVerified = jwt.verify(token, process.env.JWT_SECRET_KEY_COMPANY);
        } else {
          return res.status(401).json({ message: 'Unauthorized Access! Please signin again.' });
        }

        if (isVerified) {
          return res.status(200).json({ message: userType });
        } else {
          return res.status(401).json({ message: 'Unauthorized Access! Please signin again.' });
        }
      } else {
        return res.status(400).json({ message: 'Bad Request: Missing token or userType.' });
      }
    } catch (error) {
      if (error.message === 'invalid token') {
        return res.status(401).json({ message: 'Session Expired! Please SignIn again.' });
      } else {
        console.log(error);
        next(error);
      }
    }
  })
)

app.get('/test', (req, res) => {
  res.send('Healthy Server')
})
app.use('/student', studentRouter)
app.use('/college-staff', staffRouter)
app.use('/company', companyRouter)

//at the end
app.use(errorHandler)
