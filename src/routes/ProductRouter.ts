import { Router } from "express";
import { check } from "express-validator";
import { fieldsValidator, validateJsonWebToken } from "../helpers";
import { ProductController } from '../controllers';

export class ProductRouter {

    private router: Router;
    private productController: ProductController;

    constructor() {
        this.router = Router();
        this.productController = new ProductController();
    }

    //TODO: EL MIDDLEWARE DE AUTORIZACION RECIBE UN ARRAY DE STRING CON LOS 
    //ROLES PERMITIDOS - USAR ENUM
    
    public getRoutes(): Router {
        
        this.router.get('/', this.productController.show);

        this.router.post('/', [
            validateJsonWebToken,
            check('name', 'El nombre del producto es requerido')
                .not().isEmpty(),
            check('category', 'La categoria del producto es requerida')
                .not().isEmpty(),
            check('price', 'El precio es requerido y debe ser un número')
                .isNumeric(),
            check('quantity', 'La cantidad es requerida y debe ser un número')
                .isNumeric(),
            fieldsValidator
        ], this.productController.create);

        //TODO: EXPLICAR POR QUE PATCH Y NO PUT
        this.router.put('/:id', [
            validateJsonWebToken,
            check('name', 'El nombre del producto no puede ser vacio')
                .optional().not().isEmpty(),
            check('category', 'La categoría del producto no puede ser vacia')
                .optional().not().isEmpty(),
            check('price', 'El precio debe ser un número')
                .optional().isNumeric(),
            check('quantity', 'La cantidad debe ser un número')
                .optional().isNumeric(),
            fieldsValidator
        ], this.productController.update);

        this.router.delete('/:id', validateJsonWebToken, this.productController.delete);

        return this.router;
    }
}