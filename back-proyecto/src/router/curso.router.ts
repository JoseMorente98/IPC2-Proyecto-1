import { Router } from "express";
import UsuarioController from "./../controller/curso.controller"
const curso = Router();

curso.get('/curso', UsuarioController.getInstance().getAll);
curso.get('/curso/:id', UsuarioController.getInstance().getSingle);
curso.post('/curso', UsuarioController.getInstance().create);
curso.put('/curso/:id', UsuarioController.getInstance().update);
curso.delete('/curso/:id', UsuarioController.getInstance().delete);

export default curso;