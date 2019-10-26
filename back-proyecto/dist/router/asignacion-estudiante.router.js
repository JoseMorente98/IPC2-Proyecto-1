"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var asignacion_estudiante_controller_1 = __importDefault(require("./../controller/asignacion-estudiante.controller"));
var asignacionEstudiante = express_1.Router();
asignacionEstudiante.get('/asignacion-estudiante', asignacion_estudiante_controller_1.default.getInstance().getAll);
asignacionEstudiante.get('/asignacion-estudiante/:id', asignacion_estudiante_controller_1.default.getInstance().getSingle);
asignacionEstudiante.get('/asignacion-estudiante/estudiante/:id', asignacion_estudiante_controller_1.default.getInstance().getCursosByStudent);
asignacionEstudiante.post('/asignacion-estudiante', asignacion_estudiante_controller_1.default.getInstance().create);
asignacionEstudiante.post('/asignacion-estudiante/delete', asignacion_estudiante_controller_1.default.getInstance().delete);
exports.default = asignacionEstudiante;
