// Mayrim estuvo aqui :p
// Attempt number 400
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var objetos=[
    {nombre:"Pedro", edad:20, nivel:"admin"},
    {nombre:"Pedro", edad:20, nivel:"admin"},
    {nombre:"Leopoldo", edad:25, nivel:"admin"},
    {nombre:"Octavio", edad:30, nivel:"admin"},
    {nombre:"Alejandra", edad:16, nivel:"admin"},
    {nombre:"Pedro", edad:223, nivel:"admin"},
    {nombre:"Jordan", edad:27, nivel:"admin"},
  ]
 var datos;

let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "animales_db"
});

function Autorizar(req, res, next){
  const F1 = req.headers.authorization;
  if(F1 === "A1C2E3"){
    next();
  }else{
    res.send("No hay autorización");
  }
}

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM animales", 
    function (err, result, fields) {
    if (err) throw err;
    datos = result;
  });
});

con.connect(function(err) {
  if (err) throw err;
  con.query("INSERT INTO `animales` (`ID`, `nombre`, `edad`, `dimension`) VALUES (NULL, 'lagartija', '1', 'menuda'); ", 
    function (err, result, fields) {
    if (err) throw err;
    datos = result;
  });
});



app.get('/', Autorizar, (req, res) => {
  res.send(datos);
});

app.get('/datos', (req, res) => {
  res.send(datos);
});

app.get('/leopoldo', (req, res) => {
  res.send(objetos[1]);
});

app.post('/insertar',Autorizar, (req, res) => {
  const data = req.body.nombre;
  const edad = req.body.edad;
  const dim = req.body.dim;
  console.log('nombre recibido:'+ data);
  console.log('edad recibida:'+ edad);
  console.log('tamaño recibido:'+ dim);
  res.json({ message: 'Datos recibidos exitosamente', receivedData: data });
});

app.listen(port, () => {
  console.log(`API escuchando en http://localhost:${port}`);
});