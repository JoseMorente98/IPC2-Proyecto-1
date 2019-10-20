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
-- CREATE TABLE CURSE
DROP TABLE IF EXISTS Curso;
CREATE TABLE Curso(
	idCurso INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(100) NULL,
	codigo VARCHAR(50) NULL,
	estado TINYINT NOT NULL
);

-- CREATE TABLE SECCION
DROP TABLE IF EXISTS Seccion;
CREATE TABLE Seccion(
	idSeccion INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(10) NULL
);

-- CREATE TABLE DETAIL CURSE
DROP TABLE IF EXISTS DetalleCurso;
CREATE TABLE DetalleCurso(
    idDetalleCurso INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    semestre VARCHAR(50) NULL,
	anio VARCHAR(50) NULL,
	horaInicio VARCHAR(50) NULL,
	horaFin VARCHAR(50) NULL,
    idCurso INT NOT NULL,
    idSeccion INT NOT NULL,
    FOREIGN KEY (idCurso) REFERENCES Curso(idCurso)
	ON UPDATE CASCADE
    ON DELETE CASCADE,
    FOREIGN KEY (idSeccion) REFERENCES Seccion(idSeccion)
	ON UPDATE CASCADE
    ON DELETE CASCADE
);

-- CREATE TABLE ASIGNAMENT AUXILIAR
DROP TABLE IF EXISTS AsignacionAuxiliar;
CREATE TABLE AsignacionAuxiliar(
    idAsignacionAuxiliar INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT NOT NULL,
    idDetalleCurso INT NOT NULL,
    FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario)
	ON UPDATE CASCADE
    ON DELETE CASCADE,
    FOREIGN KEY (idDetalleCurso) REFERENCES DetalleCurso(idDetalleCurso)
	ON UPDATE CASCADE
    ON DELETE CASCADE
);

-- CREATE TABLE MESSAGES
DROP TABLE IF EXISTS Mensaje;
CREATE TABLE Mensaje(
    idMensaje INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    idUsuario1 INT NOT NULL,
    idUsuario2 INT NOT NULL,
    asunto VARCHAR(255) NOT NULL,
    FOREIGN KEY (idUsuario1) REFERENCES Usuario(idUsuario)
	ON UPDATE CASCADE
    ON DELETE CASCADE,
    FOREIGN KEY (idUsuario2) REFERENCES Usuario(idUsuario)
	ON UPDATE CASCADE
    ON DELETE CASCADE
);

-- CREATE TABLE MESSAGES
DROP TABLE IF EXISTS DetalleMensaje;
CREATE TABLE DetalleMensaje(
    idDetalleMensaje INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    idMensaje INT NOT NULL,
    cuerpo VARCHAR(255) NOT NULL,
    archivo BLOB NULL,
    FOREIGN KEY (idMensaje) REFERENCES Mensaje(idMensaje)
	ON UPDATE CASCADE
    ON DELETE CASCADE
);

-- CREATE TABLE FORO
DROP TABLE IF EXISTS Foro;
CREATE TABLE Foro(
    idForo INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    fecha DATE NOT NULL,
    hora DATETIME NOT NULL,
	idAsignacionAuxiliar INT NOT NULL,
	FOREIGN KEY (idAsignacionAuxiliar) REFERENCES AsignacionAuxiliar(idAsignacionAuxiliar)
	ON UPDATE CASCADE
    ON DELETE CASCADE
);

-- CREATE TABLE DETAIL FORO
DROP TABLE IF EXISTS DetalleForo;
CREATE TABLE DetalleForo(
    idDetalleForo INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    comentario VARCHAR(250) NOT NULL,
	idUsuario INT NOT NULL,
	idForo INT NOT NULL,
	FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario)
	ON UPDATE CASCADE
    ON DELETE CASCADE,
	FOREIGN KEY (idForo) REFERENCES Foro(idForo)
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

-- SP VER CREAR USUARIO
DELIMITER $$
CREATE PROCEDURE SP_CreateDetalleCurso
(IN _semestre VARCHAR(50), _anio VARCHAR(50), _horaInicio VARCHAR(50), _horaFin VARCHAR(50), _idCurso INT, _idSeccion INT)
BEGIN
	DECLARE _existe INT;
	SET _existe = (SELECT COUNT(*) FROM DetalleCurso WHERE idCurso = _idCurso AND idSeccion = _idSeccion AND horaInicio = _horaInicio AND horaFin = _horaFin AND semestre = _semestre);
	IF(_existe = 0) THEN
	INSERT INTO DetalleCurso(semestre, anio, horaInicio, horaFin, idCurso, idSeccion) VALUES (_semestre, _anio, _horaInicio, _horaFin, _idCurso, _idSeccion);
		SELECT _existe;
	ELSE
		SELECT _existe;
	END IF;
