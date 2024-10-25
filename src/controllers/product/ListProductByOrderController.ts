import { Request,Response } from "express";
import { ListProductByOrderService } from "../../services/product/ListProductByOrderService";

class ListProductByOrderController{
    async handle(req: Request, res: Response){
      const order_id = req.query.order_id as string;
        const listProducts = new ListProductByOrderService();
        
        const products  = await listProducts.execute(
            {
                  order_id
            }
        )
        return res.json(products)
    }
}

export {ListProductByOrderController}