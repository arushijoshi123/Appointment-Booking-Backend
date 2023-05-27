const mongoose = require("mongoose");
const AppointmentSchema = mongoose.Schema({
    PatientName:{
        type : String,
        required : true

    },
    PatientPhone:{
        type :String,
        required :true,
        
    },
    PatientAge :{
        type :Number,
        required :true
    },
   
    PatientAddress:{
        type :String,
        required :true
    },
    PatientGender:{
        type :String,
        required :true
    },
    DoctorName:{
        type :String,
        required :true
    },
    DoctorId:{
        //will take it from token of doctor 
        type: mongoose.Schema.Types.ObjectId,
        required :false
    },
    PatientId:{
        //will take from token of patient
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    Status :{
        type :String,
        default:"NOT BOOKED"
    },
    Meetlink :{
        type : String,
        required :false

    },

    Time :{
        type :String,
        required :false
    },
    Prescription:{
        type : String,
        required :false
    }
    
    
},{timestamps :true});
module.exports =mongoose.model("Appointments",AppointmentSchema);
