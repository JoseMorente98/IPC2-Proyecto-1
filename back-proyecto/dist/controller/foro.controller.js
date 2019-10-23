"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("./../mysql/mysql"));
var ForoController = /** @class */ (function () {
    function ForoController() {
        this.getAll = function (req, res) {
            var query = "\n            SELECT * FROM Foro\n        ";
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
            var query = "\n            SELECT * FROM Foro WHERE idForo = ?\n        ";
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
        this.getAllByAsignacionAuxiliar = function (req, res) {
            var query = "\n            SELECT * FROM Foro WHERE idAsignacionAuxiliar = ?\n        ";
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
            var query = "\n            INSERT INTO Foro(titulo, descripcion, fechaFin, idAsignacionAuxiliar) VALUES(?, ?, ?, ?)\n        ";
            var body = {
                titulo: req.body.titulo,
                descripcion: req.body.descripcion,
                fechaFin: req.body.fechaFin,
                idAsignacionAuxiliar: req.body.idAsignacionAuxiliar,
            };
            mysql_1.default.sendQuery(query, [body.titulo, body.descripcion, body.fechaFin, body.idAsignacionAuxiliar], function (err, data) {
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
        this.createHiloForo = function (req, res) {
            var query = "\n            CALL SP_CreateHiloForo(?, ?, ?);\n        ";
            var body = {
                comentario: req.body.comentario,
                idUsuario: req.body.idUsuario,
                idForo: req.body.idForo,
            };
            mysql_1.default.sendQuery(query, [body.comentario, body.idUsuario, body.idForo], function (err, data) {
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
                titulo: req.body.titulo,
                descripcion: req.body.descripcion,
                fechaFin: req.body.fechaFin,
                idAsignacionAuxiliar: req.body.idAsignacionAuxiliar,
                idForo: req.params.id,
            };
            var query = "\n            UPDATE Foro SET titulo = ?, descripcion = ?, fechaFin = ?, idAsignacionAuxiliar = ?\n            WHERE idForo = ?;\n        ";
            mysql_1.default.sendQuery(query, [body.titulo, body.descripcion, body.fechaFin, body.idAsignacionAuxiliar, body.idForo], function (err, data) {
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
            var query = "\n            DELETE FROM Foro WHERE idForo = ?;\n        ";
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
                    });
                }
            });
        };
    }
    ForoController.getInstance = function () {
        return this._instance || (this._instance = new this());
    };
    return ForoController;
}());
exports.default = ForoController;
