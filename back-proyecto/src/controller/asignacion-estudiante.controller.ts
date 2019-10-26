import { Request, Response } from 'express';
import MySQL from "./../mysql/mysql";

export default class AsignacionEstudianteController {
    private static _instance: AsignacionEstudianteController;

    constructor() {
    }

    public static getInstance() {
        return this._instance || ( this._instance = new this() );
    }

    getAll = (req: Request, res: Response) => {
        const query = `
            SELECT idAsignacionEstudiante, AsignacionAuxiliar.idAsignacionAuxiliar, AsignacionAuxiliar.idUsuario, Usuario.nombre, Usuario.apellido,
            DetalleCurso.semestre, DetalleCurso.anio, DetalleCurso.horaInicio, DetalleCurso.horaFin, 
            Curso.nombre as 'curso', Curso.codigo, seccion.nombre as 'seccion' FROM AsignacionEstudiante
            INNER JOIN AsignacionAuxiliar on AsignacionEstudiante.idAsignacionAuxiliar = AsignacionAuxiliar.idAsignacionAuxiliar
            INNER JOIN Usuario ON AsignacionAuxiliar.idUsuario = Usuario.idUsuario
            INNER JOIN DetalleCurso ON AsignacionAuxiliar.idDetalleCurso = DetalleCurso.idDetalleCurso
            INNER JOIN Curso on DetalleCurso.idCurso = Curso.idCurso
            INNER JOIN Seccion on DetalleCurso.idSeccion = Seccion.idSeccion
        `;

        MySQL.getQuery(query, (err:any, data:Object[]) => {
            if(err) {
                res.json([]);
            } else {
                res.json(data)
            }
        })
    }

    getSingle = (req: Request, res: Response) => {
        const query = `
            SELECT * FROM AsignacionEstudiante WHERE idAsignacionEstudiante = ?
        `;

        let body = {
            idCurso : req.params.id
        }

        MySQL.sendQuery(query, body.idCurso, (err:any, data:Object[]) => {
            if(err) {
                res.status(400).json({
                    ok: false,
                    status: 400,
                    error: err
                });
            } else {
                res.json(data[0])
            }
        })
    }

    getCursosByStudent = (req: Request, res: Response) => {
        const query = `
            SELECT idAsignacionEstudiante, DetalleCurso.semestre, DetalleCurso.idDetalleCurso, DetalleCurso.anio, DetalleCurso.horaInicio, DetalleCurso.horaFin, 
            Curso.nombre as 'curso', Curso.codigo, seccion.nombre as 'seccion' FROM AsignacionEstudiante
            INNER JOIN DetalleCurso ON AsignacionEstudiante.idDetalleCurso = DetalleCurso.idDetalleCurso
            INNER JOIN Curso on DetalleCurso.idCurso = Curso.idCurso
            INNER JOIN Seccion on DetalleCurso.idSeccion = Seccion.idSeccion
            WHERE AsignacionEstudiante.idUsuario = ?;
        `;

        let body = {
            idUsuario : req.params.id
        }

        MySQL.sendQuery(query, body.idUsuario, (err:any, data:Object[]) => {
            if(err) {
                res.status(400).json({
                    ok: false,
                    status: 400,
                    error: err
                });
            } else {
                res.json(data)
            }
        })
    }

    create = (req: Request, res: Response) => {
        const query = `
            CALL SP_CreateAsignacionEstudiante(?, ?);
        `;

        let body = {
            idUsuario: req.body.idUsuario,
            idAsignacionAuxiliar: req.body.idAsignacionAuxiliar
        }
        
        MySQL.sendQuery(query, 
            [body.idAsignacionAuxiliar, body.idUsuario], 
            (err:any, data:Object[]) => {
            if(err) {
                res.status(400).json({
                    ok: false,
                    status: 400,
                    error: err
                });
            } else {
                res.json({
                    ok: true,
                    status: 200,
                    res: data[0]
                })
            }
        })
    }

    delete = (req: Request, res: Response) => {
        let body = {
            idDetalleCurso: req.body.idDetalleCurso,
            idAsignacionEstudiante: req.body.idAsignacionEstudiante
        }
        
        const query = `
            CALL SP_DeleteAsignacionEstudiante(?, ?)
        `;

        MySQL.sendQuery(query, [body.idDetalleCurso, body.idAsignacionEstudiante], (err:any, data:Object[]) => {
            if(err) {
                res.status(400).json({
                    ok: false,
                    status: 400,
                    error: err
                });
            } else {
                res.json({
                    ok: true,
                    status: 200,
                    data: data[0]
                })
            }
        })
    }
}