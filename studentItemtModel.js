
const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({

    itemName: {type:String, require:true},
    description: {type:String, require:true},
    locationFound:{type:String, require:true},
    dateFound: {type:Date, require:true},
    claimed: {type:Boolean, default:false},
}, {timestamps:true},)

  const StudentItem = new mongoose.model("StudentItem", studentSchema) 

  module.exports = StudentItem