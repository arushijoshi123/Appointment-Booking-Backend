const patientModel = require("../models/patient");
const doctorModel = require("../models/doctor");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const patientauth = require("../middlewares/auth");
const appointmentModel = require("../models/appointments");


const SECRET_KEY = "HOSPITAL";

// Patient signup
const signup = async (req, res) => {
    //Existing user check
    //hashed password
    //user creation 
    //token generate
    const { PatientName, PatientPhone, PatientEmail ,PatientPwd ,PatientAge,PatientAddress,PatientGender} = req.body;
    try {
        const existingPatient = await patientModel.findOne({ PatientEmail:PatientEmail });
        if (existingPatient) {
            return res.status(400).json({ message: "patient already exists" });
        }
        //hash
        const hashedPassword = await bcrypt.hash(PatientPwd, 5);

        //patient create
        const result = await patientModel.create({
            PatientName:PatientName,
            PatientEmail : PatientEmail,
            PatientPwd: hashedPassword,
            PatientPhone: PatientPhone,
            PatientAge : PatientAge,
            PatientAddress :PatientAddress,
            PatientGender:PatientGender,
            
           });
         console.log("Patient Registered successfully !!!!")
         res.status(201).json({ user: result });
        //token
      //  const token = jwt.sign({ email: result.email, userId: result._id }, SECRET_KEY);
       // res.status(201).json({ user: result, token: token });
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "something went wrong while patient sign up" });

    }


}

//patient sign in
const signin = async (req, res) => {
    const { PatientEmail, PatientPwd } = req.body;
    try {
        const existingPatient = await patientModel.findOne({ PatientEmail:PatientEmail });
        if (!existingPatient) {
            return res.status(404).json({ message: "Patient Not Found" });
        }
        const matchPassword = await bcrypt.compare(PatientPwd, existingPatient.PatientPwd);
        if (!matchPassword) {
            return res.status(400).json({ message: "invalid patient  credentials" });
        }
        //token
        const token = jwt.sign({ email: existingPatient.email, patientId: existingPatient._id }, SECRET_KEY);
        res.status(201).json({ user: existingPatient, token: token });




    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "something went wrong with patient sign in " });


    }

}

//get doctors  
// function where patient can retrieve doctors from database by specifying location :"" and specialisation :""
const getdr = async (req, res) => {
    const {Specialisation ,Location}=req.body;
    try {
        //console.log("Request:", req);

        const doctors = await doctorModel.find({
            Specialisation: Specialisation,
            Location: Location,
        });

        console.log(`Found ${doctors.length} doctors`);
        console.log(`Search criteria: Specialisation = ${Specialisation}, Location = ${Location}`);
        console.log("Doctors:", doctors);
        res.status(200).json(doctors);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Can't fetch doctors" });
    }
};

// get  history of patient appointments

const getpatientapphistory = async (req, res) => {
    const Patient = req.patientid;//patient id auto fetched from auth
    console.log("patientid "+ Patient);
    
    try {
        

        const appointments = await appointmentModel.find({
            PatientId :Patient ,
            
        });

        console.log(`Your Appointment History has ${appointments.length} appointments`);
        
        res.status(200).json({message : "Appointment History  fetched successfully", appointmentList :appointments});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Can't fetch Appointment History" });
    }
};







module.exports = { signin, signup,getdr ,getpatientapphistory};