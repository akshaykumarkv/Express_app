const express = require('express');
const { getOneStudent, createStudent, editStudent, deleteStudent, getAllStudents } = require('../controllers/student.controllers');
const { auth } = require('../services/authServices');

//! Creation of Router
let router=express.Router()

//! routing methods from controllers
router.post("/addstudent",createStudent)
router.post("/getstudents", auth,getAllStudents)
router.get("/getstudentbyid/:sid",getOneStudent)
router.put("/updatestudent/:sid",editStudent)
router.delete("/deletestudent/:sid",deleteStudent)

//! exporting
module.exports=router