const { Router } = require('express');
const { body, query, param } = require('express-validator');
const router = Router();
const studentController = require("../controller/student.contoller")
const validateRequest = require("../helpers/validateRequest")



//get
router.get('/', studentController.getAllStudents)
router.get('/getStudent/:id', [
    query(["id"], "Debe contener mas caracteres").isLength({ min: 3 }),
    param("id").isLength({ min: 24, max: 24}),
    validateRequest
    ],
    studentController.getStudentById)

router.post('/', [
    body("email").isEmail().withMessage("Debe ser un email valido"),
    body("name").isLength({ min: 3, max: 20 }).withMessage("Debe contener entre 3 a 20 caracteres"),
    validateRequest
] , studentController.createStudent)

router.put('/:id', studentController.updateStudentById)
router.delete('/:id', studentController.deleteStudentById)

module.exports = router