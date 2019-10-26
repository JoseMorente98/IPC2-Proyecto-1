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
                idForo: req.params.id
            };
            mysql_1.default.sendQuery(query, body.idForo, function (err, data) {
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
        this.getAllByDetalleCurso = function (req, res) {
            var query = "\n        SELECT idForo, titulo, descripcion, date(fechaFin) as 'fecha', time(fechaFin) as 'hora',\n        idDetalleCurso FROM Foro WHERE idDetalleCurso = ?\n        ";
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
                    res.json(data);
                }
            });
        };
        this.getAllResponseByForo = function (req, res) {
            var query = "\n            SELECT idDetalleForo, comentario, Usuario.idUsuario, idForo, Usuario.nombre, Usuario.apellido FROM DetalleForo\n            INNER JOIN Usuario ON DetalleForo.idUsuario = Usuario.idUsuario\n            WHERE idForo = ?\n        ";
            var body = {
                idForo: req.params.id
            };
            mysql_1.default.sendQuery(query, body.idForo, function (err, data) {
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
            var query = "\n            INSERT INTO Foro(titulo, descripcion, fechaFin, idDetalleCurso) VALUES(?, ?, ?, ?)\n        ";
            var body = {
                titulo: req.body.titulo,
                descripcion: req.body.descripcion,
                fechaFin: req.body.fechaFin,
                idDetalleCurso: req.body.idDetalleCurso,
            };
            mysql_1.default.sendQuery(query, [body.titulo, body.descripcion, body.fechaFin, body.idDetalleCurso], function (err, data) {
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
                idDetalleCurso: req.body.idDetalleCurso,
                idForo: req.params.id,
            };
            var query = "\n            UPDATE Foro SET titulo = ?, descripcion = ?, fechaFin = ?, idDetalleCurso = ?\n            WHERE idForo = ?;\n        ";
            mysql_1.default.sendQuery(query, [body.titulo, body.descripcion, body.fechaFin, body.idDetalleCurso, body.idForo], function (err, data) {
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
