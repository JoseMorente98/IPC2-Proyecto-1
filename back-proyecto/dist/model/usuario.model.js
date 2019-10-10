"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("./../mysql/mysql"));
var UsuarioModel = /** @class */ (function () {
    function UsuarioModel() {
    }
    UsuarioModel.getInstance = function () {
        return this._instance || (this._instance = new this());
    };
    UsuarioModel.getAll = function (query, callback) {
        mysql_1.default.getInstance().connection.query(query, function (err, results, fields) {
            if (err) {
                console.log("Error en Query D:");
                console.log(err);
                return callback(err);
            }
            if (results.length === 0) {
                callback("El registro solicitado no existe");
            }
            else {
                callback(null, results);
            }
        });
    };
    UsuarioModel.getSingle = function (query, callback, data) {
        mysql_1.default.getInstance().connection.query(query, [data.idUsuario], function (err, results, fields) {
            if (err) {
                console.log("Error en Query D:");
                console.log(err);
                return callback(err);
            }
            if (results.length === 0) {
                callback("El registro solicitado no existe");
            }
            else {
                callback(null, results);
            }
        });
    };
    return UsuarioModel;
}());
exports.default = UsuarioModel;
