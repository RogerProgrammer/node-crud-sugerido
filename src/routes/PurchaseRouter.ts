import { Router } from "express";
import { PurchaseController } from '../controllers';
import { validateJsonWebToken } from "../helpers";

export class PurchaseRouter {

    private router: Router;
    private purchaseController: PurchaseController;

    constructor() {
        this.router = Router();
        this.purchaseController = new PurchaseController();
    }
    
    public getRoutes(): Router {
        
        this.router.post('/', validateJsonWebToken, this.purchaseController.create);

        return this.router;
    }
}