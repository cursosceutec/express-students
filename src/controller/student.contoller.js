const { response, request } = require('express');
const { Types } = require('mongoose');
const studenModel = require("../models/student.model")

//get
const getAllStudents =  async (req = request, res = response) => {
  let students1 = await studenModel.find()
  res.json(students1)
}

const getStudentById = async (req, res = response)=>{
  let id = req.params.id;

  if (id.length< 24){
    return res.json({
        error: {
            id: "El param id debe ser de 24 caracteres"
        }
    })
  }
  
  let student = await studenModel.findById(id)
  res.json(student);     
}

//post 
const createStudent = async (req, res)=>{
  let data = req.body

  try{
      const newStudent = new studenModel(data)
      const emailAlreadyExist = await studenModel.findOne({ email: data.email })

      if (emailAlreadyExist !== null) 
      return res.json({
          message: "El correo ya esta en uso"
      })

      await newStudent.save()
      res.json({
          message: "El estudiante se creo correctamente",
          data: newStudent
      })
  }catch(err){
      console.log(err)
      res.status(500).send({
          err
      })
  }
}


const updateStudentById = async (req,res) => {
  let id = req.params.id;

  if (id === "null") {
      id = new Types.ObjectId()
  }
  let data = req.body;  
  try{
      const student = await studenModel.findByIdAndUpdate(id, data, 
          { upsert: true, returnDocument: "after"})
      res.json({
          message: "El estudiante se creo correctamente",
          data: student
      })
  }catch(err){
      console.log(err)
      res.status(500).send({
          err: "La petición falló"
      })
  }
}

const deleteStudentById =  async (req,res) => {
  let id =req.params.id;
  try{
      const student = await studenModel.findByIdAndDelete(id)
      res.json({
          message: "El estudiante se creo correctamente",
          data: student
      })
  }catch(err){
      console.log(err)
      res.status(500).send({
          err: "La petición falló"
      })
  }
}

module.exports = {
  getAllStudents,
  createStudent,
  deleteStudentById,
  getStudentById,
  updateStudentById
}