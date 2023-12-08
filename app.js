const PORT = 5000;
const express = require("express");
const app = express();
var methodOverride = require('method-override')


let rutasProductos = require("./routes/productsRoutes.js");


app.use("", express.static(`${__dirname}/publics`));
app.use(methodOverride('_method'));  //para el PUT y DELETE
/*para el crud*/
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("view engine", "ejs");
app.listen(PORT, () => console.log("Server funcionando en puerto " + PORT));

app.use("/", rutasProductos);
