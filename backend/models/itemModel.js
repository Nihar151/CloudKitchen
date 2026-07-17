const mongoose = require("mongoose")

const Schema = mongoose.Schema

const itemSchema = new Schema({
    food:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    }
}, {timestamps:true})

module.exports = mongoose.model("Item", itemSchema)