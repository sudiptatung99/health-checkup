const express = require("express");
const { appointmentData, getAppoint, deleteData } = require("../Controller/AppointData");
const router = express.Router();
const cloudinary = require("cloudinary");
const { upload } = require("../utils/ImageUpload");
const { authToken } = require("../Moddleware/auth");
const cookieparser = require("cookie-parser");
const { admin } = require("../Moddleware/Admin");

router.use(cookieparser());

cloudinary.config({
    cloud_name: "dloexgbly",
    api_key: "641629254969812",
    api_secret: "LSPauqGjSCaeO2lzeqRRg3wue7k",
});


router.post("/appoint",authToken,admin,upload.single("appointImage"), appointmentData);
router.get("/getAppoint",getAppoint)
router.delete("/deleteData/:id",deleteData)








module.exports=router;