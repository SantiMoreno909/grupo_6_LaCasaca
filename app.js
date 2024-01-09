const PORT = 5000;
const express = require("express");
const app = express();
const methodOverride = require("method-override");
const expSession = require("express-session");
const bcrypt = require("bcryptjs");

let rutasProductos = require("./routes/productsRoutes.js");
let rutasUsuarios = require("./routes/usersRoutes.js");

app.use("", express.static(`${__dirname}/publics`));
app.use(methodOverride("_method")); //para el PUT y DELETE
/*para el crud*/
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(expSession({ secret: "SessionSecret" }));

app.use((req, res, next) => {
  if (req.session.user) {
    res.locals.user = req.session.user;
  }
  next();
});
app.set("view engine", "ejs");
app.listen(PORT, () => console.log("Server funcionando en puerto " + PORT));

app.use("/", rutasProductos);
app.use("/users", rutasUsuarios);
