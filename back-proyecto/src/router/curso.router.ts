import { Router } from "express";
import CursoController from "./../controller/curso.controller"
const curso = Router();

curso.get('/curso', CursoController.getInstance().getAll);
curso.get('/curso/:id', CursoController.getInstance().getSingle);
curso.post('/curso', CursoController.getInstance().create);
curso.put('/curso/:id', CursoController.getInstance().update);
curso.delete('/curso/:id', CursoController.getInstance().delete);

export default curso;