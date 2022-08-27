const router = require("express").Router()
const CryptoJS = require("crypto-js");
const User = require("../models/User")
const verfiyToken = require("../verfiyWebToken")


//UPDATE
router.put("/:id",verfiyToken,async(req,res)=>{
    if(req.user.id===req.params.id || req.user.isAdmin){
        if(req.body.password){
            req.body.password =CryptoJS.AES.encrypt
            (req.body.password, process.env.SECRET_KEY).toString()
        }
            try {
                const updateUser = await User.findByIdAndUpdate(req.params.id,{
                    $set:req.body
                },{new:true})
                res.status(200).json(updateUser)
            } catch (error) {
                res.status(500).json(error)
            }
        
        }else{
            res.status(403).json("You can only update your account")
        }
})
//DELETE

router.delete("/:id",verfiyToken,async(req,res)=>{
    if(req.params.id ===req.user.id || req.user.isAdmin){
        try{
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account delted successfully!")
        }catch(err){
            res.status(403).json(err)
        }

    }else{
        res.status(403).json("You can only delete your account")
    }
})

//GET
router.get("/find/:id",async(req,res)=>{
   try{
    const user = await User.findById(req.params.id)
    const{password,...info} = user._doc
    res.status(200).json(info)
   }catch(error){
    res.status(500).json(error)
   }
})
//GET ALL
router.get("/",verfiyToken,async(req,res)=>{
    try{
      const query = req.query.new;
    if(req.user.isAdmin){
        try{
        const users = query ? await User.find().sort({_id:-1}).limit(5) : await User.find({})
        res.status(200).json(users )
          }catch(err){
              res.status(500).json(error)
          }
      }else{
            res.status(403).json("You are not allowed to see all users")
        }}catch(error){
          res.status(403).json(error)
        }
})
//GET USER STATIS

router.get("/stats", async (req, res) => {
    const today = new Date();
    const latYear = today.setFullYear(today.setFullYear() - 1);
  
    try {
      const data = await User.aggregate([
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json(err);
    }
  });
  


module.exports = router