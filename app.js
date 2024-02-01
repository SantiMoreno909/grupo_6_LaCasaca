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
app.use(
  expSession({
    secret: "SessionSecret",
    resave: false, // Evitará la advertencia relacionada con resave
    saveUninitialized: false, // Evitará la advertencia relacionada con saveUninitialized
  })
);

app.use((req, res, next) => {
  if (req.session.user) {
    res.locals.user = req.session.user;
  }
  next();
});

app.use("/", rutasProductos);
app.use("/users", rutasUsuarios);

// Solucionando errores 27/01/2024
app.get("/partials/header.ejs", (req, res) => {
  res.render("/partials/header.ejs");
});
app.get("/partials/footer.ejs", (req, res) => {
  res.render("/partials/footer.ejs");
});

app.set("view engine", "ejs");
app.listen(PORT, () => console.log("Server funcionando en puerto " + PORT));
