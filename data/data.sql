insert lacasaca.ligas (nombre,pais) values ("Liga Argentina", "Argentina");
insert lacasaca.ligas (nombre,pais) values ("Copa Argentina", "Argentina");
insert lacasaca.ligas (nombre,pais) values ("Super Argentina", "Argentina");

insert lacasaca.marcas (nombre) value ("Adidas");
insert lacasaca.marcas (nombre) value ("Nike");
insert lacasaca.marcas (nombre) value ("Under Armour");

insert lacasaca.equipos (nombre,ligaId,marcaId) value ("Boca Junior", 1,1);
insert lacasaca.equipos (nombre,ligaId,marcaId) value ("River Plate", 1,1);
insert lacasaca.equipos (nombre,ligaId,marcaId) value ("Estudiantes", 2,3);

insert lacasaca.productos (nombre,precio,talle,descripcion,equipoId,ligaId,stock,marcaId)
value ("Camiseta Boca Original 2023", 25000,"S","original",1,1,1,1);

insert lacasaca.productos (nombre,precio,talle,descripcion,equipoId,ligaId,stock,marcaId)
value ("Camiseta River Original 2023", 20000,"M","original",2,1,1,1);

insert lacasaca.usuarios (nombre,apellido,email,telefono,genero,direccion_envios,contrasenia,confirmar_contrasenia)
values ("Natalia","Luna","natyluna92@gmail.com",156118899,"femenino","Ocampo 1300","1234","1234")

insert lacasaca.usuarios (nombre,apellido,email,telefono,genero,direccion_envios,contrasenia,confirmar_contrasenia)
values ("Santiago","Moreno","santiago@gmail.com",15437049,"masculino","Otro 123","1234","1234")