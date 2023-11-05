const express = require("express");
const { user, getProfile } = require("../Controller/ProfileConroller");
const { authToken } = require("../Moddleware/auth");
const { upload } = require("../utils/ImageUpload");
const router = express.Router();


router.post("/user",authToken,upload.single("profile"),user)
router.get("/getprofile",authToken,getProfile)





module.exports=router;