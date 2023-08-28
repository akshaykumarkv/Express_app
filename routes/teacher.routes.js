const express = require('express');

const {createTeacher,oneTeacher,updateTeacher,deleteTeacher, registerTeacher, loginTeacher, getAllTeachers} = require('../controllers/teacher.controllers');
const { auth } = require('../services/authServices');

//! Creation of Router
let router= express.Router()


//! Creating Routing Methods from Controllers
router.post("/addteacher",registerTeacher);
router.get("/loginteacher",loginTeacher);
router.get("/getteachers",auth, getAllTeachers)


// router.post("/addteacher", createTeacher)
// router.post("/getteacher", getTeacher)
// router.get("/getteacherbyID/:tid",oneTeacher )
// router.put("/updateteacher/:tid",updateTeacher )
// router.delete("/deleteteacher/:tid",deleteTeacher)

//! Exporting
module.exports= router

//* done