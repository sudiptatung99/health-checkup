const express = require("express");
const dataBase = require("./DB/DataBase");
const app = express();
const user = require("./Router/userRouter");
const appoint = require("./Router/ApppointData");
const appointment = require("./Router/Appointment");
const userDetails = require('./Router/UserDetails')
const cloudinary = require("cloudinary");
const doctor = require("./Router/Doctor")
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { authToken } = require("./Moddleware/auth");
const profile = require("./Router/Profile")
const rating = require("./Router/Rating")
dataBase();
app.use(cookieParser());
app.use(cors());
app.use(express.json());
cloudinary.config({
    cloud_name: "dloexgbly",
    api_key: "641629254969812",
    api_secret: "LSPauqGjSCaeO2lzeqRRg3wue7k",
});
app.get("/protect",authToken,async (req,res)=>{
    try{
      res.status(200).json(req.user._id)
    }catch(err){
        res.status(400).json("error occure")
    }
})
app.use("/user",user);
app.use("/doctor",doctor);
app.use("/appointData",appoint);
app.use("/appointment",appointment);
app.use('/userDetails',userDetails)
app.use("/profile",profile)
app.use("/rating",rating)
app.listen(5000,()=>{
    console.log("Server start http://localhost:5000");
})
