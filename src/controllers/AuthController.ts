//TODO: DEJAR TODOS LOS ARHCIVOS CON COMILLA SIMPLE
import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import User from "../entities/User";
import { JsonWebTokenPayload } from "../interfaces/JWTInterface";
import { generateToken, passwordEncrypter } from "../helpers";

//CONSOLE: TOKEN EN EL HEADER DE LA PETICION Authorization
//RENOVAR TOKEN CADA VEZ QUE LO VALIDE

//TODO: RETORNAR TOKEN: NULL CUANDO SEA INCORRECTO

export class AuthController {

    public async login(req: Request, res: Response): Promise<Response> {
        
        const { email, password } = req.body;

        try {            
            const user: User | null = await User.findOne({ where: {email}});

            if (user) {                
                const isValidPassword: boolean = bcryptjs
                    .compareSync(password, user.password);

                if (isValidPassword) {
                    const payload : JsonWebTokenPayload = {
                        id: user.id
                    }

                    const token = generateToken(payload, process.env.SECRET_KEY!);

                    return res.json({ message: 'Usuario autenticado correctamente', token });
                }
                
                return res.status(403).json({ message: "Usuario y/o contraseña incorrectos", 
                    token: '' });
            } 

            return res.status(403).json({ 
                message: "Usuario y/o contraseña incorrectos", 
                token: '' });

        } catch (err) {
            console.error("Error durante el login: ",err);
            return res.status(500).json({ 
                message: "Error en el servidor, comuniquese con un administrador", 
                token: null 
            });
        }
        
    }

    //TODO: CAMBIAR A CREATE
    public async register(req: Request, res: Response): Promise<Response> {
        
        const { name, email, password, money } = req.body;

        try {
            const user: User | null = await User.findOne({ where: {email}});

            if(user) {
                return res.json({
                     message: `El usuario con correo ${email} ya se encuentra registrado`, 
                     token: '' });
            }

            const encryptedPassword: string = passwordEncrypter(password);

            const newUser: User = new User();

            newUser.name = name;
            newUser.email = email;
            newUser.password = encryptedPassword;
            newUser.money = money;

            await newUser.save();

            const payload : JsonWebTokenPayload = {
                id: newUser.id
            }

            const token = generateToken(payload, process.env.SECRET_KEY!);

            return res.json({ message: "Usuario creado correctamente", token });

        }catch (err) {
            console.error("Error creando usuario: ", err);
            return res.status(500).json({ 
                message: "Error en el servidor, comuniquese con un administrador", 
                token: '' });
        }
        
    }
}





//TODO: LOGGER EN TODOS CONSOLE
