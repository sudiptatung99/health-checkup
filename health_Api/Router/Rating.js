const express = require("express");
const { rating } = require("../Controller/Rating");
const { authToken } = require("../Moddleware/auth");
const router = express.Router()

router.post("/rating",authToken,rating)




module.exports=router;