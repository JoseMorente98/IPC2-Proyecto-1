"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var actividad_controller_1 = __importDefault(require("./../controller/actividad.controller"));
var actividad = express_1.Router();
actividad.get('/actividad', actividad_controller_1.default.getInstance().getAll);
actividad.get('/actividad/:id', actividad_controller_1.default.getInstance().getSingle);
actividad.get('/actividad/curso/:id', actividad_controller_1.default.getInstance().getAllByAsignacion);
actividad.post('/actividad', actividad_controller_1.default.getInstance().create);
actividad.put('/actividad/:id', actividad_controller_1.default.getInstance().update);
actividad.delete('/actividad/:id', actividad_controller_1.default.getInstance().delete);
exports.default = actividad;
