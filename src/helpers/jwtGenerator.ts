import jwt from "jsonwebtoken";
import { JsonWebTokenPayload } from "../interfaces/JWTInterface";

//TODO: MISMO NOMBRE
export const generateToken = (payload: JsonWebTokenPayload, key: string): string => {

    return jwt.sign(payload, key, {
        //TODO: VARIBALE DE ENTORNO
        expiresIn: '1h'
    });

}