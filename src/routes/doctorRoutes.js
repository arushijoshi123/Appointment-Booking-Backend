const express =require("express");
const doctorController= require("../controllers/doctorController");
const doctorauth = require("../middlewares/auth");
const doctorRouter = express.Router();
doctorRouter.post("/signup",doctorController.signup);
doctorRouter.post("/signin",doctorController.signin);
doctorRouter.get("/getappointments",doctorauth.doctorauth,doctorController.getappointments);
doctorRouter.put("/updateappointment/:id",doctorauth.doctorauth,doctorController.updateAppointment);//
doctorRouter.put("/updateprescription/:id",doctorauth.doctorauth,doctorController.updatePrescription);//appointment id

module.exports = doctorRouter;