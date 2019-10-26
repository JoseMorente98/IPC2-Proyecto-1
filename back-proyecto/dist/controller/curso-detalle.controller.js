"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("./../mysql/mysql"));
var CursoDetalleController = /** @class */ (function () {
    function CursoDetalleController() {
        this.getAll = function (req, res) {
            var query = "\n            SELECT idDetalleCurso, semestre, anio, horaInicio, horaFin, fechaFin, Curso.nombre, Curso.codigo, seccion.nombre AS 'seccion'\n            FROM DetalleCurso \n            INNER JOIN Curso on DetalleCurso.idCurso = Curso.idCurso\n            INNER JOIN Seccion on DetalleCurso.idSeccion = Seccion.idSeccion;\n        ";
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
            var query = "\n            SELECT * FROM DetalleCurso WHERE idDetalleCurso = ?\n        ";
            var body = {
                idDetalleCurso: req.params.id
            };
            mysql_1.default.sendQuery(query, body.idDetalleCurso, function (err, data) {
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
        this.create = function (req, res) {
            var query = "\n            CALL SP_CreateDetalleCurso(?, ?, ?, ?, ?, ?, ?);\n        ";
            var body = {
                semestre: req.body.semestre,
                anio: req.body.anio,
                horaInicio: req.body.horaInicio,
                horaFin: req.body.horaFin,
                fechaFin: req.body.fechaFin,
                idCurso: req.body.idCurso,
                idSeccion: req.body.idSeccion,
            };
            mysql_1.default.sendQuery(query, [body.semestre, body.anio, body.horaInicio, body.horaFin, body.fechaFin, body.idCurso, body.idSeccion], function (err, data) {
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
        this.update = function (req, res) {
            var body = {
                semestre: req.body.semestre,
                anio: req.body.anio,
                horaInicio: req.body.horaInicio,
                horaFin: req.body.horaFin,
                fechaFin: req.body.fechaFin,
                idCurso: req.body.idCurso,
                idSeccion: req.body.idSeccion,
                idDetalleCurso: req.params.id,
            };
            var query = "\n            CALL SP_UpdateDetalleCurso(?, ?, ?, ?, ?, ?, ?, ?);\n        ";
            mysql_1.default.sendQuery(query, [body.semestre, body.anio, body.horaInicio, body.horaFin, body.fechaFin, body.idCurso, body.idSeccion, body.idDetalleCurso], function (err, data) {
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
                        status: 200
                    });
                }
            });
        };
        this.delete = function (req, res) {
            var id = req.params.id;
            var query = "\n            CALL SP_DeleteDetalleCurso(?);\n        ";
            mysql_1.default.sendQuery(query, id, function (err, data) {
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
    CursoDetalleController.getInstance = function () {
        return this._instance || (this._instance = new this());
    };
    return CursoDetalleController;
}());
exports.default = CursoDetalleController;
