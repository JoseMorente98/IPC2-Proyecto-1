"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var seccion_controller_1 = __importDefault(require("./../controller/seccion.controller"));
var seccion = express_1.Router();
seccion.get('/seccion', seccion_controller_1.default.getInstance().getAll);
seccion.get('/seccion/:id', seccion_controller_1.default.getInstance().getSingle);
exports.default = seccion;
