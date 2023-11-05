const moment = require("moment/moment");
const { validAppoint, appointModel, makeAppointModel } = require("../Model/Appointment");
const { doctorModel } = require("../Model/Doctors");
const { userModel } = require("../Model/UserModel");
const { appointmentData } = require("./AppointData");


exports.newAppoint = async (req, res) => {
    try {
        const { error } = validAppoint(req.body);
        if (error) {
            return res.status(203).json(error.details)
        }
        const userData = await userModel.findOne({ _id: req.user._id })
        if (!userData) {
            return res.status(203).json({ errorData: "user not valid" })
        }
        const { name, number, date, time, address, doctorId } = req.body
        const doctordata = await doctorModel.findById({ _id: doctorId })
        const id = doctordata._id
        const getAllAppointment = await makeAppointModel.find({ present: false })
        for (let i = 0; i < getAllAppointment.length; i++) {
            const data = getAllAppointment[i];
            if (data.time === time && moment(data.date).format('YYYY-MM-DD') === date && `${id}` == `${doctordata._id}`) {
                return res.status(203).json({ errorData: "Your Appointment slot already book" })
            }
        }

        const appointment = await makeAppointModel.find({ userId: userData._id, present: false })
        const length = appointment.length
        const array = appointment
        console.log(array);
        if (length == 0) {
            const appointment = await makeAppointModel.create({
                userId: userData._id,
                doctorId: doctorId,
                name: name,
                number: number,
                date: date,
                time: time,
                address: address
            })
            res.status(200).json(appointment)

        } else {
            for (let i = 0; i < length; i++) {
                const datas = array[i];
                console.log(datas);
                if (moment(datas.date).format('YYYY-MM-DD') == date) {
                    return res.status(203).json({ errorData: "Today You Are Already appointed" })
                }
            }
            const appointment = await makeAppointModel.create({
                userId: userData._id,
                doctorId: doctorId,
                name: name,
                number: number,
                date: date,
                time: time,
                address: address
            })
            res.status(200).json(appointment)
        }

    } catch (err) {
        res.status(400).json(err)
    }

}

exports.getAppointment = async (req, res) => {
    try {

        const getAppointment = await makeAppointModel.findOne({ userId: req.user._id, present: false }).sort({ date: 1 }).populate({
            path: "doctorId",
            populate: [
                { path: "specialist" }
            ]
        })
        res.status(200).json(getAppointment)
    } catch (err) {
        res.status(400).json(err)
    }

}

exports.getOneUserAppointment = async (req, res) => {
    try {
        const getappoint = await makeAppointModel.find({ userId: req.user._id }).populate({
            path: "doctorId",
            populate: [
                { path: "specialist" }
            ]
        })
        res.status(200).json(getappoint)
    } catch (err) {
        res.status(400).json(err)
    }

}

exports.getAllAppointment = async (req, res) => {
    try {
        const getAllAppointment = await makeAppointModel.find().sort({date:-1}).populate({
            path: "doctorId",
            populate: [
                { path: "specialist" }
            ]
        })
        res.status(200).json(getAllAppointment)
    } catch (err) {
        res.status(400).json("Not Found")
    }
}

exports.todayAppointment = async (req, res) => {
    const getAllAppointment = await makeAppointModel.find({ present: false }).sort('time').populate({
        path: "doctorId",
        populate: [
            { path: "specialist" }
        ]
    })
    if(!getAllAppointment){
        return res.status(400).json("Not appoint found")
    }
    var today = []
    for (let i = 0; i < getAllAppointment.length; i++) {
        const data = getAllAppointment[i];
        if (moment(data.date).format('YY-MM-DD') === moment(Date.now()).format('YY-MM-DD')) {
            today = [...today, data]
        }
    }
    if (today.length === 0) {
        return res.status(400).json("Today Not appoint any client")
    }else{
       return res.status(200).json(today)
    }
}

exports.deleteAppointment = async (req, res) => {
    try {
        const deleteData = await makeAppointModel.findByIdAndDelete({ _id: req.params.id })
        res.status(200).json({ message: "Data Successfully deleted" })
    } catch (err) {
        res.status(400).json(err)
    }
}