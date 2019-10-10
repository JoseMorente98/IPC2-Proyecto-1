"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var server_1 = __importDefault(require("./server/server"));
var mysql_1 = __importDefault(require("./mysql/mysql"));
var tipo_usuario_router_1 = __importDefault(require("./router/tipo-usuario.router"));
var usuario_router_1 = __importDefault(require("./router/usuario.router"));
var server = server_1.default.init(3000);
var api = "/api/";
mysql_1.default.getInstance();
/**
  * CORS ACCESS
  */
server.app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
    if (req.methods == "OPTIONS") {
        res.sendStatus(200);
    }
    else {
        next();
    }
});
/**
 * BODY PARSER
 */
server.app.use(bodyParser.json());
server.app.use(bodyParser.urlencoded({ extended: false }));
/**
 * ROUTER
 */
server.app.use(api, tipo_usuario_router_1.default);
server.app.use(api, usuario_router_1.default);
server.start(function () {
    console.log("Servidor corriendo en el puerto 3000 :D");
});
