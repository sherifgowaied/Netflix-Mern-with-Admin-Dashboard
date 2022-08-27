const express = require("express")
const User = require("../models/User")
const CryptoJS = require("crypto-js");
const router = express.Router()
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()
//register
router.post("/register",async (req,res)=>{
    try
    {const newUser = new User({
        username:req.body.username,
        email:req.body.email,
        password:CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),

    })
    const user = await newUser.save()
    res.status(200).json(user)
    }catch(err){
        res.status(500).json(err)
    }
})

router.post("/login", async (req,res)=>{
    try {
        const user =await User.findOne({email:req.body.email})
        if(!user){
            return res.status(500).json("Wrong username or password")
        }else{

        

        const bytes  = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        originalText !== req.body.password &&  res.status(401).json("Wrong password or username")

        const accessToken = jwt.sign({id:user._id, 
            isAdmin:user.isAdmin}, 
            process.env.SECRET_KEY,{expiresIn:"5d"
        })
        const {password,...info} = user._doc;

        res.status(200).json({...info,accessToken })
    }
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router
