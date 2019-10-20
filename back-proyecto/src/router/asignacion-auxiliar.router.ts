import { Router } from "express";
import UsuarioController from "./../controller/asignacion-auxiliar.controller"
const asignacionAuxiliar = Router();

asignacionAuxiliar.get('/asignacion-auxiliar', UsuarioController.getInstance().getAll);
asignacionAuxiliar.get('/asignacion-auxiliar/:id', UsuarioController.getInstance().getSingle);
asignacionAuxiliar.post('/asignacion-auxiliar', UsuarioController.getInstance().create);
asignacionAuxiliar.put('/asignacion-auxiliar/:id', UsuarioController.getInstance().update);
asignacionAuxiliar.delete('/asignacion-auxiliar/:id', UsuarioController.getInstance().delete);

export default asignacionAuxiliar;