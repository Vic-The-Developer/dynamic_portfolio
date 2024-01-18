var mongoose = require('mongoose');


//User info schema
var userSchema = mongoose.Schema({

    username:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fullName: {
        type: String
    },
    skills: {
        type: [{
            skillname: String,
            percentage: String
        }]
    },
    projects: {
        type: [{
            projectname: String,
            imageurl: String,
            description: String,
            projecturl: String
        }]
    },
    workExperience: {
        type: [{
            workTitle: String,
            years: {
                from: String,
                to: String
            },
            description: String
        }]
    }
})



var User = module.exports = mongoose.model('User', userSchema);