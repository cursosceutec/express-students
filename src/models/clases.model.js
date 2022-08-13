const { Schema, model } = require("mongoose")

const clases = new Schema({
  name: String,
  section: Number, 
},{
  versionKey: false
})

module.exports = model("Classes", clases)