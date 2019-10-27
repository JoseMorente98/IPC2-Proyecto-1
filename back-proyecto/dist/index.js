"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var server_1 = __importDefault(require("./server/server"));
var mysql_1 = __importDefault(require("./mysql/mysql"));
var tipo_usuario_router_1 = __importDefault(require("./router/tipo-usuario.router"));
var curso_detalle_router_1 = __importDefault(require("./router/curso-detalle.router"));
var asignacion_auxiliar_router_1 = __importDefault(require("./router/asignacion-auxiliar.router"));
var asignacion_estudiante_router_1 = __importDefault(require("./router/asignacion-estudiante.router"));
var usuario_router_1 = __importDefault(require("./router/usuario.router"));
var curso_router_1 = __importDefault(require("./router/curso.router"));
var seccion_router_1 = __importDefault(require("./router/seccion.router"));
var mensaje_router_1 = __importDefault(require("./router/mensaje.router"));
var foro_router_1 = __importDefault(require("./router/foro.router"));
var ticket_router_1 = __importDefault(require("./router/ticket.router"));
var actividad_router_1 = __importDefault(require("./router/actividad.router"));
var evaluacion_router_1 = __importDefault(require("./router/evaluacion.router"));
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
server.app.use(api, curso_router_1.default);
server.app.use(api, seccion_router_1.default);
server.app.use(api, mensaje_router_1.default);
server.app.use(api, foro_router_1.default);
server.app.use(api, actividad_router_1.default);
server.app.use(api, curso_detalle_router_1.default);
server.app.use(api, asignacion_auxiliar_router_1.default);
server.app.use(api, asignacion_estudiante_router_1.default);
server.app.use(api, ticket_router_1.default);
server.app.use(api, evaluacion_router_1.default);
server.start(function () {
    console.log("Servidor corriendo en el puerto 3000 :D");
});
