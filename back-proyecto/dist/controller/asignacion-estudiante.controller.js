"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("./../mysql/mysql"));
var AsignacionEstudianteController = /** @class */ (function () {
    function AsignacionEstudianteController() {
        this.getAll = function (req, res) {
            var query = "\n            SELECT idAsignacionEstudiante, AsignacionAuxiliar.idAsignacionAuxiliar, AsignacionAuxiliar.idUsuario, Usuario.nombre, Usuario.apellido,\n            DetalleCurso.semestre, DetalleCurso.anio, DetalleCurso.horaInicio, DetalleCurso.horaFin, \n            Curso.nombre as 'curso', Curso.codigo, seccion.nombre as 'seccion' FROM AsignacionEstudiante\n            INNER JOIN AsignacionAuxiliar on AsignacionEstudiante.idAsignacionAuxiliar = AsignacionAuxiliar.idAsignacionAuxiliar\n            INNER JOIN Usuario ON AsignacionAuxiliar.idUsuario = Usuario.idUsuario\n            INNER JOIN DetalleCurso ON AsignacionAuxiliar.idDetalleCurso = DetalleCurso.idDetalleCurso\n            INNER JOIN Curso on DetalleCurso.idCurso = Curso.idCurso\n            INNER JOIN Seccion on DetalleCurso.idSeccion = Seccion.idSeccion\n        ";
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
            var query = "\n            SELECT * FROM AsignacionEstudiante WHERE idAsignacionEstudiante = ?\n        ";
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
        this.getCursosByStudent = function (req, res) {
            var query = "\n            SELECT idAsignacionEstudiante, DetalleCurso.semestre, DetalleCurso.idDetalleCurso, DetalleCurso.anio, DetalleCurso.horaInicio, DetalleCurso.horaFin, \n            Curso.nombre as 'curso', Curso.codigo, seccion.nombre as 'seccion' FROM AsignacionEstudiante\n            INNER JOIN DetalleCurso ON AsignacionEstudiante.idDetalleCurso = DetalleCurso.idDetalleCurso\n            INNER JOIN Curso on DetalleCurso.idCurso = Curso.idCurso\n            INNER JOIN Seccion on DetalleCurso.idSeccion = Seccion.idSeccion\n            WHERE AsignacionEstudiante.idUsuario = ?;\n        ";
            var body = {
                idUsuario: req.params.id
            };
            mysql_1.default.sendQuery(query, body.idUsuario, function (err, data) {
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
            var query = "\n            CALL SP_CreateAsignacionEstudiante(?, ?);\n        ";
            var body = {
                idUsuario: req.body.idUsuario,
                idAsignacionAuxiliar: req.body.idAsignacionAuxiliar
            };
            mysql_1.default.sendQuery(query, [body.idAsignacionAuxiliar, body.idUsuario], function (err, data) {
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
        this.delete = function (req, res) {
            var body = {
                idDetalleCurso: req.body.idDetalleCurso,
                idAsignacionEstudiante: req.body.idAsignacionEstudiante
            };
            var query = "\n            CALL SP_DeleteAsignacionEstudiante(?, ?)\n        ";
            mysql_1.default.sendQuery(query, [body.idDetalleCurso, body.idAsignacionEstudiante], function (err, data) {
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
                        data: data[0]
                    });
                }
            });
        };
    }
    AsignacionEstudianteController.getInstance = function () {
        return this._instance || (this._instance = new this());
    };
    return AsignacionEstudianteController;
}());
exports.default = AsignacionEstudianteController;
