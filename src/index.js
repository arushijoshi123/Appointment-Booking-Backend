const express =require("express");
const app =express();
const mongoose= require("mongoose");
const doctorRouter = require("./routes/doctorRoutes");
const patientRouter = require("./routes/patientRoutes");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config()
app.use(express.json());
app.use(cors());//adds header to response from API
app.use("/doctors",doctorRouter);
app.use("/patients",patientRouter);
app.get("/",(req,res)=>{
    res.send("MINOR PROJECT BY ARUSHI , WELCOME!!!!");
});

const PORT =process.env.PORT || 8000;

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    app.listen(PORT,()=>{
        console.log("server started at port no. ",+ PORT);
   });

})
.catch((error)=>{
    console.log(error);
})

