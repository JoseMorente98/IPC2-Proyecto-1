"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ticket_controller_1 = __importDefault(require("./../controller/ticket.controller"));
var ticket = express_1.Router();
ticket.get('/ticket', ticket_controller_1.default.getInstance().getAll);
ticket.get('/ticket/:id', ticket_controller_1.default.getInstance().getSingle);
ticket.get('/ticket/usuario/:id', ticket_controller_1.default.getInstance().getByUsuario);
ticket.post('/ticket', ticket_controller_1.default.getInstance().create);
ticket.put('/ticket/:id', ticket_controller_1.default.getInstance().update);
ticket.delete('/ticket/:id', ticket_controller_1.default.getInstance().delete);
exports.default = ticket;
