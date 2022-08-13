const { Schema, model } = require("mongoose")

const claseActiva = new Schema({
  idClase: { type: Schema.Types.ObjectId, ref: "Classes" },
  idStudent: { type: Schema.Types.ObjectId, ref: "Students" }, 
},{
  versionKey: false
})

module.exports = model("ClassesActivas", claseActiva)