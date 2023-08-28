// //!! Collections
// const Teacher = require('../models/teacher.model');

// //! Importing "json"

// //^ ADDING TEACHER
// let createTeacher= async(req,res,next)=>{
//     try{
//         let{name,age,gender,email}=req.body

//         //* Creating body to store data
//         let addedTeacher =await Teacher.create({name,age,gender,email})
//     }
//     catch(error)
//     {
//         res.status(400).json({error: true, data:error.message})
//     }
// }


//!------------------------------------
//!! Collections
const { invitationMail } = require("../helper/mailHelper");
const Teacher = require("../models/teacher.model")
const bcryptjs = require('bcryptjs'); //* Importing bcryptjs for encrypting the data or password
const nodemailer = require('nodemailer'); //* Importing nodemailer for email functionality
const jwt = require('jsonwebtoken'); //* IMPORTING JWT TOKEN FOR AUTHENTICATION
require('dotenv').config();

//? Register Teacher
let registerTeacher = async (req, res, next) => {
    try {
        let { name, email, password } = req.body; //* Creating body to store data

        //? Returns the document if condition satisfies else return null
        let isTeacherAvailable = await Teacher.findOne({ email });

        if (!isTeacherAvailable) {

            // //!! Email Code
            // let transporter= nodemailer.createTransport({
            //     service:"Gmail",
            //     auth:{
            //         user:"kvakshay09@gmail.com",
            //         pass:"ndojbusgbxbkzuib"
            //     }
            // })

            // transporter.sendMail({
            //     from:"kvakshay09@gmail.com",
            //     to:"kvakshay45@gmail.com",
            //     subject:"INVITATION MAIL",
            //     text:"Thanks for Registering with us"
            // }, ()=>{console.log("Mail Sent Successfully")})

            invitationMail(email, name)
            //!! Email code

            let teacher = await Teacher.create({ name, email, password })
            let dataTeacher = {
                name: teacher.name,
                email: teacher.email, createdAT: teacher.createdAT, updatedAt: teacher.updatedAt, _id: teacher._id
            }
            return res.status(201).json({ error: false, message: "Teacher added successfully", data:dataTeacher })
        }
        res.status(409).json({ error: true, message: "Teacher already exist" })
    }
    catch (err) {
        next(err)
    }
}

let loginTeacher = async (req, res, next) => {
    try {
        let { email, password } = req.body

        let isTeacherAvailable = await Teacher.findOne({ email })

        if (!isTeacherAvailable) {
            return res.status(404).json({ error: true, message: "No teacher found at given email" })
        }

        let hashedPassword = await isTeacherAvailable.compareMyPassword(password)
        // if (password === isTeacherAvailable.password)

        if (hashedPassword) {
            let token= jwt.sign({email:isTeacherAvailable.email, name:isTeacherAvailable.name},
                 process.env.JWT_SECRETEKEY, {expiresIn:process.env.JWT_EXPIRESIN}); //* create token
            console.log(token);
            return res.status(201).json({ error: false, message: "Login SuccessFull",token})
        }
        else {
            return res.status(401).json({ error: true, message: "Invalid password" })
        }
    }
    catch (err) {
        next(err)
    }
}

//!Creating api for GettingALL teachers
// let getTeachers= async(req,res,next)=>{
//     try {
//         //* if there is token it returns a token prefixed with token else returns undefined
//         let authToken= req.headers.authorization;
//         console.log(authToken)


//         //* TO CHECK WHEAThER THE TOKEN IS AVAILABLE OR NOT
//         if (!authToken || !authToken.startsWith("Bearer"))//* it defines invalid token
//         if (!authToken || !authToken.includes("Bearer"))
//         {
//             return  res.status(500).json({error:true, message:"Token Required/ Invalid Token"})
//         }

//         let teachers = await Teacher.find({},{_id:0});
//         return res.status(200).json({error:false,message:"Teachers fetched Successfully", data:teachers})
//     } catch (err) {
//         next(err)
//     }
// }

//****************** */

let getAllTeachers=async (req,res,next)=>
{
    try
    {
        let teachers=await Teacher.find({},{_id:0});
        return res.status(200).json({error:false,message:"Teachers Fetched Successfully",
        data: teachers, user:teachers.name})
    }
    catch(err)
    {
        next(err)
    }
}
//! Exporting
module.exports = {
    registerTeacher,
    loginTeacher,
    getAllTeachers
}