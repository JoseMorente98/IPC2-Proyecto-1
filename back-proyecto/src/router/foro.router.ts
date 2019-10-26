import { Router } from "express";
import UsuarioController from "./../controller/foro.controller"
const foro = Router();

foro.get('/foro', UsuarioController.getInstance().getAll);
foro.get('/foro/:id', UsuarioController.getInstance().getSingle);
foro.get('/foro/asignacion/:id', UsuarioController.getInstance().getAllByDetalleCurso);
foro.get('/foro/comments/:id', UsuarioController.getInstance().getAllResponseByForo);
foro.post('/foro', UsuarioController.getInstance().create);
foro.post('/foro/hilo', UsuarioController.getInstance().createHiloForo);
foro.put('/foro/:id', UsuarioController.getInstance().update);
foro.delete('/foro/:id', UsuarioController.getInstance().delete);

export default foro;