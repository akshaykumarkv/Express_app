//todo ***HERE WE CREATE EMAIL RELATED FUNCTIONS AND EXPORTING THIS MODULE***
const nodemailer = require('nodemailer'); //* Importing nodemailer for email functionality


//^ "MAKING TRANSPORTER AS GLOBAL AS IT IS CALLED FREQUENTLY FOR DIFFERENT FUNCTIONS"
let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "kvakshay09@gmail.com",
        pass: "ndojbusgbxbkzuib"
    }
})

//* TO CREATE INVITING MAIL FUNCTION
let invitationMail = async (email, name, role) => {

    // let transporter = nodemailer.createTransport({
    //     service: "Gmail",
    //     auth: {
    //         user: "kvakshay09@gmail.com",
    //         pass: "ndojbusgbxbkzuib"
    //     }
    // })

    //**  Creating separate mailBody and calling in the function
    let mailOptions = {
        from: "kvakshay09@gmail.com",
        to: email,
        subject: "INVITATION MAIL",
        // text: "Thanks for Registering with us",
        html: `<h1>Thanks for Registering ${name.toUpperCase()} with us <br/>
        Your account is created as ${role} <br/>
        You can login to access the APP <br/>
        Visit Again</h1>`
    }
    transporter.sendMail(mailOptions, () => { console.log("Invitation Mail Sent Successfully") })
}


//* CREATING FUNCTION TO SEND OTP
let sendOtp = async (email,otp,fullname) =>
{
    let mailOptions = {
        from: "kvakshay09@gmail.com",
        to: email,
        subject: "OTP Mail",
        // text: "Thanks for Registering with us",
        html: `<h1> Hi ${fullname}, Your OTP for AK APP is ${otp}<h1/>`
    }
    transporter.sendMail(mailOptions, () => { console.log("OTP Sent Successfully") })
}


//! Exporting Modules
module.exports = {
    invitationMail,
    sendOtp
}