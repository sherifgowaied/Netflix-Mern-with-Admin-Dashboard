const router = require("express").Router()
const List = require("../models/List")
const verfiyToken = require("../verfiyWebToken")


//CREATE
router.post("/",verfiyToken,async(req,res)=>{
    if(req.user.isAdmin){
        try {
            const list = await new List(req.body)
            const savedList =await list.save();
            res.status(201).json(savedList)
        } catch (error) {
            res.status(500).json(error)
        }
    }else{
        res.status(403).json("You are not allowed")
    }
})

//DELETE
router.delete("/:id",verfiyToken,async(req,res)=>{
    if(req.user.isAdmin){
        try {
             await List.findByIdAndDelete(req.params.id)
             res.status(200).json("List have been deleted")
        } catch (error) {
            res.status(500).json(error)
        }
    }else{
        res.status(403).json("You are not allowed")
    }
})

//GET
router.get("/",verfiyToken,async(req,res)=>{
    try{
        const typeQuery = req.query.type;
        const genreQuery =req.query.genre;
        let list = [];
        if(typeQuery){
            if(genreQuery){
                list = await List.aggregate([
                    {$sample:{size:10}},
                    {$match:{genre:genreQuery,type:typeQuery}}
                ])
            }else{
                list = await List.aggregate([
                    {$sample:{size:10}},
                    {$match:{type:typeQuery}}
                ])
            }

        }else{
            list = await List.aggregate([
                {$sample:{size:10}}
            ])
        }
        res.status(200).json(list)
    }catch(err){
        res.status(500).json(err);
    }

})



module.exports = router