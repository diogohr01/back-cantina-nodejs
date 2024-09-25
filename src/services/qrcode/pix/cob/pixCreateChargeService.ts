import prismaClient from "../../../../prisma";
import EfiPay from 'sdk-node-apis-efi';
import options from '../../credentials';

interface CreatePixOrderRequest {

    order_id: string;
    cpf: string;
    username: string;
}

class CreatePixOrderService {
    async execute({ order_id, cpf, username }: CreatePixOrderRequest) {
    
        const order = await prismaClient.order.findUnique({
            where: {
                id: order_id
            },
            include: {
                items: {
                    include: {
                        produto: true,  
                    }
                },
            }
        });

        if (!order) {
            throw new Error("Itens não encontrados");
        }


        let totalPedido = 0
        for (const item of order.items) {
            totalPedido += Number(item.produto.price) * item.amount
        }
        let valorTotal =  totalPedido.toFixed(2)
       
        let body = {
            calendario: {
                expiracao: 3600,
            },
            devedor: {
                cpf: cpf ,
                nome: username,
            },
            valor: {
                original: valorTotal,  
            },
            chave: '1d9f5990-5271-4ae6-8c30-fa38d1661883', 
            infoAdicionais: [
                {
                    nome: 'Pagamento em',
                    valor: 'Cantina - senai',
                },
                {
                    nome: 'Pedido',
                    valor: String(order.table),  
                },
            ],
        };
       
        const efipay = new EfiPay(options);
        try {
            const response = await efipay.pixCreateImmediateCharge({}, body);

            return { pixResponse: response };

        } catch (error) {
            console.error("Erro ao criar cobrança Pix:", error);
            throw new Error("Erro ao criar cobrança Pix.");
              }
             }

}

export { CreatePixOrderService };
