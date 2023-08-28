//! Collections
const Student = require('../models/student.model');
const jwt = require('jsonwebtoken');

//! importing "joi" for JOI VALIDATION
const Joi = require('joi');
const { query } = require('express');
//^ Adding student

//* regular adding student to the DB 
// let createStudent = async (req, res, next) => {
//     try{
//         let { name, age, gender,email } = req.body
//         let addedStudent = await Student.create({ name, age, gender,email }); //*creating the body or storing to body

//         res.status(201).json({ error: false, message: " student added successfully", data: addedStudent })//* response
//     }
//     catch(error){
//         res.status(400).json({ error: true, data:error.message})
//     }
// }

//^ Adding student
//*Creating JOI Validation
let studentSchema = Joi.object({
    name: Joi.string().min(4).required().messages({
        "string.base":"Name Must be String",
        "string.min":"Name Should Contain minimum 4 Characters",
        "string.empty":"Name is Mandatory"
    }),
    age: Joi.number().required().messages({
        "number.base":"Age must be Number",
        "number.min":"Age must be of two Digit",
        "number.empty":"Age is Mandatory"
    }),
    gender:Joi.string().required().messages({
        "string.base":"Gender must be string",
        "string.empty":"Gender is Mandatory"
    }),
    email:Joi.string().required().email().messages({
        "string.base":"email must be String",
        "string.unique":"email must be unique",
        "string.empty":"email is Mandatory"
    })
})
//&& Creating method to adding the student
let createStudent= async(req,res,next)=>{
    try {
        let {name,age,gender,email}=req.body;

        //* validating use validate method of Joi.studentSchema
        let {value,error}= studentSchema.validate({name,age,gender,email})
        
        console.log(value)
        console.log('--------------------')
        console.log(error)

        if (error) {
            return res.status(400).json({err:true,message:error.message})
        } else {
            //* writing a query to add the data and return the added data.
            let newStudent= await Student.create({name,age,gender,email})
            res.status(201).json({error:false,message:"Student added successfully",data:newStudent})
        }
    } catch (err) {
        next(err)
    }
}



//^ Getting all students
let getAllStudents = async (req, res, next) => {
    try {
        let {gender,name,fees,sort,select}=req.query;
        let queryObject= {}

        if (gender)
        {
            queryObject.gender=gender
        }

        if (name) {
            // queryObject.name=name
            queryObject.name={$regex:name,$options:"i"}
        }
        if (fees) {
            queryObject.fees=Number (fees)
        }
    let allStudents = await Student.find({},{_id:0})
    res.status(201).json({ error: false, message: "STudent fetch successful", data: allStudents })

    //* Sorting
    //  let allStudents = await Student.find(queryObject,{_id:0, name:1, age:1, gender:1})
    //  let allStudents = await Student.find(queryObject)

    //  if (sort) {
        // console.log("sort")
    //     allStudents= allStudents.sort(sort)

    //  }else{
    //     allStudents= allStudents.sort("createdAt")
    //  }
    //  allStudents= await allStudents;
    //  res.status(302).json({count:allStudents.count, error:false, user:{name:req.user.name}, message:"Student Data Found", data:allStudents})
    }
catch (err)
{
    next(err)
}
}

//^ getting one Student
let getOneStudent = async (req, res, next) => {
    try {
        let { sid } = req.params;
        console.log(sid)

        let authToken= req.headers.authorization
        console.log(authToken)

        if(!authToken || !authToken.startsWith("Bearer"))
        {
            return res.status(500).json({error:true, message:"Token Required"})
        }

        //* Getting the token without bearer 
        let token= authToken.split(" ")[1];

        let data= jwt.verify(token, "akshay123")//* verifying the created token 

        console.log(data)

        //* Below methods return null if there no match else returns matched document
        let singleStudent = await Student.findById(sid);
        // let singleStudent= await Student.findOne({_id:sid})
        // let singleStudent= await Student.findOne({name:sid})

        //* Checking whether student is available or not
        if (!singleStudent) {
            return res.status(404).json({ error: true, message: ` No Student found with Given name or with ID ${sid}`, data: null })
        }
        res.status(201).json({ error: false, message: "Student name matched", data: singleStudent })
    }

    catch (error) {
        res.status(400).json({ error: true, data:error.message})
    }
}



    //^ Updating students
    let editStudent = async (req, res, next) => {
        try{
            let { name, age, gender, email } = req.body
        let { sid } = req.params

        let singleStudent = await Student.findById(sid);
        console.log(singleStudent);

        //* Checking whether student is available or not
        if (!singleStudent) {
            return res.status(404).json({ error: true, message: `No student found with given ID ${sid}`, data: null })
        }

        let updatedStudent = await Student.findOneAndUpdate({ _id: sid }, { name, age, gender, email,runValidators: true  })
        // console.log(req.body)
        // console.log(req.params)

        res.status(201).json({ error: false, message: `${updatedStudent.name.toUpperCase()}  updated successfully`, data: null })
        }
        catch(error){
            res.status(400).json({ error: true, data:error.message})
        }
    }


    //^ Deleting Single Student
    let deleteStudent = async (req, res, next) => {
        //* sid is having _id
        let { sid } = req.params;
        let isAvailable = await Student.findById(sid)

        if (!isAvailable) {
            return res.status(404).json({ error: true, message: `No student available with Given ID ${sid}`, data: null })
        }

        let deletedStudent = await Student.findOneAndDelete({ _id: sid })

        res.status(200).json({ error: false, message: `Student deleted Successfully with id ${sid}`, data: deleteStudent })
    }

    //! exporting
    module.exports = {
        createStudent,
        getOneStudent,
        getAllStudents,
        editStudent,
        deleteStudent
    }