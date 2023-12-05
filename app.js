const PORT = 5000;
const express = require("express");
const app = express();

let rutasProductos = require("./routes/productsRoutes.js");

app.set("view engine", "ejs");
app.use("", express.static(`${__dirname}/publics`));

/*para el crud*/
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(PORT, () => console.log("Server funcionando en puerto " + PORT));

app.use("/", rutasProductos);
