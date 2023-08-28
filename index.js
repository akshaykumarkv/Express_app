const express = require('express');
require('./adapters/connectionDb');
require('dotenv').config();
const teacherRouter = require('./routes/teacher.routes');//* importing teacher routes
const userRouter= require('./routes/user.routes')//* importing user routes
const studentRouter = require('./routes/student.routes');//* importing user routes


let app= express();
// console.log("hello");

//! used to accept json data from the req.body
app.use(express.json())

//! teacher routes
app.use("/api/teacher",teacherRouter);

//! user routes
app.use("/api/user",userRouter)

//! Fetching Student routes
app.use("/api/student",studentRouter);
// app.use("/getstudentbyid/:sid",studentRouter)


//! Page Not found MIDDLEWARE
app.use("*", (req,res,next)=>{
    res.status(404).json({error:true,message:`Page Not Found`})
})


//! Error Handling Middleware
app.use((err,req,res,next)=>{
    res.status(400).json({error:true, message:err.message,data:"OKK"})
})


//!SERVER CREATION
let PORT=process.env.PORT
app.listen(PORT,(err)=>{
if (err)throw err
console.log(`Server running on port ${PORT}`)
})

