"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mensaje_controller_1 = __importDefault(require("./../controller/mensaje.controller"));
var mensaje = express_1.Router();
mensaje.get('/mensaje', mensaje_controller_1.default.getInstance().getAll);
mensaje.get('/mensaje/:id', mensaje_controller_1.default.getInstance().getSingle);
mensaje.get('/mensaje/user/:id', mensaje_controller_1.default.getInstance().getMessageUser);
mensaje.get('/mensaje/:id/:id2', mensaje_controller_1.default.getInstance().getMessages);
mensaje.post('/mensaje', mensaje_controller_1.default.getInstance().create);
mensaje.delete('/mensaje/:id', mensaje_controller_1.default.getInstance().delete);
exports.default = mensaje;
