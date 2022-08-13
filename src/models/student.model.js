const mongoose = require("mongoose")

const student = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  address: String,
  email: { 
    unique: true, 
    type: String,
    required: [true, "Este campo es requerido"],
  },
},{
  versionKey: false
})

module.exports = mongoose.model("Students", student)