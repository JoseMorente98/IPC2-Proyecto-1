import { Router } from "express";
import UsuarioController from "./../controller/mensaje.controller"
const mensaje = Router();

mensaje.get('/mensaje', UsuarioController.getInstance().getAll);
mensaje.get('/mensaje/:id', UsuarioController.getInstance().getSingle);
mensaje.get('/mensaje/user/:id', UsuarioController.getInstance().getMessageUser);
mensaje.get('/mensaje/:id/:id2', UsuarioController.getInstance().getMessages);
mensaje.post('/mensaje', UsuarioController.getInstance().create);
mensaje.delete('/mensaje/:id', UsuarioController.getInstance().delete);

export default mensaje;