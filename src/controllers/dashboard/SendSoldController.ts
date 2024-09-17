import { Request, Response } from "express";
import { SendSoldService } from "../../services/dashboard/SendSoldService";


class SendSoldController{
      async handle(req: Request, res: Response){
            const sendSold = new SendSoldService();

            const sold = await sendSold.execute()

            return res.json(sold)
      }
}

export {SendSoldController}