"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("./../mysql/mysql"));
var CursoController = /** @class */ (function () {
    function CursoController() {
        this.getAll = function (req, res) {
            var query = "\n            SELECT * FROM Curso ORDER BY estado DESC\n        ";
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
            var query = "\n            SELECT * FROM Curso WHERE idCurso = ?\n        ";
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
        this.create = function (req, res) {
            var query = "\n            INSERT INTO Curso(nombre, codigo, estado) VALUES(?, ?, ?)\n        ";
            var body = {
                nombre: req.body.nombre,
                codigo: req.body.codigo,
                estado: req.body.estado
            };
            mysql_1.default.sendQuery(query, [body.nombre, body.codigo, body.estado], function (err, data) {
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
                codigo: req.body.codigo,
                estado: req.body.estado,
                idCurso: req.params.id,
            };
            var query = "\n            UPDATE Curso SET nombre = ?, codigo = ?, estado = ?\n            WHERE idCurso = ?;\n        ";
            mysql_1.default.sendQuery(query, [body.nombre, body.codigo, body.estado, body.idCurso], function (err, data) {
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
            var query = "\n            DELETE FROM Curso WHERE idCurso = ?;\n        ";
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
    CursoController.getInstance = function () {
        return this._instance || (this._instance = new this());
    };
    return CursoController;
}());
exports.default = CursoController;
