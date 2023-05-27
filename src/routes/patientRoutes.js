const express =require("express");
const patientController= require("../controllers/patientController");
const appointmentController =require("../controllers/appointmentController");
const patientauth =require("../middlewares/auth");
const patientRouter = express.Router();
patientRouter.post("/signup",patientController.signup);
patientRouter.post("/signin",patientController.signin);
patientRouter.post("/getdr",patientauth.patientauth,patientController.getdr);
patientRouter.post("/bookappointment",patientauth.patientauth,appointmentController.bookappointment);
patientRouter.get("/appointmenthistory",patientauth.patientauth,patientController.getpatientapphistory);

module.exports = patientRouter;