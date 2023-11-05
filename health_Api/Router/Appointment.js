const express = require("express");
const { newAppoint, getAppointment, deleteAppointment, getAllAppointment, getOneUserAppointment, todayAppointment } = require("../Controller/Appointment");
const { authToken } = require("../Moddleware/auth");
const router = express.Router();
const { admin } = require("../Moddleware/Admin");

router.post("/new",authToken,newAppoint)
router.get("/get",authToken,getAppointment)
router.get("/getAllAppointment",authToken,getAllAppointment)
router.get("/getOneUseAppointment",authToken,getOneUserAppointment)
router.delete("/delete/:id",authToken,deleteAppointment)
router.get("/getTodayAppointment",authToken,admin,todayAppointment)
module.exports=router