"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var usuario_controller_1 = __importDefault(require("./../controller/usuario.controller"));
var usuario = express_1.Router();
usuario.post('/auth', usuario_controller_1.default.getInstance().auth);
usuario.get('/usuario', usuario_controller_1.default.getInstance().getAll);
usuario.get('/usuario/:id', usuario_controller_1.default.getInstance().getSingle);
usuario.post('/usuario', usuario_controller_1.default.getInstance().create);
usuario.put('/usuario', usuario_controller_1.default.getInstance().update);
usuario.delete('/usuario', usuario_controller_1.default.getInstance().delete);
exports.default = usuario;
