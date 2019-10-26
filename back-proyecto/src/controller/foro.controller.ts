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
            idForo : req.params.id
        }

        MySQL.sendQuery(query, body.idForo, (err:any, data:Object[]) => {
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

    getAllByDetalleCurso = (req: Request, res: Response) => {
        const query = `
        SELECT idForo, titulo, descripcion, date(fechaFin) as 'fecha', time(fechaFin) as 'hora',
        idDetalleCurso FROM Foro WHERE idDetalleCurso = ?
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

    getAllResponseByForo = (req: Request, res: Response) => {
        const query = `
            SELECT idDetalleForo, comentario, Usuario.idUsuario, idForo, Usuario.nombre, Usuario.apellido FROM DetalleForo
            INNER JOIN Usuario ON DetalleForo.idUsuario = Usuario.idUsuario
            WHERE idForo = ?
        `;

        let body = {
            idForo : req.params.id
        }

        MySQL.sendQuery(query, body.idForo, (err:any, data:Object[]) => {
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
            INSERT INTO Foro(titulo, descripcion, fechaFin, idDetalleCurso) VALUES(?, ?, ?, ?)
        `;

        let body = {
            titulo: req.body.titulo,
            descripcion: req.body.descripcion,
            fechaFin: req.body.fechaFin,
            idDetalleCurso: req.body.idDetalleCurso,
        }
        
        MySQL.sendQuery(query, 
            [body.titulo, body.descripcion, body.fechaFin, body.idDetalleCurso], 
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
            idDetalleCurso: req.body.idDetalleCurso,
            idForo: req.params.id,
        }
    
        const query = `
            UPDATE Foro SET titulo = ?, descripcion = ?, fechaFin = ?, idDetalleCurso = ?
            WHERE idForo = ?;
        `;
    
        MySQL.sendQuery(query, 
            [body.titulo, body.descripcion, body.fechaFin, body.idDetalleCurso, body.idForo],
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