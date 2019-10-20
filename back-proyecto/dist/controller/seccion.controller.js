"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("./../mysql/mysql"));
var SeccionController = /** @class */ (function () {
    function SeccionController() {
        this.getAll = function (req, res) {
            var query = "\n            SELECT * FROM Seccion\n        ";
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
            var query = "\n            SELECT * FROM Seccion WHERE idSeccion = ?\n        ";
            var body = {
                idSeccion: req.params.id
            };
            mysql_1.default.sendQuery(query, body.idSeccion, function (err, data) {
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
    }
    SeccionController.getInstance = function () {
        return this._instance || (this._instance = new this());
    };
    return SeccionController;
}());
exports.default = SeccionController;
