-- DROP IF EXIST DATABASE
DROP DATABASE IF EXISTS Proyecto1;

-- CREATE DATABASE
CREATE DATABASE Proyecto1;

-- USE DATABASE
USE Proyecto1;

-- CREATE TABLE TYPE OF USER
CREATE TABLE TipoUsuario(
	idTipoUsuario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(100) NOT NULL,
	descripcion VARCHAR(100) NULL
);

-- CREATE TABLE USER
CREATE TABLE Usuario(
	idUsuario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	carnet BIGINT NULL,
	dpi BIGINT NULL,
	email VARCHAR(100) NOT NULL,
	password VARCHAR(255) NOT NULL,
	nombre VARCHAR(100) NULL,
	apellido VARCHAR(100) NULL
);

-- CREATE TABLE DETAIL USER
CREATE TABLE DetalleUsuario(
    idDetalleUsuario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    idTipoUsuario INT NOT NULL,
    idUsuario INT NOT NULL,
    FOREIGN KEY (idTipoUsuario) REFERENCES TipoUsuario(idTipoUsuario)
	ON UPDATE CASCADE
    ON DELETE CASCADE,
    FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario)
	ON UPDATE CASCADE
    ON DELETE CASCADE
);

-- SP AGREGAR DETALLE USUARIO
DELIMITER $$
CREATE PROCEDURE SP_AsignarRol
(IN _idTipoUsuario INT, _idUsuario INT)
BEGIN
	DECLARE _existe INT;
	SET _existe = (SELECT COUNT(*) FROM DetalleUsuario WHERE idTipoUsuario = _idTipoUsuario AND idUsuario = _idUsuario);
	IF(_existe = 0) THEN
	INSERT INTO DetalleUsuario(idTipoUsuario, idUsuario) VALUES (_idTipoUsuario, _idUsuario);
		SELECT _existe;
	ELSE
		SELECT _existe;
	END IF;
END;
$$

-- SP VER DETALLE USUARIO
DELIMITER $$
CREATE PROCEDURE SP_GetUsuario
(IN _idUsuario INT)
BEGIN
	SELECT Usuario.idUsuario, Usuario.carnet, Usuario.dpi, Usuario.email, Usuario.password, 
	Usuario.nombre, Usuario.apellido, TipoUsuario.nombre AS 'tipo', TipoUsuario.idTipoUsuario FROM DetalleUsuario
		INNER JOIN Usuario ON (DetalleUsuario.idUsuario = Usuario.idUsuario)
		INNER JOIN TipoUsuario ON (DetalleUsuario.idTipoUsuario = TipoUsuario.idTipoUsuario)
		WHERE Usuario.idUsuario = _idUsuario;
END;
$$

-- SP VER AUTENTICAR
DELIMITER $$
CREATE PROCEDURE SP_Autenticar
(IN _email VARCHAR(100), _password VARCHAR(100))
BEGIN
	SELECT Usuario.idUsuario, Usuario.carnet, Usuario.dpi, Usuario.email, Usuario.password, 
	Usuario.nombre, Usuario.apellido, TipoUsuario.nombre AS 'tipo', TipoUsuario.idTipoUsuario FROM DetalleUsuario
		INNER JOIN Usuario ON (DetalleUsuario.idUsuario = Usuario.idUsuario)
		INNER JOIN TipoUsuario ON (DetalleUsuario.idTipoUsuario = TipoUsuario.idTipoUsuario)
		WHERE Usuario.email = _email AND Usuario.password = _password
        ORDER BY DetalleUsuario.idTipoUsuario;
END;
$$

-- SP VER CREAR USUARIO
DELIMITER $$
CREATE PROCEDURE SP_CreateUsuario
(IN _carnet BIGINT, _dpi BIGINT, _email VARCHAR(100), _password VARCHAR(100), _nombre VARCHAR(100), _apellido VARCHAR(100), _rol INT)
BEGIN
	DECLARE _idUsuario INT;
	INSERT INTO Usuario(carnet, dpi, email, password, nombre, apellido) 
		VALUES (_carnet, _dpi, _email, _password, _nombre, _apellido);
	SET _idUsuario = (SELECT idUsuario FROM Usuario ORDER BY idUsuario DESC LIMIT 1);
    CALL SP_AsignarRol(_rol, _idUsuario);
END;
$$