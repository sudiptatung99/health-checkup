const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    firstName: { type: String, require: true, maxlength: 30, minlength: 3 },
    lastName: { type: String, required: true, maxlength: 30, minlength: 3 },
    email: { type: String, required: true, required: true },
    password: { type: String, required: true, maxlength: 50, minlength: 8 },
    isAdmin: { type: String, default: "user", enum: ['admin', 'user'] },
    accessToken: { type: String, default: false,require: true },
    verify: { type: String, default: false,require: true },
    image: [{
        url: {type:String,default:false,require: true},
        public_id: {type:String,default:false,require: true}
    }]
})

const userOtp = new mongoose.Schema({
    otp: { type: Number, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user",require: true },
    expire: { type: Date, require: true },
    date: { type: Date, default: Date.now }
})
const otpModel = new mongoose.model('otp', userOtp);

userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.getToken = function () {
    const token = jwt.sign({ _id: this._id, firstName: this.firstName, isAdmin: this.isAdmin, verify: this.verify }, process.env.JWT_TOKEN,
        { expiresIn: '24h' }
    );
    return token;
}


const userModel = new mongoose.model("user", userSchema)

const validateUser = (user) => {
    const schema = Joi.object({
        firstName: Joi.string().regex(/^[a-zA-Z]+$/).max(30).min(3).required().messages({
            "string.pattern.base": "You Should be type only text"
        }),
        lastName: Joi.string().regex(/^[a-zA-Z]+$/).min(3).max(30).required().messages({
            "string.pattern.base": "You Should be type only text"
        }),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(50).required().regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/).messages({
            "string.pattern.base": "Password must be one letter, one number and one special character"
        })
    })
    return schema.validate(user, { abortEarly: false, errors: { label: 'key', wrap: { label: false } } })
}

const validateLoginUser = (user) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(50).required()
    })
    return schema.validate(user, { abortEarly: false, errors: { label: 'key', wrap: { label: false } } })
}



module.exports = { userModel, validateUser, validateLoginUser, otpModel }