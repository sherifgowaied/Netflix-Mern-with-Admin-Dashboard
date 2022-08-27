const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
    title:{type:String,required:true,unique:true},
    type:{type:String},
    content:{type:Array},
    genre:{type:String}
    
    
},{timestamps:true}
)

module.exports = mongoose.model("List",ListSchema)