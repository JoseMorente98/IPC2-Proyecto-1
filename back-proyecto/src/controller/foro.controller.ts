import { Request, Response } from 'express';
import MySQL from "./../mysql/mysql";

export default class ForoController {
    private static _instance: ForoController;

    constructor() {
    }

    public static getInstance() {
        return this._instance || ( this._instance = new this() );
    }

    getAll = (req: Request, res: Response) => {
        const query = `
            SELECT * FROM Foro
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
            SELECT * FROM Foro WHERE idForo = ?
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

    getAllByAsignacionAuxiliar = (req: Request, res: Response) => {
        const query = `
            SELECT * FROM Foro WHERE idAsignacionAuxiliar = ?
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
            INSERT INTO Foro(titulo, descripcion, fechaFin, idAsignacionAuxiliar) VALUES(?, ?, ?, ?)
        `;

        let body = {
            titulo: req.body.titulo,
            descripcion: req.body.descripcion,
            fechaFin: req.body.fechaFin,
            idAsignacionAuxiliar: req.body.idAsignacionAuxiliar,
        }
        
        MySQL.sendQuery(query, 
            [body.titulo, body.descripcion, body.fechaFin, body.idAsignacionAuxiliar], 
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

    createHiloForo = (req: Request, res: Response) => {
        const query = `
            CALL SP_CreateHiloForo(?, ?, ?);
        `;

        let body = {
            comentario: req.body.comentario,
            idUsuario: req.body.idUsuario,
            idForo: req.body.idForo,
        }
        
        MySQL.sendQuery(query, 
            [body.comentario, body.idUsuario, body.idForo], 
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
            titulo: req.body.titulo,
            descripcion: req.body.descripcion,
            fechaFin: req.body.fechaFin,
            idAsignacionAuxiliar: req.body.idAsignacionAuxiliar,
            idForo: req.params.id,
        }
    
        const query = `
            UPDATE Foro SET titulo = ?, descripcion = ?, fechaFin = ?, idAsignacionAuxiliar = ?
            WHERE idForo = ?;
        `;
    
        MySQL.sendQuery(query, 
            [body.titulo, body.descripcion, body.fechaFin, body.idAsignacionAuxiliar, body.idForo],
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
            DELETE FROM Foro WHERE idForo = ?;
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