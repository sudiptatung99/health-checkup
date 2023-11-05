const Joi = require("joi");
const mongoose = require("mongoose");


const appointDataSchema = mongoose.Schema({
    appointImage: [{
        url: {type:String,default:false,require: true},
        public_id: {type:String,default:false,require: true}
    }],
    appointName:{type:String,required:true},
    description:{type:String,required:true}
    // doctorImage:{type:String,required:true},
    // doctorName:{type:String,required:true},
    // doctorPhoneNumber:{type:String,required:true},
    // doctorEmail:{type:String,required:true},
    // day:{type:String,required:true}
})

const appointModel = new mongoose.model("AppointData",appointDataSchema )

const valid = (appointMent)=>{
const schema = Joi.object({
    appointName:Joi.string().required(),
    description:Joi.string().required(),
})
return schema.validate(appointMent,{ abortEarly: false, errors: { label: 'key', wrap: { label: false } } })
}

module.exports = {valid,appointModel}