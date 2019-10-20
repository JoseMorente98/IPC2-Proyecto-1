import { Request, Response } from 'express';
import MySQL from "./../mysql/mysql";

export default class TipoUsuarioController {
    private static _instance: TipoUsuarioController;

    constructor() {
    }

    public static getInstance() {
        return this._instance || ( this._instance = new this() );
    }

    getAll = (req: Request, res: Response) => {
        const query = `
            SELECT * FROM TipoUsuario
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
            SELECT * FROM TipoUsuario WHERE idTipoUsuario = ?
        `;

        const id = req.params.id;

        MySQL.sendQuery(query, id, (err:any, data:Object[]) => {
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
            CALL SP_AsignarRol(?, ?);
        `;

        let body = {
            idTipoUsuario: req.body.idTipoUsuario,
            idUsuario: req.body.idUsuario
        }
        
        MySQL.sendQuery(query, 
            [body.idTipoUsuario, body.idUsuario], 
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
                })
            }
        })
    }

}