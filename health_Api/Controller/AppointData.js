const cloudinary = require("cloudinary");
const { result } = require("lodash");
const { valid, appointModel } = require("../Model/AppointmentData");

exports.appointmentData = async (req, res) => {
    try {
        const data = await appointModel.findOne({ appointName: req.body.appointName })
        if (data) {
            return res.status(400).json("service name already exist");
        }
        const { error } = valid({
            appointName: req.body.appointName,
            description: req.body.description,
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
        const public = result.public_id;
        const url = result.url
        const appointData = await appointModel.create({
            appointName: req.body.appointName,
            description: req.body.description,
            appointImage: {
                public_id: public,
                url: url

            }
        })
        res.status(200).json({
            data: true,
            message: appointData
        })
    } catch (err) {
        res.status(400).json({ data: "error" })
    }

}

exports.getAppoint = async (req, res) => {
    try {
        const appointData = await appointModel.find().sort("name")
        const data=appointData.slice(0,4)
        res.status(200).json({
            data: data
        })
    } catch (err) {
        res.status(400).json(err)
    }
}

exports.deleteData=async(req,res)=>{
    const service = await appointModel.findOne({_id:req.params.id})
    await cloudinary.v2.uploader.destroy(service.appointImage[0].public_id)
    await appointModel.findByIdAndRemove(service._id)
    res.status(200).send("successfully deleted")
}