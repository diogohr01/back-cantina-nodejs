import { Request,Response } from "express"
import { DetaiOrderService } from "../../services/order/DetailOrderService"

class DetailOrderController{
      async handle(req:Request, res:Response){
            const order_id = req.query.order_id as string;

            const detailOrderService = new DetaiOrderService();

            const order = await detailOrderService.exectute({
                  order_id
            })
            return res.json(order)
      }
}

export {DetailOrderController}