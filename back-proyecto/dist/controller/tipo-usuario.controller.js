"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("./../mysql/mysql"));
var TipoUsuarioController = /** @class */ (function () {
    function TipoUsuarioController() {
        this.getAll = function (req, res) {
            var query = "\n            SELECT * FROM TipoUsuario\n        ";
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
            var query = "\n            SELECT * FROM TipoUsuario WHERE idTipoUsuario = ?\n        ";
            var id = req.params.id;
            mysql_1.default.sendQuery(query, id, function (err, data) {
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
            var query = "\n            CALL SP_AsignarRol(?, ?);\n        ";
            var body = {
                idTipoUsuario: req.body.idTipoUsuario,
                idUsuario: req.body.idUsuario
            };
            mysql_1.default.sendQuery(query, [body.idTipoUsuario, body.idUsuario], function (err, data) {
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
    TipoUsuarioController.getInstance = function () {
        return this._instance || (this._instance = new this());
    };
    return TipoUsuarioController;
}());
exports.default = TipoUsuarioController;
