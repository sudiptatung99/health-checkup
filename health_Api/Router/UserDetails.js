const express=require('express');
const { userDetails, singleUserDetail } = require('../Controller/UserDetails');
const { admin } = require('../Moddleware/Admin');
const { authToken } = require('../Moddleware/auth');
const router=express.Router();

router.get("/user",userDetails)
router.post("/userallDetails/:id",singleUserDetail)


module.exports=router;