const {Schema,model} = require('mongoose');
//! creation of schema structure for student collection
let aluminiSchema = new Schema({

    name:{
        type: String,
        required: [true,"Name is Required"]
    },
    yearofpassout:{
        type: Number,
        required: true
    },
    gender:{
        type: String,
        required: [true,"Gender is Required"],
        enum : {
            values: ["male","female","others"],
            message: "Only male,female and others are allowed you have entered {VALUE}"
        }
    },
    department:{
        type: String,
        required: [true,"Email is Required"]
    }
},
{
    timestamps:true
}
)

//! creation of collection using model
module.exports =  new model("alumini",aluminiSchema);