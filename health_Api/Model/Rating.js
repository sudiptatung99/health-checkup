const mongoose = require("mongoose");

const ratingSchema = mongoose.Schema({
    doctorId:{type:mongoose.Schema.Types.ObjectId, ref:"doctors ",required:true},
    userId:{type:mongoose.Schema.Types.ObjectId, ref:"user",required:true},
    rating:{type:Number,required:true}
})

const ratingModel = new mongoose.model('rating',ratingSchema);

module.exports={ratingModel}