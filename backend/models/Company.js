const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CompanySchema = new Schema(
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

    designation: {
      type: String,
      enum: ['Hiring Manager', 'HR', 'CTO'],
      required: true,
      default: 'Hiring Manager'
    },
    company: {
      type: String,
      required: true,
      default: ''
    },
    role: {
      type: String,
      enum: ['Allowed', 'Suspended'],
      default: 'Allowed'
    },
    notifications: [
      {
        title: String,
        from: String,
        body: String
      }
    ],
    jobs: [
      {
        jobId: {
          type: mongoose.Schema.Types.ObjectId,
          default: mongoose.Types.ObjectId
        },
        role: { type: String, required: true, default: '' },
        description: { type: String, required: true, default: '' },
        qualifications: [{ type: String, required: true, default: '' }],
        startDate: Date,
        applicationDeadline: Date,
        status: {
          type: String,
          enum: ['Open', 'Closed'],
          default: 'Open'
        }
      }
    ],

    studentDetails: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
      }
    ]
  },
  { timestamps: true }
)
const Company = mongoose.model('Company', CompanySchema)

module.exports = Company
