const User = require('../models/user.model');
const {sendOtp} = require('../helper/mailHelper');
const {createOtp} = require('../helper/otpHelper');

let genOtp= async(req,res,next)=>{
    try {
        let email=req.body
        let isUserAvailable= await User.findOne({email});
        
        if(!isUserAvailable){
            return res.status(500).json({error:true, message:`user not found with given mail ID ${email}`});
        }


        let{hashedotp, otp}= await createOtp()
        let user= await User.findOneAndUpdate({email},{hashedotp},{new:true, runValidators:true})

        sendOtp(email,otp,user.fullname)

        next()        

    } catch (err) {
        next(err)
    }
}


module.exports={
    genOtp
}