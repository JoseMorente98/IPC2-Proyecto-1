"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("./../mysql/mysql"));
var EvaluacionController = /** @class */ (function () {
    function EvaluacionController() {
        this.getAll = function (req, res) {
            var query = "\n            SELECT * FROM Evaluacion\n        ";
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
            var query = "\n            SELECT * FROM Evaluacion WHERE idEvaluacion = ?\n        ";
            var body = {
                idEvaluacion: req.params.id
            };
            mysql_1.default.sendQuery(query, body.idEvaluacion, function (err, data) {
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
        this.getByDetalleCurso = function (req, res) {
            var query = "\n            SELECT * FROM Evaluacion WHERE idDetalleCurso = ?\n        ";
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
        this.create = function (req, res) {
            var query = "\n            INSERT INTO Evaluacion(nombre, punteo, idDetalleCurso, habilitar, aleatorio) VALUES(?, ?, ?, 1, 1)\n        ";
            var body = {
                nombre: req.body.nombre,
                punteo: req.body.punteo,
                idDetalleCurso: req.body.idDetalleCurso,
            };
            mysql_1.default.sendQuery(query, [body.nombre, body.punteo, body.idDetalleCurso], function (err, data) {
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
                nombre: req.body.nombre,
                punteo: req.body.punteo,
                habilitar: req.body.habilitar,
                aleatorio: req.body.aleatorio,
                idEvaluacion: req.params.id,
            };
            var query = "\n            UPDATE Evaluacion SET nombre = ?, punteo = ?, habilitar = ?, aleatorio = ?\n            WHERE idEvaluacion = ?;\n        ";
            mysql_1.default.sendQuery(query, [body.nombre, body.punteo, body.habilitar, body.aleatorio, body.idEvaluacion], function (err, data) {
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
            var query = "\n            DELETE FROM Evaluacion WHERE idEvaluacion = ?;\n        ";
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
    EvaluacionController.getInstance = function () {
        return this._instance || (this._instance = new this());
    };
    return EvaluacionController;
}());
exports.default = EvaluacionController;
