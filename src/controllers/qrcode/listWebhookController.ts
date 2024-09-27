import { Request, Response } from "express";
import { webhookService } from "../../services/qrcode/pix/cob/webhookService";
import { detailWebhookService } from "../../services/qrcode/pix/cob/detailWebhookService";
import { PixListService } from "../../services/qrcode/pix/cob/pixListWebhookService";


class listPixController{
      async handle(req: Request, res: Response){
            const listPix = new PixListService();

            const webhook = await listPix.execute()

            return res.json(webhook)
      }
}

export {listPixController}