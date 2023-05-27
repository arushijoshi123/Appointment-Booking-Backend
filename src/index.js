const express =require("express");
const app =express();
const mongoose= require("mongoose");
const doctorRouter = require("./routes/doctorRoutes");
const patientRouter = require("./routes/patientRoutes");
app.use(express.json());
app.use("/doctors",doctorRouter);
app.use("/patients",patientRouter);
app.get("/",(req,res)=>{
    res.send("welcome to the project");
});
mongoose.connect("mongodb+srv://joshiarushi025:1234@cluster0.v63uno1.mongodb.net/")
.then(()=>{
    app.listen(8000,()=>{
        console.log("server started at port no. 8000");
   });

})
.catch((error)=>{
    console.log(error);
})

