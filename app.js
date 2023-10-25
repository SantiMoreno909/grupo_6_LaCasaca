const express = require("express");
const app = express();
const PORT = 5000;

//Definimos dónde buscamos archivos js, css e imagenes
app.use("", express.static(`${__dirname}/public`));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.listen(PORT, () => console.log("Server funcionando en puerto " + PORT));
