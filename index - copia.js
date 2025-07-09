const express = require('express');
const app = express();
const port = 3000;

var objetos=[
    {nombre:"Pedro", edad:20, nivel:"admin"},
    {nombre:"Leopoldo", edad:25, nivel:"admin"},
    {nombre:"Octavio", edad:30, nivel:"admin"},
    {nombre:"Alejandra", edad:16, nivel:"admin"},
    {nombre:"Sandra", edad:223, nivel:"admin"},
    {nombre:"Jordan", edad:27, nivel:"admin"},
  ]

app.get('/', (req, res) => {
  res.send(objetos);
});

app.get('/leopoldo', (req, res) => {
  res.send(objetos[1]);
});

app.listen(port, () => {
  console.log(`API escuchando en http://localhost:${port}`);
});