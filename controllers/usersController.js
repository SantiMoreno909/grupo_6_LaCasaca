const fs = require("fs");
const { validationResult } = require("express-validator");
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
  
  guardarUsuario: (req, res) => {
    // Validar los resultados de la validación
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      // Si hay errores, renderizar nuevamente la página de registro con los mensajes de error
      return res.render("users/register", { errors: errors.array() });
    }

    // Verificar si se cargó correctamente el archivo
    if (!req.file) {
      console.log("No se ha seleccionado una imagen");
      // Puedes manejar esto según tus necesidades, como redirigir a la página de registro con un mensaje de error.
      return res.render("users/register", { errors: [{ msg: "Debes seleccionar una imagen" }] });
    }

    // Si no hay errores y se ha cargado un archivo, continuar con la lógica para guardar el usuario
    user.push({
      ...req.body,
      fotoPerfil: req.file.filename // Usar el nombre de archivo proporcionado por Multer
    });

    fs.writeFileSync(userFilePath, JSON.stringify(user), "utf-8");
    res.redirect("/login");
  },

  usuarios: (req, res) => {
    let usuario = user;
    if (req.file) {
      console.log("entra");
    }
    res.render("users/admin", { usuario: usuario });
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

    if (usuario && bcrypt.compareSync(contrasena, bcrypt.hashSync(usuario.contrasena))) {
      req.session.user = usuario;
      res.redirect("/"); // Redirige a la página principal después del inicio de sesión exitoso
    } else {
      res.render("users/login", {
        error: "Usuario y/o contraseña incorrectos"  
      });
    }
  },

  cerrarSesion: (req, res) => {
    req.session.destroy();
    res.redirect("/");
  },
};

module.exports = controlador;
