
const { validateUser, userModel, validateLoginUser, otpModel } = require("../Model/UserModel");
const bcrypt = require("bcrypt");
const { sendEmail } = require("../utils/sendMail");
const _ = require("lodash")


exports.register = async (req, res) => {
    try {
        const { error } = validateUser(req.body)
        if (error) {
            return res.status(400).json({
                message: false,
                data: error.details
            })
        }
        const fakeUser = await userModel.findOne({ email: req.body.email, verify: false });
        const isSame = await userModel.findOne({ email: req.body.email, verify: true });
        if (isSame) {
            return res.status(400).json({
                message: false,
                errorMessage: "Username and password already exist"
            })
        } else {
            if (fakeUser) {
                await userModel.findByIdAndRemove({ _id: fakeUser._id })
                var otpGenerate = Math.random();
                otpGenerate = otpGenerate * 1000000;
                otpGenerate = parseInt(otpGenerate);
                const userData = await userModel.create(req.body);
                const otp = await otpModel.create({ otp: otpGenerate, userId: userData._id, expire: Date.now() + 2 * 60 * 1000 })
                sendEmail(req.body.email, otp.otp);
                const token = await userData.getToken();
                res.status(200).header("authToken", token).json({
                    message: true,
                    data: {
                        token: token,
                        message: "Email send to your mail Account"
                    }
                })
            } else {
                var otpGenerate = Math.random();
                otpGenerate = otpGenerate * 1000000;
                otpGenerate = parseInt(otpGenerate);
                const userData = await userModel.create(req.body);
                const otp = await otpModel.create({ otp: otpGenerate, userId: userData._id, expire: Date.now() + 2 * 60 * 1000 })
                sendEmail(req.body.email, otp.otp);
                const token = await userData.getToken();
                res.status(200).header("authToken", token).json({
                    message: true,
                    data: {
                        token: token,
                        message: "Email send to your mail Account"
                    }
                })
            }
        }
    } catch (err) {
        res.status(400).send(err)

    }
}



exports.verify = async (req, res) => {

    try {
        const { otp } = req.body;
        if (!otp) {
            return res.status(203).json("Please enter OTP")
        }
        const user = await otpModel.findOne({ userId: req.params.id })
        if (!user) {
            return res.status(203).json("invalid Link")
        }
        if (user.expire < Date.now()) {
            await otpModel.findByIdAndRemove(user._id)
            res.status(203).send("OTP has been expired")
        }
        if (user.otp == otp) {
            await userModel.findByIdAndUpdate({ _id: req.params.id }, { verify: true })
            await otpModel.findByIdAndRemove(user._id)
            res.status(200).json({
                message: "Email verify Successfully"
            })
        } else {
            res.status(203).json("please valid otp")
        }
    } catch (err) {
        res.status(400).json({
            message: err
        })
    }
}


exports.reSendOtp = async (req, res) => {
    try {
        var otpGen = Math.random();
        otpGen = otpGen * 1000000;
        otpGen = parseInt(otpGen);
        const user = await userModel.findOne(req.body);
        const onetimeotp = await otpModel.findOne({ userId: user.id });
        if (onetimeotp) {
            await otpModel.findByIdAndRemove(onetimeotp._id);
        }

        const otp = await otpModel.create({
            userId: user._id,
            otp: otpGen,
            expire: Date.now() + 2 * 60 * 1000
        })
        sendEmail(user.email, otp.otp)
        res.status(200).json({
            message: "OTP Resend to your Email Account"
        });

    } catch (err) {
        res.send(err)
    }
}


exports.login = async (req, res) => {
    try {
        const { error } = validateLoginUser(req.body);
        if (error) {
            return res.status(400).json({
                message: false,
                data: error.details
            })
        }
        const fakeUser = await userModel.findOne({ email: req.body.email, verify: false });
        if (fakeUser) {
            await userModel.findByIdAndRemove({ _id: fakeUser.id })
            return res.status(400).json({
                message: false,
                errorMessage: "please register"
            })
        }
        const userData = await userModel.findOne({ email: req.body.email, verify: true });
        if (!userData) {
            return res.status(400).json({
                message: false,
                errorMessage: "Invalid email and password"
            })
        }

        const isPassword = await bcrypt.compare(req.body.password, userData.password)
        if (!isPassword) {
            return res.status(400).json({
                message: false,
                errorMessage: "Invalid email and password"
            })
        }
        const token = await userData.getToken();
        res.status(200).header("auth_token", token,).json({
            message: true,
            data: token
        })
    } catch (err) {
        res.status(400).json(err)
    }

}

