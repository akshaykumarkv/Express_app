const {Schema,model} = require('mongoose');
//! creation of schema structure for student collection
let studentSchema = new Schema({
    name:{
        type: String,
        required: [true,"Name is Required"]
    },
    age:{
        type: Number,
        required: [true,"Age is Required"]
    },
    gender:{
        type: String,
        required: [true,"Gender is Required"],
        enum : {
            values: ["male","female","others"],
            message: "Only male,female and others are allowed you have entered {VALUE}"
        }
    },
    email:{
        type: String,
        required: [true,"Email is Required"]
    },
    fees:{
        type:Number,
        required:[true, "fees is Required"]
    },
    salary:{
        type:Number,
        required:[true, "Salary is required"]
    }

},
{
    timestamps:true
}
)

//! creation of collection using model
module.exports =  new model("student",studentSchema);