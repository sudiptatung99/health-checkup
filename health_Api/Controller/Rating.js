const { doctorModel } = require("../Model/Doctors");
const { ratingModel } = require("../Model/Rating");
const { userModel } = require("../Model/UserModel")

exports.rating = async (req, res) => {
    try {
        const userData = await userModel.findOne({ _id: req.user._id })
        if (!userData) {
            return res.status(400).json("You are not authenticate");
        }
        const doctorId = await doctorModel.findOne({ _id: req.body.doctorId })
        if (!doctorId) {
            return res.status(400).json("Doctor not valid");
        }
        const rating = await ratingModel.findOne({ doctorId: doctorId._id, userId: userData._id })
        if (rating) {
            const updateRating = await ratingModel.findByIdAndUpdate(rating._id, {
                rating: req.body.data
            })
            const getrating = await ratingModel.find({ doctorId: doctorId._id })
            var totlaRating = 0;
            for (let i = 0; i < getrating.length; i++) {
                const e = getrating[i];
                totlaRating=totlaRating+e.rating
            }
            var actualRating = totlaRating/getrating.length
            const updateDoctor = await doctorModel.findByIdAndUpdate(doctorId._id,{
                rating:actualRating
            })
            res.status(200).json("rating generated")
        } else {
            const rating = await ratingModel.create({
                doctorId: doctorId._id,
                userId: userData._id,
                rating: req.body.data
            })
            const getrating = await ratingModel.find({ doctorId: doctorId._id })
            var totlaRating = 0;
            for (let i = 0; i < getrating.length; i++) {
                const e = getrating[i];
                totlaRating=totlaRating+e.rating
            }
            var actualRating = totlaRating/getrating.length
            const updateDoctor = await doctorModel.findByIdAndUpdate(doctorId._id,{
                rating:actualRating
            })
            res.status(200).json("rating generated")
        }
    } catch (err) {
        res.status(400).json("error occurs");
    }
}