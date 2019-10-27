"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var evaluacion_controller_1 = __importDefault(require("./../controller/evaluacion.controller"));
var evaluacion = express_1.Router();
evaluacion.get('/evaluacion', evaluacion_controller_1.default.getInstance().getAll);
evaluacion.get('/evaluacion/:id', evaluacion_controller_1.default.getInstance().getSingle);
evaluacion.get('/evaluacion/asignacion/:id', evaluacion_controller_1.default.getInstance().getByDetalleCurso);
evaluacion.post('/evaluacion', evaluacion_controller_1.default.getInstance().create);
evaluacion.put('/evaluacion/:id', evaluacion_controller_1.default.getInstance().update);
evaluacion.delete('/evaluacion/:id', evaluacion_controller_1.default.getInstance().delete);
exports.default = evaluacion;
