import { Router } from "express";
import EvaluacionController from "./../controller/evaluacion.controller"
const evaluacion = Router();

evaluacion.get('/evaluacion', EvaluacionController.getInstance().getAll);
evaluacion.get('/evaluacion/:id', EvaluacionController.getInstance().getSingle);
evaluacion.get('/evaluacion/asignacion/:id', EvaluacionController.getInstance().getByDetalleCurso);
evaluacion.post('/evaluacion', EvaluacionController.getInstance().create);
evaluacion.put('/evaluacion/:id', EvaluacionController.getInstance().update);
evaluacion.delete('/evaluacion/:id', EvaluacionController.getInstance().delete);

export default evaluacion;