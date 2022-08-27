const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")
dotenv.config()


function verfiyToken(req,res,next){
    
    const authHeader = req.headers.token
    if(authHeader){
        var token = authHeader.split(" ")[1]
        token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYzA0MjA3ZTRlN2I3NThmZDUwNGJlYiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1OTk0OTE0OSwiZXhwIjoxNjYwMzgxMTQ5fQ.DE1EwZrJWrJRI4jyNSzsQgKGdnpCmxfz77bAqiMJuY4"
        jwt.verify(token,process.env.SECRET_KEY,(err,userInfo)=>{
            if(err){
                res.status(403).json("Token is not valid")
            }else{
                req.user = userInfo
                next()
            }
        })
    }else{
        return res.status(401).json("You are not authenticated")
    }

}


module.exports = verfiyToken