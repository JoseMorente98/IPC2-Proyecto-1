"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var tipo_usuario_controller_1 = __importDefault(require("./../controller/tipo-usuario.controller"));
var tipoUsuario = express_1.Router();
tipoUsuario.get('/tipo-usuario', tipo_usuario_controller_1.default.getInstance().getAll);
tipoUsuario.get('/tipo-usuario/:id', tipo_usuario_controller_1.default.getInstance().getSingle);
tipoUsuario.post('/tipo-usuario', tipo_usuario_controller_1.default.getInstance().create);
exports.default = tipoUsuario;
