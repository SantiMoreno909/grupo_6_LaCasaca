CREATE DATABASE lacasaca

-- Crear la tabla USUARIOS
CREATE TABLE USUARIOS (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nombre MEDIUMTEXT NOT NULL,
    apellido MEDIUMTEXT NOT NULL,
    email MEDIUMTEXT NOT NULL UNIQUE,
    telefono MEDIUMTEXT NOT NULL UNIQUE,
    fec_nac DATE NOT NULL,
    genero MEDIUMTEXT,
    url_foto_perfil MEDIUMTEXT UNIQUE,
    direccion_envios MEDIUMTEXT,
    contrasenia MEDIUMTEXT NOT NULL,
    confirmar_contrasenia MEDIUMTEXT NOT NULL,
    tyc TINYINT NOT NULL,
    novedades TINYINT NOT NULL,
    rol STRING NOT NULL
);

-- Crear la tabla LIGAS
CREATE TABLE LIGAS (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nombre MEDIUMTEXT NOT NULL,
    pais MEDIUMTEXT NOT NULL
);

-- Crear la tabla MARCAS
CREATE TABLE MARCAS (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nombre MEDIUMTEXT NOT NULL
);

-- Crear la tabla EQUIPOS
CREATE TABLE EQUIPOS (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nombre MEDIUMTEXT NOT NULL,
    ligaId INT NOT NULL,
    marcaId INT NOT NULL,
    FOREIGN KEY (ligaId) REFERENCES LIGAS(id),
    FOREIGN KEY (marcaId) REFERENCES MARCAS(id)
);

-- Crear la tabla PRODUCTOS
CREATE TABLE PRODUCTOS (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nombre TEXT NOT NULL,
    precio FLOAT NOT NULL,
    talle TEXT,
    descripcion MEDIUMTEXT,
    equipoId INT NOT NULL,
    ligaId INT NOT NULL,
    stock INT NOT NULL,
    marcaId INT NOT NULL,
    url_foto MEDIUMTEXT,
    FOREIGN KEY (equipoId) REFERENCES EQUIPOS(id),
    FOREIGN KEY (ligaId) REFERENCES LIGAS(id),
    FOREIGN KEY (marcaId) REFERENCES MARCAS(id)
);

-- Crear la tabla CARRITO
CREATE TABLE CARRITO (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    id_cliente INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL,
    talle TINYTEXT NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES USUARIOS(id),
    FOREIGN KEY (id_producto) REFERENCES PRODUCTOS(id)
);

-- Crear la tabla VENTAS
CREATE TABLE VENTAS (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    id_carrito INT NOT NULL,
    cobrado TINYINT NOT NULL,
    enviado TINYINT NOT NULL,
    entregado TINYINT NOT NULL,
    FOREIGN KEY (id_carrito) REFERENCES CARRITO(id)
);
