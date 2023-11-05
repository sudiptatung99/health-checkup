const express = require("express");
const { createDoctor, getDoctor } = require("../Controller/Doctor");
const { admin } = require("../Moddleware/Admin");
const { authToken } = require("../Moddleware/auth");
const router = express.Router();
const { upload } = require("../utils/ImageUpload");

router.post("/newDoctor",authToken,admin,upload.single("doctorImage"),createDoctor)
router.get("/doctor",getDoctor)


module.exports=router;