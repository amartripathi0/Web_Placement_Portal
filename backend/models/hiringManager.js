const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecruiterSchema = new Schema({
    personalDetail : {
        firstName: {  type: String,required: true   },
        lastName: {  type: String,required: true  },
        emailID : {type : String ,  required: true , unique : true},
        password:{type : String ,  required: true},
        staffID : {type : Number  , required : true, unique : true , default : 0},
        phone : {type : Nuimber , required:true , unique : true}
    },

    company: {
        type: String,
        required: true
    },
    position: {
        type: String,
        default: 'Hiring Manager'
    },
    role : {
        type : String,
        enum : ["allowed , suspended"]
    },
    vacancies: [{
        role: String,
        description: String,
        qualifications: [String],
        startDate: Date,
        applicationDeadline: Date,
        status: {
            type: String,
            enum: ['Open', 'Closed'],
            default: 'Open'
        }
    }],

    studentsStatistics :  [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Student"
    }]
} , {timestamps : true})
const Recruiter = mongoose.model('Recruiter', RecruiterSchema);

module.exports = Recruiter;