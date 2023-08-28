const jwt = require('jsonwebtoken')
require('dotenv').config()

let auth= async(req,res,next)=>
{
    try
    {
        //* if there is token it returns a token prefixed with token else returns undefined
        let authToken= req.headers.authorization;

        //* TO CHECK WHEAThER THE TOKEN IS AVAILABLE OR NOT
        if(! authToken || !authToken.startsWith("Bearer")) //* it defines invalid token
        {
            return res.status(500).json({error:true, message:"Token required"})
        }

        //! getting the token without bearer
        let token= authToken.split(" ")[1];
        let decodedData= jwt.verify(token, process.env.JWT_SECRETEKEY, process.env.JWT_EXPIRESIN);

        let {email,name}= decodedData;
        req.user={email, name}
        next()

    } catch (err) {
        next(err)
    }
}

module.exports={
    auth
}