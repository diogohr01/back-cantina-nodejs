import { Request, Response } from "express";

import { ListOrderService } from "../../services/order/ListOrderService";


class ListOrderController{
      async handle(req: Request, res: Response){
            const listOrders = new ListOrderService();

            const orders = await listOrders.execute()

            return res.json(orders)
      }
}

export {ListOrderController}