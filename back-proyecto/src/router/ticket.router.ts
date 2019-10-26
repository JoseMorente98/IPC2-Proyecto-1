import { Router } from "express";
import TicketController from "./../controller/ticket.controller"
const ticket = Router();

ticket.get('/ticket', TicketController.getInstance().getAll);
ticket.get('/ticket/:id', TicketController.getInstance().getSingle);
ticket.get('/ticket/usuario/:id', TicketController.getInstance().getByUsuario);
ticket.post('/ticket', TicketController.getInstance().create);
ticket.put('/ticket/:id', TicketController.getInstance().update);
ticket.delete('/ticket/:id', TicketController.getInstance().delete);

export default ticket;