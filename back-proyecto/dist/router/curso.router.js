"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var curso_controller_1 = __importDefault(require("./../controller/curso.controller"));
var curso = express_1.Router();
curso.get('/curso', curso_controller_1.default.getInstance().getAll);
curso.get('/curso/:id', curso_controller_1.default.getInstance().getSingle);
curso.post('/curso', curso_controller_1.default.getInstance().create);
curso.put('/curso/:id', curso_controller_1.default.getInstance().update);
curso.delete('/curso/:id', curso_controller_1.default.getInstance().delete);
exports.default = curso;
