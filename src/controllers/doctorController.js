const doctorModel = require("../models/doctor");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const doctorauth = require("../middlewares/auth");
const appointmentModel = require("../models/appointments");
const { json } = require("express");
const dotenv = require("dotenv");
dotenv.config()
//require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;

// Doctor signup
const signup = async (req, res) => {
    //Existing user check
    //hashed password
    //user creation 
    //token generate
    const { DoctorName, DoctorEmail, DoctorPwd, DoctorPhone, Specialisation, Fees, Designation, YOE, Location } = req.body;
    try {
        const existingDoctor = await doctorModel.findOne({ DoctorEmail: DoctorEmail });
        if (existingDoctor) {
            return res.status(400).json({ message: "Doctor already exists" });
        }
        //hash
        if (!DoctorPwd) {
            return res.status(400).json({ message: "Please provide a password" });
        }
        const hashedPassword = await bcrypt.hash(DoctorPwd, 5);


        console.log(DoctorPwd);

        //doctor create
        const result = await doctorModel.create({
            DoctorName: DoctorName,
            DoctorEmail: DoctorEmail,
            DoctorPwd: hashedPassword,
            DoctorPhone: DoctorPhone,
            Specialisation: Specialisation,
            Fees: Fees,
            Designation: Designation,
            YOE: YOE,
            Location: Location
        });
        //console.log(hashedPassword)   
        console.log("Doctor created successfully !!!!")
        res.status(201).json({ user: result });
        //token
        //  const token = jwt.sign({ email: result.email, userId: result._id }, SECRET_KEY);
        // res.status(201).json({ user: result, token: token });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "something went wrong while sign up" });

    }


}

//Doctor sign in
const signin = async (req, res) => {
    const { DoctorEmail, DoctorPwd } = req.body;
    try {
        const existingDoctor = await doctorModel.findOne({ DoctorEmail: DoctorEmail });
        if (!existingDoctor) {
            return res.status(404).json({ message: "User Not Found" });
        }
        const matchPassword = await bcrypt.compare(DoctorPwd, existingDoctor.DoctorPwd);
        if (!matchPassword) {
            return res.status(400).json({ message: "invalid credentials" });
        }
        //token
        const token = jwt.sign({ email: existingDoctor.email, doctorId: existingDoctor._id }, SECRET_KEY);
        res.status(201).json({ user: existingDoctor, token: token });
        console.log("singn in successfull !!!" + "WELCOME");




    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "something went wrong" });


    }

}
//get doctor by id (id taken from doctor token )
// doctor can retrievr all appoints booked by doctor id (taken automatically from token of doctor)
const getappointments = async (req, res) => {
    const Drid = req.doctorid;
    console.log("ye hai drid  "  +Drid );
    
    try {
        

        const appointments = await appointmentModel.find({
            DoctorId: Drid,
            
        });

        console.log(`Found ${appointments.length} appointments`);
        console.log(`These the the appointments for your Doctor Id = ${Drid}`);

        res.status(200).json({message : "appointments fetched successfully",appointmentList :appointments});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Can't fetch appointments" });
    }
};

//Update  appointment status
const updateAppointment = async (req,res)=>{
    const id =req.params.id;
    const {Status ,Meetlink  ,Time}=req.body;
    const updatedappointment={
        Status:Status,
        Meetlink:Meetlink,
        Time :Time,
       
    }
    try{
        await appointmentModel.findByIdAndUpdate(id , updatedappointment ,{new :true});
        res.status(200).json({message :"Appointment Updated Successfully !!!", updatedappointment : updatedappointment});
    } catch(error){
        console.log(error);
        res.status(500).json({message :"Can't update appointment.........."});
    }

}

// Doctor Updates appointment schema by proving prescription and appointment status ="Done" by cheching patient id
//Update  appointment status
const updatePrescription = async (req,res)=>{
    const id =req.params.id;
    const {Status , Prescription}=req.body;
    const updatedprescription={
        Status:Status,
        Prescription: Prescription
        
       
    }
    try{
        await appointmentModel.findByIdAndUpdate(id , updatedprescription ,{new :true});
        res.status(200).json({message :"Prescription Updated Successfully !!!", updatedprescription : updatedprescription});
    } catch(error){
        console.log(error);
        res.status(500).json({message :"Can't update prescription .........."});
    }

}


module.exports = { signin, signup, getappointments ,updateAppointment ,updatePrescription};

