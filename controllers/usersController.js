const fs = require("fs");
const path = require("path");
const userFilePath = path.join(__dirname, "../data/user.json");
const user = JSON.parse(fs.readFileSync(userFilePath, "utf-8"));
const bcrypt = require("bcryptjs");

const controlador = {
  login: (req, res) => {
    res.render("users/login");
  },

  register: (req, res) => {
    res.render("users/register");
  },

  usuarios: (req, res) => {
    let usuario = user;

    if (req.file) {
      console.log("entra");
    }
    res.render("users/admin", { usuario: usuario });
  },

  guardarUsuario: (req, res) => {
    user.push(req.body);
    fs.writeFileSync(userFilePath, JSON.stringify(user), "utf-8");
    res.redirect("/login");
  },

  destroy: (req, res) => {
    const { id } = req.params;
    const usersIndex = user.findIndex((user) => user.id === parseInt(id));
    user.splice(usersIndex, 1);
    fs.writeFileSync(userFilePath, JSON.stringify(user), "utf-8");
    res.redirect("/users/usuarios");
  },

  editar: (req, res) => {
    let userId = req.params.id;
    const result = user.find((data) => {
      if (data.id == userId) {
        return data;
      }
    });

    res.render("users/userEdit", { usuario: result });
  },

  update: (req, res) => {
    const {
      Nombre,
      Apellido,
      email,
      tel,
      nacimiento,
      genero,
      type,
      contrasena,
      fotoPerfil,
      repetir_contrasena,
      aceptar_terminos,
      newsletter,
    } = req.body;
    const id = parseInt(req.params.id);
    const index = user.findIndex((user) => user.id === id);

    if (index === -1) {
      res.render("usuario");
      return;
    }

    user[index].Nombre = Nombre;
    user[index].Apellido = Apellido;
    user[index].email = email;
    user[index].tel = tel;
    user[index].nacimiento = nacimiento;
    user[index].genero = genero;
    user[index].type = type;
    user[index].contrasena = contrasena;
    user[index].repetir_contrasena = repetir_contrasena;
    user[index].fotoPerfil = fotoPerfil;
    user[index].aceptar_terminos = aceptar_terminos;
    user[index].newsletter = newsletter;

    fs.writeFileSync(userFilePath, JSON.stringify(user), "utf-8");
    res.redirect("/users/usuarios");
  },

  iniciarSesion: (req, res) => {
    const { email, contrasena } = req.body;
    const usuario = user.find((u) => u.email === email);

    console.log("Email proporcionado:", email);
    console.log("Usuario encontrado:", usuario);

    if (usuario && bcrypt.compareSync(contrasena, usuario.contrasena)) {
      console.log(`Inicio de sesión exitoso. Bienvenido ${usuario.nombre}`);
      req.session.user = usuario;
      res.redirect("/"); // Redirige a la página principal después del inicio de sesión exitoso
    } else {
      console.log(
        "Inicio de sesión fallido. Usuario:",
        usuario.email,
        "Contraseña:",
        usuario.contrasena,
        "Contraseña guardada:",
        contrasena
      );
      res.render("users/login", {
        error: "Usuario y/o contraseña incorrectos",
      });
    }
  },

  cerrarSesion: (req, res) => {
    req.session.destroy();
    res.redirect("/");
  },
};

module.exports = controlador;
