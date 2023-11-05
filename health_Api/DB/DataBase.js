const mongoose = require("mongoose");

const dataBase = ()=>{
    mongoose.connect("mongodb://localhost:27017/healthy_Life")
    .then(()=>console.log("DB connected successful"))
    .catch(()=>console.log("Sorry not connect DB"))
}
module.exports=dataBase;