exports.googleRegister = async (req, res) => {
    try {
        const isSame = await userModel.findOne({ email: req.body.email });
        if (isSame) {
            return res.status(400).json({
                message: false,
                errorMessage: "Email Id Already Exist"
            })
        } else {
            const userData = await userModel.create(req.body);
            const token = await userData.getToken();
            res.status(200).header("auth_token", token).json({
                message: true,
                data: {
                    token: token,
                    message: "Successfully Register"
                }
            })

        }
    } catch (err) {
        res.status(400).json(err)
    }
}

exports.getUser = async (req, res) => {
    try {
        const userData = await userModel.findOne({ _id: req.user._id }).select('-password');
        if (!userData) {
            return res.status(400).json({
                data: false,
                message: "Please Log in"
            })
        }
        res.status(200).json(userData)
    } catch (err) {
        res.status(400).json(err)
    }
}
exports.alluser = async (req, res) => {
    try {
        const userData = await userModel.find({ isAdmin: "user" }).select('-password')

        res.status(200).send(userData);
    } catch (err) {
        res.status(400).send("error user")
    }
}
exports.sendEmail = async (req, res) => {
    try {
        const userEmail = await userModel.findOne(req.body)
        if (!userEmail) {
            return res.status(400).send("Enter valid email")
        }
        console.log(userEmail.accessToken);
        if (userEmail.accessToken === "false") {
            const otps = await otpModel.findOne({ userId: userEmail.id })
            if (!otps) {
                var otpGenerate = Math.random();
                otpGenerate = otpGenerate * 1000000;
                otpGenerate = parseInt(otpGenerate);
                const otp = await otpModel.create({ otp: otpGenerate, userId: userEmail._id, expire: Date.now() + 2 * 60 * 1000 })
                sendEmail(req.body.email, otp.otp);
                res.status(200).send("OTP send to your email")
            } else {
                await otpModel.findByIdAndRemove(otps._id)
                var otpGenerate = Math.random();
                otpGenerate = otpGenerate * 1000000;
                otpGenerate = parseInt(otpGenerate);
                const otp = await otpModel.create({ otp: otpGenerate, userId: userEmail._id, expire: Date.now() + 2 * 60 * 1000 })
                sendEmail(req.body.email, otp.otp);
                res.status(200).send("its ok")
            }
        } else {
            res.status(400).send("Please login with google ")

        }

    } catch (err) {
        res.status(400).send(err)
    }

}
exports.optValid = async (req, res) => {
    try {
        const userEmail = await userModel.findOne({ email: req.body.email }).select('-password')
        const otp = await otpModel.findOne({ userId: userEmail.id })
        if (req.body.otp == otp.otp) {
            if (otp.expire < Date.now()) {
                await otpModel.findByIdAndRemove(otp._id)
                res.status(400).send("OTP has been expired")
            } else {
                res.status(200).send(otp)
            }

        } else {
            res.status(400).send("Please enter valid OTP")
        }
    } catch (err) {
        res.status(400).send("error")
    }
}

exports.changePassword = async (req, res) => {
    console.log(req.body);
    const userEmail = await userModel.findOne({ email: req.body.email }).select('-password')
    if (!userEmail) {
        return res.status(400).send("Enter valid email")
    }
    const otp = await otpModel.findOne({ userId: userEmail.id })
    if (!otp) {
        return res.status(400).send("Enter valid otp")
    }
    if (req.body.otp == otp.otp) {
        if (otp.expire < Date.now()) {
            await otpModel.findByIdAndRemove(otp._id)
            res.status(203).send("OTP has been expired")
        } else {
            const passwordEncrypt = await bcrypt.hash(req.body.password, 10)
            await userModel.findByIdAndUpdate({ _id: userEmail.id }, { password: passwordEncrypt })
            await otpModel.findByIdAndRemove(otp._id)
            res.status(200).send("Password Successfully Change")
        }
    }

}



// exports.user = async(req,res)=>{
//     try{
//        const userData = await userModel.findOne({_id:req.user._id}).select('-password')
//        res.status(200).json(userData)
//     }catch(err){
//         res.status(400).json("user not valid")
//     }
// }