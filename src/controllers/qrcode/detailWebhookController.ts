import { Request, Response } from "express";
import { webhookService } from "../../services/qrcode/pix/cob/webhookService";
import { detailWebhookService } from "../../services/qrcode/pix/cob/detailWebhookService";


class detailWebhookController{
      async handle(req: Request, res: Response){
            const detailWebhook = new detailWebhookService();

            const webhook = await detailWebhook.execute()

            return res.json(webhook)
      }
}

export {detailWebhookController}