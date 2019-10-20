import { Router } from "express";
import UsuarioController from "./../controller/curso-detalle.controller"
const cursoDetalle = Router();

cursoDetalle.get('/curso-detalle', UsuarioController.getInstance().getAll);
cursoDetalle.get('/curso-detalle/:id', UsuarioController.getInstance().getSingle);
cursoDetalle.post('/curso-detalle', UsuarioController.getInstance().create);
cursoDetalle.put('/curso-detalle/:id', UsuarioController.getInstance().update);
cursoDetalle.delete('/curso-detalle/:id', UsuarioController.getInstance().delete);

export default cursoDetalle;