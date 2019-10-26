import { Request, Response } from 'express';
import MySQL from "./../mysql/mysql";

export default class CursoDetalleController {
    private static _instance: CursoDetalleController;

    constructor() {
    }

    public static getInstance() {
        return this._instance || ( this._instance = new this() );
    }

    getAll = (req: Request, res: Response) => {
        const query = `
            SELECT idDetalleCurso, semestre, anio, horaInicio, horaFin, fechaFin, Curso.nombre, Curso.codigo, seccion.nombre AS 'seccion'
            FROM DetalleCurso 
            INNER JOIN Curso on DetalleCurso.idCurso = Curso.idCurso
            INNER JOIN Seccion on DetalleCurso.idSeccion = Seccion.idSeccion;
        `;

        MySQL.getQuery(query, (err:any, data:Object[]) => {
            if(err) {
                res.json([]);
            } else {
                res.json(data);
            }
        })
    }

    getSingle = (req: Request, res: Response) => {
        const query = `
            SELECT * FROM DetalleCurso WHERE idDetalleCurso = ?
        `;

        let body = {
            idDetalleCurso : req.params.id
        }

        MySQL.sendQuery(query, body.idDetalleCurso, (err:any, data:Object[]) => {
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
            CALL SP_CreateDetalleCurso(?, ?, ?, ?, ?, ?, ?);
        `;

        let body = {
            semestre: req.body.semestre,
            anio: req.body.anio,
            horaInicio: req.body.horaInicio,
            horaFin: req.body.horaFin,
            fechaFin: req.body.fechaFin,
            idCurso: req.body.idCurso,
            idSeccion: req.body.idSeccion,
        }
        
        MySQL.sendQuery(query, 
            [body.semestre, body.anio, body.horaInicio, body.horaFin, body.fechaFin, body.idCurso, body.idSeccion], 
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
                    data: data[0]
                })
            }
        })
    }

    update = (req: Request, res: Response) => {    
        let body = {
            semestre: req.body.semestre,
            anio: req.body.anio,
            horaInicio: req.body.horaInicio,
            horaFin: req.body.horaFin,
            fechaFin: req.body.fechaFin,
            idCurso: req.body.idCurso,
            idSeccion: req.body.idSeccion,
            idDetalleCurso: req.params.id,
        }

        const query = `
            CALL SP_UpdateDetalleCurso(?, ?, ?, ?, ?, ?, ?, ?);
        `;
    
        MySQL.sendQuery(query, 
            [body.semestre, body.anio, body.horaInicio, body.horaFin, body.fechaFin, body.idCurso, body.idSeccion, body.idDetalleCurso], 
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
                    status: 200
                })
            }
        })
    }

    delete = (req: Request, res: Response) => {
        const id = req.params.id;

        const query = `
            CALL SP_DeleteDetalleCurso(?);
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
                    data: data[0]
                })
            }
        })
    }
}