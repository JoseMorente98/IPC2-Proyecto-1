import { Router } from "express";
import UsuarioController from "./../controller/actividad.controller"
const actividad = Router();

actividad.get('/actividad', UsuarioController.getInstance().getAll);
actividad.get('/actividad/:id', UsuarioController.getInstance().getSingle);
actividad.get('/actividad/curso/:id', UsuarioController.getInstance().getAllByAsignacion);
actividad.post('/actividad', UsuarioController.getInstance().create);
actividad.put('/actividad/:id', UsuarioController.getInstance().update);
actividad.delete('/actividad/:id', UsuarioController.getInstance().delete);

export default actividad;