const doctorModel = require("../models/doctor");
const patientModel = require("../models/patient");
const patientauth = require("../middlewares/auth");
const doctorauth = require("../middlewares/auth");
//require('dotenv').config();
const dotenv = require("dotenv");
dotenv.config()
const SECRET_KEY = process.env.SECRET_KEY;
const appointmentModel = require("../models/appointments");


//book appointment by patient
const bookappointment = async (req,res)=>{

   
        
    // booking new appointment
    const {PatientName,PatientPhone, PatientAge,PatientAddress,PatientGender ,DoctorName,DoctorId} =req.body;
    const newAppointment = new appointmentModel({
       
       PatientName:PatientName,
       PatientPhone:PatientPhone,
       PatientAge : PatientAge,
       PatientAddress :PatientAddress,
       PatientGender:PatientGender,
       PatientEmail :req.PatientEmail,
       PatientId:req.patientid ,
       DoctorName:DoctorName,
       DoctorId:DoctorId
    });
    try{
      
       await newAppointment.save();
       res.status(201).json({message :"Appointment Booked Successfully !!!",appointment :newAppointment});
       console.log("Appointment Booked Successfully !!!")
    }
    catch(error){
       console.log(error);
       res.status(500).json({message : "Can't book appointment"})
    };
}

module.exports = {  bookappointment};