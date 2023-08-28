//! ***HERE WE CREATE OTP RELATED FUNCTIONS AND EXPORTING THIS MODULE***
const bcryptjs = require('bcryptjs');


//! creating otp sending function
let createOtp= async()=>{
    let otp= Math.floor(Math.random()*899999+100000).toString();

    let salt= await bcryptjs.genSalt(10);
    let hashedotp= await bcryptjs.hash(otp, salt);

    return{
        hashedotp,
        otp
    }
}


// //! Creating RESEND OTP function
// let generateNewOTP= async()=>{
//     let= Math.floor(Math.random()*899999+100000).toString();

//     let salt= await bcryptjs.genSalt(10);
//     let hashedotp= await bcryptjs.hash(otp, salt);

//     return{
//         hashedotp,
//         otp
//     }
// }

//! Exporting
module.exports={
    createOtp
    // generateNewOTP
}