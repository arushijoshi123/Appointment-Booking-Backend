const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config()
//require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;
const doctorauth = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (token) {
            console.log("HTTP METHOD" + req.method + "url" + req.url);
            token = token.split(" ")[1];
            console.log(token);
            let verify = jwt.verify(token, SECRET_KEY);


            req.doctorid = verify.doctorId;

            req.DoctorEmail = verify.email;

        }
        else {
            console.log(token);
            res.status(401).json({ message: "token not available ......" });
        }
        next();

    }
    catch (error) {
        console.log(error.message);
        console.log(token);
        res.status(401).json({ message: "false token....." });
    }


}
//Authorisation of patient

const patientauth = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (token) {
            console.log("HTTP METHOD" + req.method + "url" + req.url);
            token = token.split(" ")[1];
            console.log(token);
            let verify = jwt.verify(token, SECRET_KEY);


            req.patientid = verify.patientId;

            req.PatientEmail = verify.email;

        }
        else {
            console.log(token);
            res.status(401).json({ message: "token not available ......" });
        }
        next();

    }
    catch (error) {
        console.log(error.message);
        console.log(token);
        res.status(401).json({ message: "false token....." });
    }


}
module.exports = {doctorauth ,patientauth};