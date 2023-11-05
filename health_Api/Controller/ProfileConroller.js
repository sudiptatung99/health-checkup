const { validProfile, profileModel } = require("../Model/Profile");
const { userModel } = require("../Model/UserModel");
const cloudinary = require("cloudinary");



exports.user = async (req, res) => {

    const { firstName, lastName, email, phoneNumber, address, district, pinCode, profile } = req.body
    const { error } = validProfile({ firstName, lastName, email, phoneNumber, address, district, pinCode })
    if (error) {
        return res.status(400).json({
            data: false,
            message: error.details
        });
    }
    const userData = await userModel.findOne({ _id: req.user._id })
    if (!userData) {
        return res.status(400).json({
            message: "user not valid"
        });
    }
    const profileData = await profileModel.findOne({ userId: userData._id })
    if (!req.file) {
        const user = await userModel.findByIdAndUpdate(userData._id, {
            firstName: firstName,
            lastName: lastName
        })

        if (profileData) {
            await profileModel.findByIdAndUpdate(profileData._id, {
                phoneNumber, address, district, pinCode
            })
            res.status(200).json("update successfully")
        } else {
            const profile = await profileModel.create({
                userId: userData._id,
                phoneNumber, address, district, pinCode
            })
            res.status(200).json(profile)
        }
    } else {
        if (userData.image.length !== 0) {
            await cloudinary.v2.uploader.destroy(userData.image[0].public_id)
        }
        const result = await cloudinary.v2.uploader.upload(req.file.path)

        const public = result.public_id;
        const url = result.url
        const user = await userModel.findByIdAndUpdate(userData._id, {
            firstName: firstName,
            lastName: lastName,
            image: {
                public_id: public,
                url: url

            }

        })
        if (profileData) {
            await profileModel.findByIdAndUpdate(profileData._id, {
                phoneNumber, address, district, pinCode
            })
            res.status(200).json("update successfully")
        } else {
            const profile = await profileModel.create({
                userId: userData._id,
                phoneNumber, address, district, pinCode
            })
            res.status(200).json(profile)
        }


    }
}


exports.getProfile = async (req, res) => {
    try {
        const userData = await userModel.findOne({ _id: req.user._id })
        if (!userData) {
            return res.status(400).json({
                message: "user not valid"
            });
        }
        const profile = await profileModel.findOne({ userId: userData._id }).populate("userId")
        res.status(200).json(profile)
    } catch (err) {
        res.status(400).json("error")
    }
}