import { Request,Response } from "express"
import { CreatePixOrderService } from "../../services/qrcode/pix/cob/pixCreateChargeService";

class pixCreateChargeController{
      async handle(req:Request, res:Response){
            const {order_id, cpf, username} = req.body

            const createPixService = new CreatePixOrderService();

            const order = await createPixService.execute({
                  order_id,
                  cpf,
                  username
            })
            return res.json(order)
      }
}

export {pixCreateChargeController}