import { Request, Response } from 'express';
import MySQL from "./../mysql/mysql";

export default class AsignacionAuxiliarController {
    private static _instance: AsignacionAuxiliarController;

    constructor() {
    }

    public static getInstance() {
        return this._instance || ( this._instance = new this() );
    }

    getAll = (req: Request, res: Response) => {
        const query = `
            SELECT idAsignacionAuxiliar, Usuario.nombre, Usuario.apellido, semestre, anio, horaInicio, 
            horaFin, Curso.nombre as 'curso', Curso.codigo, seccion.nombre as 'seccion' FROM AsignacionAuxiliar
            INNER JOIN Usuario ON AsignacionAuxiliar.idUsuario = Usuario.idUsuario
            INNER JOIN DetalleCurso ON AsignacionAuxiliar.idDetalleCurso = DetalleCurso.idDetalleCurso
            INNER JOIN Curso on DetalleCurso.idCurso = Curso.idCurso
            INNER JOIN Seccion on DetalleCurso.idSeccion = Seccion.idSeccion
            ORDER BY idAsignacionAuxiliar;
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
            SELECT * FROM AsignacionAuxiliar WHERE idAsignacionAuxiliar = ?
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

    create = (req: Request, res: Response) => {
        const query = `
            CALL SP_CreateAsignacionAuxiliar(?, ?);
        `;

        let body = {
            idUsuario: req.body.idUsuario,
            idDetalleCurso: req.body.idDetalleCurso
        }
        
        MySQL.sendQuery(query, 
            [body.idUsuario, body.idDetalleCurso], 
            (err:any, data:Object[]) => {
            if(err) {
                res.status(400).json({
                    ok: false,
                    status: 400,
                    error: err
                });
            } else {
                if(JSON.parse(JSON.stringify(data[0]))[0]._existe == 0) {
                    res.json({
                        ok: true,
                        status: 200
                    })
                } else {
                    res.status(400).json({
                        ok: false,
                        status: 400,
                        error: "Ya existe un registro"
                    });
                }
            }
        })
    }

    update = (req: Request, res: Response) => {    
        let body = {
            idUsuario: req.body.idUsuario,
            idDetalleCurso: req.body.idDetalleCurso,
            idAsignacionAuxiliar: req.params.id,
        }

        const query = `
            CALL SP_UpdateAsignacionAuxiliar(?, ?, ?)
        `;
    
        MySQL.sendQuery(query, 
            [body.idUsuario, body.idDetalleCurso, body.idAsignacionAuxiliar], 
            (err:any, data:Object[]) => {
            if(err) {
                res.status(400).json({
                    ok: false,
                    status: 400,
                    error: err
                });
            } else {
                if(JSON.parse(JSON.stringify(data[0]))[0]._existe == 0) {
                    res.json({
                        ok: true,
                        status: 200
                    })
                } else {
                    res.status(400).json({
                        ok: false,
                        status: 400,
                        error: "Ya existe un registro"
                    });
                }
            }
        })
    }

    delete = (req: Request, res: Response) => {
        const id = req.params.id;

        const query = `
            DELETE FROM AsignacionAuxiliar WHERE idAsignacionAuxiliar = ?
        `;

        MySQL.sendQuery(query, id, (err:any, data:Object[]) => {
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
                })
            }
        })
    }
}