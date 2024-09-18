import { Request, Response } from "express";
import { SendRankingProductService } from "../../services/dashboard/SendRankingProductService";


class SendRankingProductController{
      async handle(req: Request, res: Response){
            const sendRankingProduct = new SendRankingProductService();

            const RankingProduct = await sendRankingProduct.execute()

            return res.json(RankingProduct)
      }
}

export {SendRankingProductController}