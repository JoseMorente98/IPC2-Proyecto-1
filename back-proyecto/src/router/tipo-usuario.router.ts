import { Router } from "express";
import UsuarioController from "./../controller/tipo-usuario.controller"
const tipoUsuario = Router();

tipoUsuario.get('/tipo-usuario', UsuarioController.getInstance().getAll);
tipoUsuario.get('/tipo-usuario/:id', UsuarioController.getInstance().getSingle);
tipoUsuario.post('/tipo-usuario', UsuarioController.getInstance().create);

export default tipoUsuario;