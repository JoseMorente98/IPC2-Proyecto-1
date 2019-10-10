-- USE DATABASE
USE Practica2;

-- INSERTAR TIPOS DE USUARIO
INSERT INTO TipoUsuario(nombre, descripcion) VALUES ('Administrador', 'Administrador de la pagina web.');
INSERT INTO TipoUsuario(nombre, descripcion) VALUES ('Auxiliar', 'Auxiliar de la pagina web.');
INSERT INTO TipoUsuario(nombre, descripcion) VALUES ('Estudiante', 'Estudiante de la pagina web.');

-- INSERTAR USUARIOS
INSERT INTO Usuario(carnet, dpi, email, password, nombre, apellido) 
VALUES (0, 0, "12345", "Administrador", "U");

CALL SP_AsignarRol(1, 1);
