const Joi = require("joi");
const mongoose = require("mongoose");

const appointSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "doctors", required: true },
    name: { type: String, required: true, maxlength: 15 },
    present:{type:Boolean,default:false,required:true},
    absent:{type:Boolean,default:false,required:true},
    number: { type: Number, required: true, maxlength: 10, minlength: 10 },
    notification:{type:Boolean,default:false,required:true},
    time:{type:String,required:true},
    date: { type: Date, required: true },
    address: { type: String, required: true, maxlength: 100 },
})

const makeAppointModel = new mongoose.model("appointment", appointSchema);


const validAppoint = (appointment) => {
    const schema = Joi.object({
        doctorId:Joi.string().required(),
        name: Joi.string().min(3).max(15).required(),
        number: Joi.string().length(10).required().messages({
            "string.empty": "Phone Number is not allowed to be empty",
            "string.length": "Phone number must be 10 digit long",

        }),
        date: Joi.date().required(),
        time:Joi.string().required(),
        address: Joi.string().max(100).required()
    })
    return schema.validate(appointment, { abortEarly: false, errors: { label: "key", wrap: { label: false } } })
}

module.exports = { validAppoint, makeAppointModel }