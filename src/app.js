//Librerias
const dbConnection = require("./config/dbConnection")

const express = require('express');
const morgan = require('morgan');
const student = require("./models/student.model")
const clases = require("./models/clases.model")
const ClassesActivas = require("./models/clasesActuvas.model")
require("dotenv").config()

//Función principal
const app = express();

//Configuraciones
app.set('port', process.env.PORT || 3000 );
dbConnection()

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// localhost:3000/api/students
//routes
app.use("/api/students", require("./routes/students"));
app.use("/api/teachers", require("./routes/teachers"));

//Endpoint raiz
app.get('/', async (req, res)=> {
    //faltaba el await
    //era de agregar el nombre de la propiedad, no de la coleccion
    // podemos pasar entre comillas lo que queremos popular, o un array
    // o un objeto on propiedades o un arreglo con propiedades

    //ejemplo con selects
    let data = await ClassesActivas.find().populate([
        {
            path: "idClase",
            select: { _id: 0, section: 0 }
        }, 
        {
            path: "idStudent",
            select: { _id: 0, email: 0 }
        }
    ]).select(
        { _id: 1, idClase: 1 }
    )
    
    
    res.json({
        message: "Hola desde mi api",/*  */
        data
    })
})

//Inciar servicio
app.listen(app.get('port'), ()=>{
    console.log(`Servidor escuchando en el puerto ${app.get('port')} `)
})
