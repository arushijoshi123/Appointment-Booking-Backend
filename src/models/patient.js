const mongoose = require("mongoose");
const PatientSchema = mongoose.Schema({
    PatientName:{
        type : String,
        required : true,

    },
    PatientPhone:{
        type :String,
        required :true,
        Max :[10],
    },
    PatientAge:{
        type : Number,
        required :true
    },
    PatientAddress:{
        type :String,
        required :true
    },
    PatientGender :{
        type :String,
        required :true
    },
    PatientEmail :{
        type :String,
        required :true
    },
    PatientPwd :{
        type :String,
        required :true
    }
   
    
    
    
    
    
},{timestamps :true});
module.exports =mongoose.model("Patient",PatientSchema);
