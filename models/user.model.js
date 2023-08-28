//! IMPORTING MONGOOSE
const {Schema, model, Model} = require('mongoose');

//!CREATING Schema for User
let userSchema = new Schema({
    fullname: {
        type: String,
        required: [true, "FullName is Mandatory"]
    },
    email: {
        type: String,
        required: [true, "Email is Mandatory"]
    },
    role: {
        type: String,
        required: [true, " Role is Mandatory"],
        enum:["student", "teacher","user"]
    },
    hashedotp: {
        type: String,
        required: [true, "Hashed OTP is Mandatory"],
        default: "null"
    }
},
{timestamps: true})

//! Exporting the module
module.exports = new model("user", userSchema);

