import { Router } from "express";
import UsuarioController from "./../controller/usuario.controller"
const usuario = Router();

usuario.post('/auth', UsuarioController.getInstance().auth);
usuario.get('/usuario', UsuarioController.getInstance().getAll);
usuario.get('/usuario/:id', UsuarioController.getInstance().getSingle);
usuario.post('/usuario', UsuarioController.getInstance().create);
usuario.put('/usuario', UsuarioController.getInstance().update);
usuario.delete('/usuario', UsuarioController.getInstance().delete);

export default usuario;