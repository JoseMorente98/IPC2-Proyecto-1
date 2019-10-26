"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("./../mysql/mysql"));
var TicketController = /** @class */ (function () {
    function TicketController() {
        this.getAll = function (req, res) {
            var query = "\n            SELECT * FROM Ticket\n        ";
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
            var query = "\n            SELECT * FROM Ticket WHERE idTicket = ?\n        ";
            var body = {
                idTicket: req.params.id
            };
            mysql_1.default.sendQuery(query, body.idTicket, function (err, data) {
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
        this.getByUsuario = function (req, res) {
            var query = "\n            SELECT * FROM Ticket WHERE idUsuario = ?\n        ";
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
            var query = "\n            INSERT INTO Ticket(asunto, mensaje, estado, respuesta, idUsuario) VALUES(?, ?, ?, ?, ?)\n        ";
            var body = {
                asunto: req.body.asunto,
                mensaje: req.body.mensaje,
                estado: req.body.estado,
                respuesta: req.body.respuesta,
                idUsuario: req.body.idUsuario,
            };
            mysql_1.default.sendQuery(query, [body.asunto, body.mensaje, body.estado, body.respuesta, body.idUsuario], function (err, data) {
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
        this.update = function (req, res) {
            var body = {
                asunto: req.body.asunto,
                mensaje: req.body.mensaje,
                estado: req.body.estado,
                respuesta: req.body.respuesta,
                idTicket: req.params.id,
            };
            var query = "\n            UPDATE Ticket SET asunto = ?, mensaje = ?, estado = ?, respuesta = ?\n            WHERE idTicket = ?;\n        ";
            mysql_1.default.sendQuery(query, [body.asunto, body.mensaje, body.estado, body.respuesta, body.idTicket], function (err, data) {
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
            var query = "\n            DELETE FROM Ticket WHERE idTicket = ?;\n        ";
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
    TicketController.getInstance = function () {
        return this._instance || (this._instance = new this());
    };
    return TicketController;
}());
exports.default = TicketController;
