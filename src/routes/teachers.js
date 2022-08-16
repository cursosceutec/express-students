const { Router } = require("express")
const router = Router()
const teacherModel = require("../models/teachers.model")

router.get("/getAllTeachers", async (req, res) => {
  const teachers = await teacherModel.find()
/* 
{
  messaje: string || null,
  data: data || null,
  error: string || objeto || null
  ok: boolean
}
*/
  res.json({
    data: teachers,
    message: null,
    ok: true,
    error: null
  })
})

router.post("/CreateTeacher", async (req, res) => {
  let data = req.body
  try {
    let teacher = await teacherModel.create(data)

    res.json({
      data: teacher,
      message: null,
      ok: true,
      error: null
    })
    return
  } catch (error) {
    res.statusCode(500).json({ error })
  }
})

router.get("/getById/:id", async (req, res) => {
  let id =  req.params.id
  const teacher = await teacherModel.findById(id)

  res.json({
    data: teacher,
    message: null,
    ok: true,
    error: null
  })
})

router.put("/updateById/:id", async (req, res) => {
  let id =  req.params.id
  let data = req.body
  const teacher = await teacherModel.findByIdAndUpdate(id, data)

  res.json({
    data: teacher,
    message: null,
    ok: true,
    error: null
  })
})

router.delete("/deleteById/:id", async (req, res) => {
  let id =  req.params.id
  const teacher = await teacherModel.findByIdAndDelete(id)

  res.json({
    data: teacher,
    message: null,
    ok: true,
    error: null
  })
})

module.exports = router