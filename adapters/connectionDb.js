const {connect} = require('mongoose');
require('dotenv').config();

//! Creating the Database and connecting to DB
connect(process.env.LOCAL_URL).
then(()=>
{
    console.log("connected to MANGODB")
}).catch((err)=>
{
console.log(err)
})

