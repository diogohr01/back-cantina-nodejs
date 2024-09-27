import prismaClient from "../../../../prisma";
import EfiPay from 'sdk-typescript-apis-efi';
import options from '../../credentials';


class detailWebhookService {
  async execute() {

    let params = {
      chave: '1d9f5990-5271-4ae6-8c30-fa38d1661883',
    };

    const efipay = new EfiPay(options);
    
    try {
      const response = await efipay.pixDetailWebhook(params);
      
      return response;
    } catch (error) {
      console.error('Error configuring webhook:', error);
      return { status: 'error', message: 'Internal server error.' };
    }
  }
}
export { detailWebhookService };