END;
$$

-- SP VER CREAR USUARIO
DELIMITER $$
CREATE PROCEDURE SP_UpdateDetalleCurso
(IN _semestre VARCHAR(50), _anio VARCHAR(50), _horaInicio VARCHAR(50), _horaFin VARCHAR(50), _idCurso INT, _idSeccion INT, _idDetalleCurso INT)
BEGIN
	DECLARE _existe INT;
	SET _existe = (SELECT COUNT(*) FROM DetalleCurso WHERE idCurso = _idCurso AND idSeccion = _idSeccion AND horaInicio = _horaInicio AND horaFin = _horaFin AND semestre = _semestre);
	IF(_existe = 0) THEN
		UPDATE DetalleCurso SET semestre = _semestre, anio = _anio, horaInicio = _horaInicio, horaFin = _horaFin,
        idCurso = _idCurso, idSeccion = _idSeccion WHERE idDetalleCurso = _idDetalleCurso;
		SELECT _existe;
	ELSE
		SELECT _existe;
	END IF;
END;
$$

-- SP VER CREAR USUARIO
DELIMITER $$
CREATE PROCEDURE SP_UpdateAsignacionAuxiliar
(IN _idUsuario INT, _idDetalleCurso INT, _idAsignacionAuxiliar INT)
BEGIN
	DECLARE _existe INT;
	SET _existe = (SELECT COUNT(*) FROM AsignacionAuxiliar WHERE idUsuario = _idUsuario AND idDetalleCurso = _idDetalleCurso);
	IF(_existe = 0) THEN
		UPDATE AsignacionAuxiliar SET idUsuario = _idUsuario, idDetalleCurso = _idDetalleCurso
        WHERE idAsignacionAuxiliar = _idAsignacionAuxiliar;
		SELECT _existe;
	ELSE
		SELECT _existe;
	END IF;
END;
$$

-- SP VER CREAR USUARIO
DELIMITER $$
CREATE PROCEDURE SP_CreateAsignacionAuxiliar
(IN _idUsuario INT, _idDetalleCurso INT)
BEGIN
	DECLARE _existe INT;
	SET _existe = (SELECT COUNT(*) FROM AsignacionAuxiliar WHERE idUsuario = _idUsuario AND idDetalleCurso = _idDetalleCurso);
	IF(_existe = 0) THEN
		INSERT INTO AsignacionAuxiliar(idUsuario, idDetalleCurso)
			VALUES (_idUsuario, _idDetalleCurso);
		SELECT _existe;
	ELSE
		SELECT _existe;
	END IF;
END;
$$

-- SP VER CREAR USUARIO
DELIMITER $$
CREATE PROCEDURE SP_CreateAsignacionAuxiliar
(IN _idUsuario INT, _idDetalleCurso INT)
BEGIN
	DECLARE _existe INT;
	SET _existe = (SELECT COUNT(*) FROM AsignacionAuxiliar WHERE idUsuario = _idUsuario AND idDetalleCurso = _idDetalleCurso);
	IF(_existe = 0) THEN
		INSERT INTO AsignacionAuxiliar(idUsuario, idDetalleCurso)
			VALUES (_idUsuario, _idDetalleCurso);
		SELECT _existe;
	ELSE
		SELECT _existe;
	END IF;
END;
$$

-- SP CREAR MENSAJE
DELIMITER $$
CREATE PROCEDURE SP_CreateMensaje
(IN _idUsuario1 INT, _idUsuario2 INT, _asunto VARCHAR(255), _cuerpo VARCHAR(255), _archivo BLOB)
BEGIN
	INSERT INTO Mensaje(idUsuario1, idUsuario2, asunto) VALUES(_idUsuario1, _idUsuario2, _asunto);
    INSERT INTO DetalleMensaje(idMensaje, cuerpo, archivo) VALUES((SELECT max(idMensaje) FROM Mensaje), _cuerpo, _archivo);
END;
$$