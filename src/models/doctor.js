const mongoose = require("mongoose");
const DoctorSchema = mongoose.Schema({
    DoctorName:{
        type : String,
        required : true

    },
    DoctorPhone:{
        type :String,
        required :true,
        
       
    },
    DoctorEmail :{
        type :String,
        required :true
    },
    DoctorPwd :{
        type :String,
        required :true
    },
    Specialisation:{
        type :String,
        required :true
    },
    Fees:{
        type :String,
        required :true
    },
    Designation:{
        type :String,
        required :true
    },
    YOE:{
        type:Number,
        required :true
    },
    Location:{
         type:String,
         required:true
    },
    
    
},{timestamps :true});
module.exports =mongoose.model("Doctor",DoctorSchema);
