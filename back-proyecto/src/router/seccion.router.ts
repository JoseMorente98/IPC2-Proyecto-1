import { Router } from "express";
import UsuarioController from "./../controller/seccion.controller"
const seccion = Router();

seccion.get('/seccion', UsuarioController.getInstance().getAll);
seccion.get('/seccion/:id', UsuarioController.getInstance().getSingle);

export default seccion;