const { Schema, model } = require("mongoose") 

const teachers = new Schema({
  name: { type: String, required: true },
  email: { type: String, requried: true, unique: true },
  createdAt: { type: Date, immutable: true, default: new Date() },
  updateAt: { type: Date, default: new Date() }
})

module.exports = model("Teachers", teachers)