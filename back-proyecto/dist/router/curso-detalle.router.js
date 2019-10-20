"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var curso_detalle_controller_1 = __importDefault(require("./../controller/curso-detalle.controller"));
var cursoDetalle = express_1.Router();
cursoDetalle.get('/curso-detalle', curso_detalle_controller_1.default.getInstance().getAll);
cursoDetalle.get('/curso-detalle/:id', curso_detalle_controller_1.default.getInstance().getSingle);
cursoDetalle.post('/curso-detalle', curso_detalle_controller_1.default.getInstance().create);
cursoDetalle.put('/curso-detalle/:id', curso_detalle_controller_1.default.getInstance().update);
cursoDetalle.delete('/curso-detalle/:id', curso_detalle_controller_1.default.getInstance().delete);
exports.default = cursoDetalle;
