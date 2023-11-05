const Joi = require("joi");
const mongoose = require("mongoose");


const doctorSchema = mongoose.Schema({
    doctorName:{type:String,required:true},
    mobileNumber:{type:Number,required:true},
    specialist:{type:mongoose.Types.ObjectId,ref:"AppointData",required:true},
    // totalRating:[{
    //     userId:{type:mongoose.Types.ObjectId,ref:'user'},
    //     rating:{type:Number,default:0, required:true}
    // }],
    rating:{type:Number,default:0, required:true},
    days:{type:String,required:true},
    doctorImage:{type:String,required:true}
})

const doctorModel = new mongoose.model("doctors",doctorSchema )

const validDoctor = (data)=>{
    const schema = Joi.object({
        doctorName:Joi.string().required(),
        mobileNumber:Joi.string().length(10).required(),
        specialist:Joi.string().required(),
        days:Joi.string().required()
    })
    return schema.validate(data,{ abortEarly: false, errors: { label: 'key', wrap: { label: false } } })
}

module.exports={doctorModel,validDoctor}