import { Request,Response } from "express";
import { ListByProductsService } from "../../services/product/ListProductsService";

class ListProductController{
    async handle(req: Request, res: Response){
        
        const listProducts = new ListByProductsService();
        
        const products  = await listProducts.execute()
        return res.json(products)
    }
}

export {ListProductController}