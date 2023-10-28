const express = require("express");
const app = express();
const PORT = 5000;

//Definimos dónde buscamos archivos js, css e imagenes
app.use("", express.static(`${__dirname}/publics`));


//definimos las distintas rutas
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get('/login', (req,res)=>{
  res.sendFile(__dirname + '/views/login.html');
});

app.get('/register', (req,res)=>{
  res.sendFile(__dirname + '/views/register.html');
});

app.get('/detalle', (req,res)=>{
  res.sendFile(__dirname + '/views/productDetail.html');
});

app.listen(PORT, () => console.log("Server funcionando en puerto " + PORT));
