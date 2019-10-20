import { Request, Response } from 'express';
import MySQL from "./../mysql/mysql";

export default class UsuarioController {
    private static _instance: UsuarioController;

    constructor() {
    }

    public static getInstance() {
        return this._instance || ( this._instance = new this() );
    }

    getAll = (req: Request, res: Response) => {
        const query = `
            SELECT Usuario.idUsuario, Usuario.carnet, Usuario.dpi, Usuario.nombre, Usuario.apellido, Usuario.email 
            FROM Usuario
        `;

        MySQL.getQuery(query, (err:any, data:Object[]) => {
            if(err) {
                res.json([]);
            } else {
                res.json(data)
            }
        })
    }

    getAllAdmin = (req: Request, res: Response) => {
        const query = `
            SELECT Usuario.idUsuario, Usuario.carnet, Usuario.dpi, Usuario.nombre, Usuario.apellido, Usuario.email,
            TipoUsuario.nombre as 'tipo'
            FROM DetalleUsuario
            INNER JOIN Usuario ON DetalleUsuario.idUsuario = Usuario.idUsuario
            INNER JOIN TipoUsuario ON DetalleUsuario.idTipoUsuario = TipoUsuario.idTipoUsuario
            WHERE TipoUsuario.idTipoUsuario = 1;
        `;

        MySQL.getQuery(query, (err:any, data:Object[]) => {
            if(err) {
                res.json([]);
            } else {
                res.json(data)
            }
        })
    }

    getAllAuxiliar = (req: Request, res: Response) => {
        const query = `
            SELECT Usuario.idUsuario, Usuario.carnet, Usuario.dpi, Usuario.nombre, Usuario.apellido, Usuario.email,
            TipoUsuario.nombre as 'tipo'
            FROM DetalleUsuario
            INNER JOIN Usuario ON DetalleUsuario.idUsuario = Usuario.idUsuario
            INNER JOIN TipoUsuario ON DetalleUsuario.idTipoUsuario = TipoUsuario.idTipoUsuario
            WHERE TipoUsuario.idTipoUsuario = 2;
        `;

        MySQL.getQuery(query, (err:any, data:Object[]) => {
            if(err) {
                res.json([]);
            } else {
                res.json(data)
            }
        })
    }

    getAllEstudiante = (req: Request, res: Response) => {
        const query = `
            SELECT Usuario.idUsuario, Usuario.carnet, Usuario.dpi, Usuario.nombre, Usuario.apellido, Usuario.email,
            TipoUsuario.nombre as 'tipo'
            FROM DetalleUsuario
            INNER JOIN Usuario ON DetalleUsuario.idUsuario = Usuario.idUsuario
            INNER JOIN TipoUsuario ON DetalleUsuario.idTipoUsuario = TipoUsuario.idTipoUsuario
            WHERE TipoUsuario.idTipoUsuario = 3;
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
            SELECT *
            FROM Usuario WHERE idUsuario = ?;
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
                res.json(data[0])
            }
        })
    }

    create = (req: Request, res: Response) => {
        const query = `
            CALL SP_CreateUsuario(?, ?, ?, ?, ?, ?, ?);
        `;

        let body = {
            carnet: req.body.carnet,
            dpi: req.body.dpi,
            email: req.body.email,
            password: req.body.password,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            idTipoUsuario: req.body.idTipoUsuario,
        }
        
        MySQL.sendQuery(query, 
            [body.carnet, body.dpi, body.email, body.password, body.nombre, body.apellido, body.idTipoUsuario], 
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

    auth = (req: Request, res: Response) => {
        const query = `
            CALL SP_Autenticar(?, ?);
        `;

        let body = {
            email: req.body.email,
            password: req.body.password
        }
        
        MySQL.sendQuery(query, 
            [body.email, body.password], 
            (err:any, data:Object[]) => {
            if(err) {
                res.status(400).json({
                    ok: false,
                    status: 400,
                    error: err
                });
            } else {
                console.log(data[0])
                res.json(data[0])
            }
        })
    }

    update = (req: Request, res: Response) => {
        let data = {
            id: req.params.id,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            password: req.body.password,
            dpi: req.body.dpi,
            carnet: req.body.carnet,
        }
    
        const query = `
            UPDATE Usuario SET nombre = ?, apellido = ?, email = ?,
                password = ?, dpi = ?, carnet = ?
                WHERE idUsuario = ?;
        `;
    
        MySQL.sendQuery(query, 
            [data.nombre, data.apellido, data.email, data.password, data.dpi, data.carnet, data.id],
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
            DELETE FROM Usuario WHERE idUsuario = ?;
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