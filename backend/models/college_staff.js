const mongoose = require('mongoose')

const collegeStaffSchema = new mongoose.Schema(
  {
    personalDetail: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      emailID: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      staffID: { type: Number, required: true, unique: true },
      phone: { type: Number, required: true, unique: true },
      profilePicture: { type: String, default: '' }
    },
    notifications: [
      {
        title: String,
        from: String,
        body: String
      }
    ],
    designation: {
      type: String,
      enum: ['TPO Head', 'Assistant Professor', 'Placement Coordinator'],
      required: true,
      default: 'Placement Coordinator'
    },
    role: {
      type: String,
      enum: ['Allowed', 'Suspended'],
      default: 'Allowed'
    },
    studentDetails: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
      }
    ],
    companyDetails: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
      }
    ]
  },
  { timestamps: true }
)

const CollegeStaff = mongoose.model('CollegeStaff', collegeStaffSchema)

module.exports = CollegeStaff
