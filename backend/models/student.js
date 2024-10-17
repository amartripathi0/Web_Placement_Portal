const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema(
  {
    personalDetail: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      emailID: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      fathersName: { type: String, default: '' },
      mothersName: { type: String, default: '' },
      phone: { type: Number, required: true, unique: true },
      profilePicture: { type: String, default: '' }
    },

    educationalDetails: {
      rollNumber: { type: Number, default: 0 },
      collegeName: { type: String, default: '' },
      degrees: [{ type: String, default: '' }],
      cgpa: { type: Number, default: 0 },
      yearOfPassing: { type: Number, default: 0 }
    },

    resume: { type: String, default: '' },
    role: {
      type: String,
      enum: ['Allowed', 'Suspended'],
      default: 'Allowed'
    },
    placementStatus: {
      isPlaced: { type: Boolean, default: false },
      companyName: { type: String, default: '' },
      packageOffered: { type: Number, default: 0 },
      status: {
        type: String,
        enum: ['Allowed', 'Debarred'],
        default: 'Allowed'
      }
    },
    applicationStatus: [
      {
        appliedJobID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Company.jobs'
        },
        status: {
          type: String,
          enum: [
            'Allowed',
            'Debarred',
            'Form Submitted',
            'Shortlisted',
            'Online Assessment',
            'Technical Interview',
            'HR Interview',
            'Offer Letter'
          ],
          default: 'Allowed'
        }
      }
    ],
    notifications: [
      {
        title: String,
        from: String,
        body: String
      }
    ],
    pastInternshipsProjects: {
      internships: [
        {
          company: { type: String, default: '' },
          role: { type: String, default: '' },
          duration: { type: String, default: '' },
          description: { type: String, default: '' }
        }
      ],
      projects: [
        {
          title: { type: String, default: '' },
          duration: { type: String, default: '' },
          description: { type: String, default: '' },
          link: { type: String, default: '' }
        }
      ]
    }
  },
  { timestamps: true }
)

const Student = mongoose.model('Student', studentSchema)
module.exports = Student
