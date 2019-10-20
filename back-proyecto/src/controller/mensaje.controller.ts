import { Request, Response } from 'express';
import MySQL from "./../mysql/mysql";

export default class MensajeController {
    private static _instance: MensajeController;

    constructor() {
    }

    public static getInstance() {
        return this._instance || ( this._instance = new this() );
    }

    getAll = (req: Request, res: Response) => {
        const query = `
            SELECT * FROM Mensaje
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
            SELECT * FROM Mensaje WHERE idMensaje = ?
        `;

        let body = {
            idMensaje : req.params.id
        }

        MySQL.sendQuery(query, body.idMensaje, (err:any, data:Object[]) => {
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

    getMessageUser = (req: Request, res: Response) => {
        const query = `
            SELECT Usuario.nombre, Usuario.apellido, Usuario.email, Usuario.idUsuario as 'Receptor' FROM Mensaje
            INNER JOIN Usuario ON Mensaje.idUsuario2 = Usuario.idUsuario
            WHERE idUsuario1 = ?
            UNION
            SELECT Usuario.nombre, Usuario.apellido, Usuario.email, Usuario.idUsuario as 'Receptor' FROM Mensaje
            INNER JOIN Usuario ON Mensaje.idUsuario1 = Usuario.idUsuario
            WHERE idUsuario2 = ?
            ORDER BY Receptor;
        `;

        let body = {
            idUsuario : req.params.id
        }

        MySQL.sendQuery(query, [body.idUsuario, body.idUsuario], (err:any, data:Object[]) => {
            if(err) {
                res.json([])
            } else {
                res.json(data)
            }
        })
    }

    getMessages = (req: Request, res: Response) => {
        const query = `
        SELECT Mensaje.idUsuario1, Mensaje.idUsuario2, Mensaje.idMensaje, Mensaje.Asunto, DetalleMensaje.Cuerpo, DetalleMensaje.Archivo FROM DetalleMensaje
        INNER JOIN Mensaje ON DetalleMensaje.idMensaje = Mensaje.idMensaje
        WHERE idUsuario1 = ? AND idUsuario2 = ?
        UNION 
        SELECT Mensaje.idUsuario1, Mensaje.idUsuario2, Mensaje.idMensaje, Mensaje.Asunto, DetalleMensaje.Cuerpo, DetalleMensaje.Archivo FROM DetalleMensaje
        INNER JOIN Mensaje ON DetalleMensaje.idMensaje = Mensaje.idMensaje
        WHERE idUsuario1 = ? AND idUsuario2 = ?;
        `;

        let body = {
            idUsuario1 : req.params.id,
            idUsuario2 : req.params.id2,
        }

        MySQL.sendQuery(query, [body.idUsuario1, body.idUsuario2, body.idUsuario2, body.idUsuario1], (err:any, data:Object[]) => {
            if(err) {
                res.json([])
            } else {
                res.json(data)
            }
        })
    }

    create = (req: Request, res: Response) => {
        const query = `
            CALL SP_CreateMensaje(?, ?, ?, ?, ?);
        `;

        let body = {
            usuario1: req.body.usuario1,
            usuario2: req.body.usuario2,
            asunto: req.body.asunto,
            mensaje: req.body.mensaje,
            file: req.body.file
        }
        
        MySQL.sendQuery(query, 
            [body.usuario1, body.usuario2, body.asunto, body.mensaje, body.file], 
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
            DELETE FROM Mensaje WHERE idMensaje = ?;
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