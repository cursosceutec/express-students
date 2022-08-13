const {Router, response, request} = require('express');
const { Types } = require('mongoose');
const router = Router();
const studenModel = require("../models/student.model")

//get
router.get('/', async (req = request, res = response)=>{
    let students1 = await studenModel.find()
    res.json(students1)
})

router.get("/generateid", (req, res)=> {
    res.json({ id: new Types.ObjectId()})
});

router.get('/:id', async (req, res)=>{
    let id = req.params.id;
    
    let student = await studenModel.findById(id)
    res.json(student);     
})

//post 
router.post('/', async (req, res)=>{
    let data = req.body

    try{
        const newStudent = new studenModel(data)
    
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
})


router.put('/:id', async(req,res)=>{
    let id = req.params.id;
    if (id === "null") {
        id = new Types.ObjectId()
    }
    let data = req.body;  
    try{
        const student = await studenModel.findByIdAndUpdate(id, data, 
            { upsert: true, returnDocument: "after", new: true})
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
})

router.delete('/:id', async(req,res)=>{
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

})

module.exports = router