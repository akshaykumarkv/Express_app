//!----------Creating Schema for Teacher Collection--------------------------
const { Schema, model } = require('mongoose');
const bcryptjs = require('bcryptjs'); //* import bycryptjs for encryption function


let teacherSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is mandatory"]
    },
    email: {
        type: String,
        required: [true, "Email is mandatory"]
    },
    password: {
        type: String,
        required: [true, "Password is mandatory"]
    }
},
    { timestamps: true })

//!! Don't use ARROW function for the PRE METHOD. Encrypting password while creating account
teacherSchema.pre("save", async function (next) {
    let salt = await bcryptjs.genSalt(11);
    this.password = await bcryptjs.hash(this.password, salt);


    //! from 5 above version of mongoose next() is not required
    // next()
})
//!
teacherSchema.methods.compareMyPassword = async function (password){

    return await bcryptjs.compare(password, this.password); //*Sync means it will wait until the process completes before moving on
}
//! creation of collection and exporting this schema
module.exports = new model("trainer", teacherSchema)