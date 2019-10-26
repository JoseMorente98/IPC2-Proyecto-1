import { Router } from "express";
import UsuarioController from "./../controller/asignacion-auxiliar.controller"
const asignacionAuxiliar = Router();

asignacionAuxiliar.get('/asignacion-auxiliar', UsuarioController.getInstance().getAll);
asignacionAuxiliar.get('/asignacion-auxiliar/:id', UsuarioController.getInstance().getSingle);
asignacionAuxiliar.get('/asignacion-auxiliar/curso/:id', UsuarioController.getInstance().getAuxiliar);
asignacionAuxiliar.get('/asignacion-auxiliar/auxiliar/:id', UsuarioController.getInstance().getCursosByAuxiliar);
asignacionAuxiliar.post('/asignacion-auxiliar', UsuarioController.getInstance().create);
asignacionAuxiliar.put('/asignacion-auxiliar/:id', UsuarioController.getInstance().update);
asignacionAuxiliar.put('/asignacion-auxiliar/delete/:id', UsuarioController.getInstance().deleteAsignacion);

export default asignacionAuxiliar;