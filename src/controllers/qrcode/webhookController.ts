import { Request, Response } from "express";
import { webhookService } from "../../services/qrcode/pix/cob/webhookService";


class webhookController{
      async handle(req: Request, res: Response){
            const sendWebhook = new webhookService();

            const webhook = await sendWebhook.execute()

            return res.json(webhook)
      }
}

export {webhookController}