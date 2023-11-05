const Joi = require("joi");
const mongoose = require("mongoose");


const profileSchema = new mongoose.Schema({
    userId: { type:mongoose.Schema.Types.ObjectId,ref:"user", required: true },
    phoneNumber:{type:Number,length:10,required:true},
    address:{type:String,required:true},
    district:{type:String,required:true},
    pinCode:{type:String,length:6,required:true}
})

const profileModel=new mongoose.model('profile',profileSchema);

const validProfile=(data)=>{
    const schema=Joi.object({
        firstName:Joi.string().required().min(3).max(30),
        lastName:Joi.string().required().min(3).max(30),
        email:Joi.string().email().required(),
        phoneNumber:Joi.number().integer().min(10**9).max(10 ** 10-1).required().messages({
            'number.min': 'Mobile number should be 10 digit.',
            'number.max': 'Mobile number should be 10 digit'
        }),
        address:Joi.string().required(),
        district:Joi.string().required(),
        pinCode:Joi.number().integer().min(10**5).max(10 ** 6-1).required().messages({
            'number.min': 'pin code number should be 6 digit.',
            'number.max': 'pin code number should be 6 digit'
        }),
    })
    return schema.validate(data,{abortEarly:false,errors:{label:'key',wrap:{label:false}}})
}

module.exports={profileModel,validProfile}