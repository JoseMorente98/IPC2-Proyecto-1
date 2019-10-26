"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("./../mysql/mysql"));
var AsignacionAuxiliarController = /** @class */ (function () {
    function AsignacionAuxiliarController() {
        this.getAll = function (req, res) {
            var query = "\n            SELECT idAsignacionAuxiliar, Usuario.nombre, Usuario.apellido, semestre, DetalleCurso.anio, horaInicio, AsignacionAuxiliar.estado, AsignacionAuxiliar.descripcion,\n            horaFin, Curso.nombre as 'curso', Curso.codigo, seccion.nombre as 'seccion' FROM AsignacionAuxiliar\n            INNER JOIN Usuario ON AsignacionAuxiliar.idUsuario = Usuario.idUsuario\n            INNER JOIN DetalleCurso ON AsignacionAuxiliar.idDetalleCurso = DetalleCurso.idDetalleCurso\n            INNER JOIN Curso on DetalleCurso.idCurso = Curso.idCurso\n            INNER JOIN Seccion on DetalleCurso.idSeccion = Seccion.idSeccion\n            ORDER BY idAsignacionAuxiliar;\n        ";
            mysql_1.default.getQuery(query, function (err, data) {
                if (err) {
                    res.json([]);
                }
                else {
                    res.json(data);
                }
            });
        };
        this.getSingle = function (req, res) {
            var query = "\n            SELECT * FROM AsignacionAuxiliar WHERE idAsignacionAuxiliar = ?\n        ";
            var body = {
                idCurso: req.params.id
            };
            mysql_1.default.sendQuery(query, body.idCurso, function (err, data) {
                if (err) {
                    res.status(400).json({
                        ok: false,
                        status: 400,
                        error: err
                    });
                }
                else {
                    res.json(data[0]);
                }
            });
        };
        this.getAuxiliar = function (req, res) {
            var query = "\n            SELECT idAsignacionAuxiliar, Usuario.idUsuario, Usuario.nombre, Usuario.apellido, semestre, DetalleCurso.anio,\n            AsignacionAuxiliar.estado, AsignacionAuxiliar.descripcion, horaInicio, DetalleCurso.idDetalleCurso\n            horaFin, Curso.nombre as 'curso', Curso.codigo, seccion.nombre as 'seccion' FROM AsignacionAuxiliar\n            INNER JOIN Usuario ON AsignacionAuxiliar.idUsuario = Usuario.idUsuario\n            INNER JOIN DetalleCurso ON AsignacionAuxiliar.idDetalleCurso = DetalleCurso.idDetalleCurso\n            INNER JOIN Curso on DetalleCurso.idCurso = Curso.idCurso\n            INNER JOIN Seccion on DetalleCurso.idSeccion = Seccion.idSeccion\n            WHERE DetalleCurso.idDetalleCurso = ?\n            ORDER BY idAsignacionAuxiliar;\n        ";
            var body = {
                idCurso: req.params.id
            };
            mysql_1.default.sendQuery(query, body.idCurso, function (err, data) {
                if (err) {
                    res.status(400).json({
                        ok: false,
                        status: 400,
                        error: err
                    });
                }
                else {
                    res.json(data);
                }
            });
        };
        this.getCursosByAuxiliar = function (req, res) {
            var query = "\n            SELECT idAsignacionAuxiliar, Usuario.idUsuario, Usuario.nombre, Usuario.apellido, semestre, DetalleCurso.anio, \n            AsignacionAuxiliar.estado, horaInicio,fechaFin, DetalleCurso.idDetalleCurso, AsignacionAuxiliar.descripcion,\n            horaFin, Curso.nombre as 'curso', Curso.codigo, seccion.nombre as 'seccion' FROM AsignacionAuxiliar\n            INNER JOIN Usuario ON AsignacionAuxiliar.idUsuario = Usuario.idUsuario\n            INNER JOIN DetalleCurso ON AsignacionAuxiliar.idDetalleCurso = DetalleCurso.idDetalleCurso\n            INNER JOIN Curso on DetalleCurso.idCurso = Curso.idCurso\n            INNER JOIN Seccion on DetalleCurso.idSeccion = Seccion.idSeccion\n            WHERE Usuario.idUsuario = ?\n            ORDER BY idAsignacionAuxiliar;\n        ";
            var body = {
                idCurso: req.params.id
            };
            mysql_1.default.sendQuery(query, body.idCurso, function (err, data) {
                if (err) {
                    res.status(400).json({
                        ok: false,
                        status: 400,
                        error: err
                    });
                }
                else {
                    res.json(data);
                }
            });
        };
        this.create = function (req, res) {
            var query = "\n            CALL SP_CreateAsignacionAuxiliar(?, ?);\n        ";
            var body = {
                idUsuario: req.body.idUsuario,
                idDetalleCurso: req.body.idDetalleCurso
            };
            mysql_1.default.sendQuery(query, [body.idUsuario, body.idDetalleCurso], function (err, data) {
                if (err) {
                    res.status(400).json({
                        ok: false,
                        status: 400,
                        error: err
                    });
                }
                else {
                    res.json({
                        ok: true,
                        status: 200,
                        res: data[0]
                    });
                }
            });
        };
        this.update = function (req, res) {
            var body = {
                idUsuario: req.body.idUsuario,
                idDetalleCurso: req.body.idDetalleCurso,
                idAsignacionAuxiliar: req.params.id,
            };
            var query = "\n            CALL SP_UpdateAsignacionAuxiliar(?, ?, ?)\n        ";
            mysql_1.default.sendQuery(query, [body.idUsuario, body.idDetalleCurso, body.idAsignacionAuxiliar], function (err, data) {
                if (err) {
                    res.status(400).json({
                        ok: false,
                        status: 400,
                        error: err
                    });
                }
                else {
                    if (JSON.parse(JSON.stringify(data[0]))[0]._existe == 0) {
                        res.json({
                            ok: true,
                            status: 200
                        });
                    }
                    else {
                        res.status(400).json({
                            ok: false,
                            status: 400,
                            error: "Ya existe un registro"
                        });
                    }
                }
            });
        };
        this.deleteAsignacion = function (req, res) {
            var body = {
                descripcion: req.body.descripcion,
                estado: req.body.estado,
                idAsignacionAuxiliar: req.params.id,
            };
            var query = "\n            UPDATE AsignacionAuxiliar SET descripcion = ?, estado = ?\n            WHERE idAsignacionAuxiliar = ?\n        ";
            mysql_1.default.sendQuery(query, [body.descripcion, body.estado, body.idAsignacionAuxiliar], function (err, data) {
                if (err) {
                    res.status(400).json({
                        ok: false,
                        status: 400,
                        error: err
                    });
                }
                else {
                    res.json({
                        ok: true,
                        status: 200,
                    });
                }
            });
        };
    }
    AsignacionAuxiliarController.getInstance = function () {
        return this._instance || (this._instance = new this());
    };
    return AsignacionAuxiliarController;
}());
exports.default = AsignacionAuxiliarController;
