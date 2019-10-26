"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var foro_controller_1 = __importDefault(require("./../controller/foro.controller"));
var foro = express_1.Router();
foro.get('/foro', foro_controller_1.default.getInstance().getAll);
foro.get('/foro/:id', foro_controller_1.default.getInstance().getSingle);
foro.get('/foro/asignacion/:id', foro_controller_1.default.getInstance().getAllByDetalleCurso);
foro.get('/foro/comments/:id', foro_controller_1.default.getInstance().getAllResponseByForo);
foro.post('/foro', foro_controller_1.default.getInstance().create);
foro.post('/foro/hilo', foro_controller_1.default.getInstance().createHiloForo);
foro.put('/foro/:id', foro_controller_1.default.getInstance().update);
foro.delete('/foro/:id', foro_controller_1.default.getInstance().delete);
exports.default = foro;
