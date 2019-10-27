import { Request, Response } from 'express';
import MySQL from "./../mysql/mysql";

export default class EvaluacionController {
    private static _instance: EvaluacionController;

    constructor() {
    }

    public static getInstance() {
        return this._instance || ( this._instance = new this() );
    }

    getAll = (req: Request, res: Response) => {
        const query = `
            SELECT * FROM Evaluacion
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
            SELECT * FROM Evaluacion WHERE idEvaluacion = ?
        `;

        let body = {
            idEvaluacion : req.params.id
        }

        MySQL.sendQuery(query, body.idEvaluacion, (err:any, data:Object[]) => {
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

    getByDetalleCurso = (req: Request, res: Response) => {
        const query = `
            SELECT * FROM Evaluacion WHERE idDetalleCurso = ?
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
                res.json(data)
            }
        })
    }

    create = (req: Request, res: Response) => {
        const query = `
            INSERT INTO Evaluacion(nombre, punteo, idDetalleCurso, habilitar, aleatorio) VALUES(?, ?, ?, 1, 1)
        `;

        let body = {
            nombre: req.body.nombre,
            punteo: req.body.punteo,
            idDetalleCurso: req.body.idDetalleCurso,
        }
        
        MySQL.sendQuery(query, 
            [body.nombre, body.punteo, body.idDetalleCurso], 
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
        let body = {
            nombre: req.body.nombre,
            punteo: req.body.punteo,
            habilitar: req.body.habilitar,
            aleatorio: req.body.aleatorio,
            idEvaluacion: req.params.id,
        }
    
        const query = `
            UPDATE Evaluacion SET nombre = ?, punteo = ?, habilitar = ?, aleatorio = ?
            WHERE idEvaluacion = ?;
        `;
    
        MySQL.sendQuery(query, 
            [body.nombre, body.punteo, body.habilitar, body.aleatorio, body.idEvaluacion],
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
            DELETE FROM Evaluacion WHERE idEvaluacion = ?;
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