import { Request, Response } from 'express';
import MySQL from "./../mysql/mysql";

export default class ActividadController {
    private static _instance: ActividadController;

    constructor() {
    }

    public static getInstance() {
        return this._instance || ( this._instance = new this() );
    }

    getAll = (req: Request, res: Response) => {
        const query = `
            SELECT * FROM Actividad
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
            SELECT * FROM Actividad WHERE idActividad = ?
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

    getAllByAsignacion = (req: Request, res: Response) => {
        const query = `
            SELECT * FROM Actividad WHERE idDetalleCurso = ?
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
                res.json(data)
            }
        })
    }

    create = (req: Request, res: Response) => {
        const query = `
            INSERT INTO Actividad(idDetalleCurso, nombre, fechaLimite, ponderacion, estado) VALUES(?, ?, ?, ?, ?)
        `;

        let body = {
            idDetalleCurso: req.body.idDetalleCurso,
            nombre: req.body.nombre,
            fechaLimite: req.body.fechaLimite,
            ponderacion: req.body.ponderacion,
            estado: req.body.estado
        }
        
        MySQL.sendQuery(query, 
            [body.idDetalleCurso, body.nombre, body.fechaLimite, body.ponderacion, body.estado], 
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

    update = (req: Request, res: Response) => {
        const query = `
            UPDATE Actividad SET idDetalleCurso = ?, nombre = ?, fechaLimite = ?, ponderacion = ?, estado = ?
            WHERE idActividad = ?;
        `;

        let body = {
            idDetalleCurso: req.body.idDetalleCurso,
            nombre: req.body.nombre,
            fechaLimite: req.body.fechaLimite,
            ponderacion: req.body.ponderacion,
            estado: req.body.estado,
            idActividad: req.params.id
        }
    
        MySQL.sendQuery(query, 
            [body.idDetalleCurso, body.nombre, body.fechaLimite, body.ponderacion, body.estado, body.idActividad],
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
            DELETE FROM Actividad WHERE idActividad = ?;
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