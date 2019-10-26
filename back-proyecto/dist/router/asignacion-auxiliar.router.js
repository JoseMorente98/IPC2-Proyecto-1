"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var asignacion_auxiliar_controller_1 = __importDefault(require("./../controller/asignacion-auxiliar.controller"));
var asignacionAuxiliar = express_1.Router();
asignacionAuxiliar.get('/asignacion-auxiliar', asignacion_auxiliar_controller_1.default.getInstance().getAll);
asignacionAuxiliar.get('/asignacion-auxiliar/:id', asignacion_auxiliar_controller_1.default.getInstance().getSingle);
asignacionAuxiliar.get('/asignacion-auxiliar/curso/:id', asignacion_auxiliar_controller_1.default.getInstance().getAuxiliar);
asignacionAuxiliar.get('/asignacion-auxiliar/auxiliar/:id', asignacion_auxiliar_controller_1.default.getInstance().getCursosByAuxiliar);
asignacionAuxiliar.post('/asignacion-auxiliar', asignacion_auxiliar_controller_1.default.getInstance().create);
asignacionAuxiliar.put('/asignacion-auxiliar/:id', asignacion_auxiliar_controller_1.default.getInstance().update);
asignacionAuxiliar.put('/asignacion-auxiliar/delete/:id', asignacion_auxiliar_controller_1.default.getInstance().deleteAsignacion);
exports.default = asignacionAuxiliar;
