const cloudinary = require("cloudinary");
const { validDoctor, doctorModel } = require("../Model/Doctors");


exports.createDoctor = async (req, res) => {
    try {
        const data = await doctorModel.findOne({doctorName:req.body.doctorName})
        if(data){
            return res.status(400).json("Doctor Name Already Exist")
        }
        const { doctorName, mobileNumber, specialist, days } = req.body
        const { error } = validDoctor({
            doctorName,
            mobileNumber,
            specialist,
            days,
        })
        if (error) {
            return res.status(400).json({
                data: false,
                message: error.details
            })
        }
        if (!req.file) {
            return res.status(400).json("Select a valid image")
        }
        const result = await cloudinary.v2.uploader.upload(req.file.path)

        const doctorData = await doctorModel.create({
            doctorName,
            mobileNumber,
            specialist,
            days,
            doctorImage: result.url
        })
        res.status(200).json({
            data: true,
            message: doctorData
        })
    } catch (err) {
        res.status(400).json("error")
    }
}

exports.getDoctor = async (req, res) => {
    try {
        const doctorData = await doctorModel.find().sort("name").populate("specialist")
        res.status(200).json({
            data: doctorData
        })
    } catch (err) {
        res.json(err)
    }
}