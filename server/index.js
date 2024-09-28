//referencia a express
const express = require("express");
const app = express();
// importamos mysql
const mysql = require("mysql");
const cors = require("cors");

//indicar a la aplicacion antes de ejecutar cualquier cosa debe usar
app.use(cors());
app.use(express.json());

//conexion hacia la base de datos
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"testers"
});

//creamos la peticion para guardar
app.post("/create", (req, res) => {
    const codigo = req.body.codigo;
    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;
    const nivel_importancia = req.body.nivel;
    const id_usuario_asignado = req.body.asignar;
    const nombre_proyecto = req.body.nombre_proyecto; // Agregar el campo faltante
    const fecha_creacion = req.body.fecha_creacion;

    db.query('INSERT INTO test_case(codigo, nombre, descripcion, nivel_importancia, nombre_proyecto, id_usuario_asignado, fecha_asignacion) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [codigo, nombre, descripcion, nivel_importancia, nombre_proyecto, id_usuario_asignado, fecha_creacion], // Asegurarse de incluir nombre_proyecto en la consulta
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Caso Registrado con Éxito");
            }
        }
    );
});

//decimos que vamos a escuchar por un puerto
app.listen(3001, () => { 
    console.log("Servidor escuchando en el puerto 3001");
    });

