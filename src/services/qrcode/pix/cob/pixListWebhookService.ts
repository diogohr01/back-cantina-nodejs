import EfiPay from 'sdk-typescript-apis-efi';
import options from '../../credentials';

class PixListService {
  async execute(status?: string) {

    let params: any = {
      inicio: '2023-01-22T16:01:35Z',
      fim: '2025-11-30T20:10:00Z',
      devolucaoPresente: false
    };
 
  
    if (status) {
      const validStatuses = ['EM_PROCESSAMENTO', 'DEVOLVIDO', 'REALIZADO'];
      if (validStatuses.includes(status)) {
        params.status = status;
      } else {
        throw new Error('Status inválido. Use EM_PROCESSAMENTO, DEVOLVIDO, ou REALIZADO.');
      }
    }

    const efipay = new EfiPay(options);

    try {
      const response = await efipay.pixSendList(params);
      return response;
    } catch (error) {
      console.error('Erro ao chamar pixSendList:', error);
      return {
        status: 'error',
        message: 'Erro ao tentar obter lista de envios do Pix',
        error: error.response?.data || error.message || error,
      };
    }
  }
}

export { PixListService };6