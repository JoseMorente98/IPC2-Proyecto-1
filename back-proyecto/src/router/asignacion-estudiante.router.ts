import { Router } from "express";
import UsuarioController from "./../controller/asignacion-estudiante.controller"
const asignacionEstudiante = Router();

asignacionEstudiante.get('/asignacion-estudiante', UsuarioController.getInstance().getAll);
asignacionEstudiante.get('/asignacion-estudiante/:id', UsuarioController.getInstance().getSingle);
asignacionEstudiante.get('/asignacion-estudiante/estudiante/:id', UsuarioController.getInstance().getCursosByStudent);
asignacionEstudiante.post('/asignacion-estudiante', UsuarioController.getInstance().create);
asignacionEstudiante.post('/asignacion-estudiante/delete', UsuarioController.getInstance().delete);

export default asignacionEstudiante;