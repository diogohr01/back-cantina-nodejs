import prismaClient from "../../../../prisma";
import EfiPay from 'sdk-node-apis-efi';
import options from '../../credentials';
import { DateTime } from 'luxon'; // Biblioteca para ajustar o fuso horário

interface CreatePixOrderRequest {
    order_id: string;
    cpf?: string;
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

        let totalVendido = 0

        for(const i of order.items){
           totalVendido += Number(i.produto.price) * i.amount
        }
    



        let body = {
            calendario: {
                expiracao: 3600,
            },
            devedor: {
                cpf: cpf,
                nome: username,
            },
            valor: {
                original: totalVendido.toFixed(2),
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
            const pixResponseId = response.loc.id;
            const qrCodeResponse = await efipay.pixGenerateQRCode({ id: pixResponseId });

            const dueSeconds = 3600; // 1 hora
            const dataCriacaoUTC = response.calendario.criacao
            const dataCriacaoBrasilia = DateTime.fromISO(dataCriacaoUTC, { zone: 'utc' })
                .setZone('America/Sao_Paulo')


            
            const updateOrder = await prismaClient.order.update({
                where: {
                    id: order_id
                },
                data: {
                   
                    paid: true,


                }
            })
        

            if (updateOrder) {
                return {
                   response,
                   qrCodeResponse
                };
            }

        } catch (error) {
            console.error("Erro ao criar cobrança Pix:", error);
            throw new Error("Erro ao criar cobrança Pix.");
        }

    }
    
}

export { CreatePixOrderService };
