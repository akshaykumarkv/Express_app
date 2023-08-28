//! CREATING ROUTERS OR APIS FOR USERS 
const express = require('express');//* importing express
const { createUser, loginUser, userVerification, resendotp,  } = require('../controllers/user.controllers');//* auto imported
const { createOtp } = require('../helper/otpHelper');

//! Creation of Router
const router = express.Router();


//! Creating Routers from controllers
router.post("/createuser",createUser)
router.post("/loginuser",loginUser)
router.post("/userverification", userVerification)
router.post("/resendotp",createOtp,resendotp)

//! Exporting
module.exports= router;
