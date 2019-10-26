import { Request, Response } from 'express';
import MySQL from "./../mysql/mysql";

export default class TicketController {
    private static _instance: TicketController;

    constructor() {
    }

    public static getInstance() {
        return this._instance || ( this._instance = new this() );
    }

    getAll = (req: Request, res: Response) => {
        const query = `
            SELECT * FROM Ticket
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
            SELECT * FROM Ticket WHERE idTicket = ?
        `;

        let body = {
            idTicket : req.params.id
        }

        MySQL.sendQuery(query, body.idTicket, (err:any, data:Object[]) => {
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

    getByUsuario = (req: Request, res: Response) => {
        const query = `
            SELECT * FROM Ticket WHERE idUsuario = ?
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
            INSERT INTO Ticket(asunto, mensaje, estado, respuesta, idUsuario) VALUES(?, ?, ?, ?, ?)
        `;

        let body = {
            asunto: req.body.asunto,
            mensaje: req.body.mensaje,
            estado: req.body.estado,
            respuesta: req.body.respuesta,
            idUsuario: req.body.idUsuario,
        }
        
        MySQL.sendQuery(query,  
            [body.asunto, body.mensaje, body.estado, body.respuesta, body.idUsuario], 
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
            asunto: req.body.asunto,
            mensaje: req.body.mensaje,
            estado: req.body.estado,
            respuesta: req.body.respuesta,
            idTicket: req.params.id,
        }
    
        const query = `
            UPDATE Ticket SET asunto = ?, mensaje = ?, estado = ?, respuesta = ?
            WHERE idTicket = ?;
        `;
    
        MySQL.sendQuery(query, 
            [body.asunto, body.mensaje, body.estado, body.respuesta, body.idTicket],
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
            DELETE FROM Ticket WHERE idTicket = ?;
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