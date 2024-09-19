    import prismaClient from "../../prisma";

    interface produtoProps {
        id: string;
        produto: string;
        quantidade: number;
    }

    interface produtoRankingProps {
        produtos: produtoProps[];
    }



    class SendRankingProductService {
        async execute(): Promise<produtoRankingProps> {
            const orders = await prismaClient.item.findMany({
                include: {
                    produto: true,
                    order: true,
                },
                where: {
                    order: {
                        status: true,
                    },
                },
            });

            const produtos: produtoRankingProps = { produtos: [] };
            

            for (const order of orders) {
                if (order.produto.id) {
                    const existingProduct = produtos.produtos.find((p) => p.id === order.produto.id);
                    if (existingProduct) {
                        existingProduct.quantidade++;
                    } else {
                        produtos.produtos.push({ id: order.produto.id, produto: order.produto.name, quantidade: 1 });
                    }
                }
            }
            produtos.produtos.sort((a,b) => b.quantidade - a.quantidade);
            produtos.produtos.slice(0, 10)
            return produtos ;
        }
    }

    export { SendRankingProductService };


    //ooi diogoo