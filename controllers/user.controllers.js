const User = require('../models/user.model');
//* we need to import MAIL HELPER;
const {invitationMail, sendOtp} = require('../helper/mailHelper');
const { createOtp, generateNewOTP } = require('../helper/otpHelper');
const bcryptjs = require('bcryptjs');

//* CREATING USER FUNCTION
let createUser= async (req, res, next) =>
{
    try {
        let {fullname, email, role}=req.body; //*accessing data from frontend that is from req.body


        //!finding the user is available or not by comparing email
        let isUserAvailable = await User.findOne({email});

        if (isUserAvailable)
        {
          return res.status(500).json({error:true, message:"User Already Exists"});
        }
        //! if the user is not available create a new user by using the create method
        let user= await User.create({fullname, email, role});

        //! calling the em SENDING method CREATED AT HELPER
        invitationMail(email, fullname, role);

        res.status(201).json({error:false, message:"User created/added successfully", data:user});

    }
    catch (err)
    {
        next(err);
    }
}

//* CREATING LOGIN USER FUNCTION
let loginUser = async (req,res,next) => {

    try {
        let {email}=req.body; //*accessing data from frontend that is from req
        let isUserAvailable = await User.findOne({email});//*finding the user is available or not by comparing email

        if (!isUserAvailable)
        {
            return res.status(500).json({error:true, message:`User not found with given email ${email}`})
        }
        let {hashedotp,otp}=await createOtp();
        // console.log(hashedotp,otp)

        let user= await User.findOneAndUpdate({email}, {hashedotp},{new:true, runValidators:true})

        sendOtp(email,otp,user.fullname)

        return  res.status(404).json({error:true, message:`OTP sent successfully to your given email ${email}`, data:user.fullname});

    }
    catch (err)
    {
        next(err);
    }
}

//* CREATING USER VERIFICATION FUNCTION

let userVerification= async (req,res,next)=>{
    try{
        let {email,otp}=req.body
        let isUserAvailable= await User.findOne({email});

        if(!isUserAvailable)
        {
            return res.status(500).json({error:true,message:`User Not Found with given Email Id ${email}`});
        }

        let isTrue= await bcryptjs.compare(otp, isUserAvailable.hashedotp);

        if(isTrue)
        {
            return res.status(200).json({error:false, message:"OTP Verified Successfully"})
        }
        return res.status(500).json({error:true, message:"OTP Verification Failed!!!!!"})

    }
    catch (err) {
        next(err);
      }
    };


        let resendotp = async (req,res,next)=>{
            try{
              let {email} = req.body;
              return res.status(201).json({ error: false, message: `OTP Sent for the registered ${email}`});
            }
            catch(err){
              next(err)
            }
          }
//! Exporting
module.exports = {
    createUser,
    loginUser,
    userVerification,
    resendotp
}

//??????????????????????????????????????????????????????????
// let userVerification = async (req, res, next) => {
//     try {
//         let { email, otp } = req.body;
//         let isUserAvailable = await User.findOne({ email });

//         if (!isUserAvailable) {
//             return res.status(500).json({ error: true, message: `User Not Found with given Email Id ${email}` });
//         }

//         let isTrue = await bcryptjs.compare(otp, isUserAvailable.hashedotp);

//         if (isTrue) {
//             return res.status(200).json({ error: false, message: "OTP Verified Successfully" });
//         } else {
//             // Resend OTP logic here
//             let newOTP = generateNewOTP; // Implement this function to generate a new OTP
//             isUserAvailable.hashedotp = await bcryptjs.hash(newOTP, saltRounds);
//             await isUserAvailable.save();

//             return res.status(200).json({ error: false, message: "OTP Resent Successfully" });
//         }
//     } catch (err) {
//         next(err);
//     }
// }