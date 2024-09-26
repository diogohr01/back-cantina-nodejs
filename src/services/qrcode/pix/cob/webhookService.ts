import prismaClient from "../../../../prisma";
import EfiPay from 'sdk-node-apis-efi';
import options from '../../credentials';


class webhookService {
    async execute() {
    options['validateMtls'] = false
    

let body = {
	webhookUrl: 'https://webhook.site/d92b459e-1119-4b61-a791-d41e822aeef1'
}

let params = {
	chave: '1d9f5990-5271-4ae6-8c30-fa38d1661883',
}

const efipay = new EfiPay(options)

const response = efipay.pixConfigWebhook(params, body)
return response;
}


}
export { webhookService };
