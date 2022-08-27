const express = require("express")
const mongoose = require('mongoose');
const dotenv = require("dotenv")
const app = express()
const authRoute = require("./routes/auth")
const userRoute = require("./routes/users")
const movieRoute = require("./routes/movies")
const listRoute = require("./routes/lists")
dotenv.config()

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    
}).then(()=>console.log("Db connect successfully!"))
.catch(err=>console.log(err));

app.use(express.json())

app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/movies",movieRoute)
app.use("/api/lists",listRoute)



app.listen(8800,()=>{
    console.log("backend server is listening")
})