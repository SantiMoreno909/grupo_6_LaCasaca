const PORT = 5001;
const express = require("express");
const app = express();

let rutasProductos= require('./routes/productsRoutes.js');

app.set('view engine', 'ejs');
app.use("", express.static(`${__dirname}/publics`));

app.listen(PORT, () => console.log("Server funcionando en puerto " + PORT));

app.use('/', rutasProductos);

