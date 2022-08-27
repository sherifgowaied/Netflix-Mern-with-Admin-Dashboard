const router = require("express").Router()
const Movie = require("../models/Movie")
const verfiyToken = require("../verfiyWebToken")


//CREATE
router.post("/",verfiyToken,async(req,res)=>{
    if(req.user.isAdmin){
        try{
            const movie = await new Movie(req.body)
            const savedMovie = await movie.save()
            res.status(201).json(savedMovie)
        }catch(error){
            res.status(500).json(error)
        }

    }else{
        res.status(403).json("you are not allowed")
    }
})
//UPDATE
router.put("/:id",verfiyToken,async(req,res)=>{
    if(req.user.isAdmin){
        try{
            const updatedMovie = await Movie.findByIdAndUpdate(req.params.id,
                {$set:req.body},{new:true})
                res.status(200).json(updatedMovie)

        }catch(error){
            res.status(500).json(error)
        }

    }else{
        res.status(403).json("you are not allowed")
    }
})
//DELETE
router.delete("/:id",verfiyToken,async(req,res)=>{
    if(req.user.isAdmin){
        try{
                await Movie.findByIdAndDelete(req.params.id)
                res.status(200).json("The movie has been deleted")

        }catch(error){
            res.status(500).json(error)
        }

    }else{
        res.status(403).json("you are not allowed")
    }
})
//GET
router.get("/find/:id",verfiyToken,async(req,res)=>{
    
        try{
                const movie = await Movie.findById(req.params.id)
                res.status(200).json(movie)

        }catch(error){
            res.status(500).json(error)
        }
})
//GET ALL Random

router.get("/random",verfiyToken,async(req,res)=>{
    const type = req.query.type;
    let movie;
    try{
        if(type==="series"){
            movie = await Movie.aggregate([
                {$match:{isSeries :true}},
                {$sample:{size:1}},
            ])
        }else{
            movie = await Movie.aggregate([
                {$match:{isSeries :false}},
                {$sample:{size:1}},
            ])
        }
        res.status(200).json(movie)

    }catch(error){
        res.status(500).json(error)
    }
})

//GET ALL 
router.get("/",verfiyToken,async(req,res)=>{
    if(req.user.isAdmin){
        try {
            const movies = await Movie.find()
            res.status(200).json(movies.reverse())
            
        } catch (error) {
            res.status(500).json(error)
        }
    }else{
        res.status(403).json("you are not allowed")
    }
})






module.exports = router