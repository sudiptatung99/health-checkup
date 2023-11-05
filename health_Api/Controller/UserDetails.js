


const { makeAppointModel } = require("../Model/Appointment")
const { userModel } = require("../Model/UserModel")

exports.userDetails=async(req,res)=>{
    try{
        const user = await userModel.find().select('-password')
        if(!user){
            res.status(400).send('User not valid')
        }
        res.status(200).send(user)
    }catch(err){
        res.status(400).send('error')
    }

}
exports.singleUserDetail=async(req,res)=>{
    try{
        const user = await userModel.findOne({_id:req.params.id})
        const getAppointment = await makeAppointModel.find({ userId: user._id }).populate("userId","-password").populate({
            path: "doctorId",
            populate: [
                { path: "specialist" }
            ]
        })
        if(!getAppointment){
            return res.status(400).send("NO appointment")
        }
        res.status(200).send(getAppointment)
    }catch(err){
        res.status(400).send('error')
    }
}