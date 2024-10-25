import prismaClient from "../../prisma";

interface OrderRequest {
  order_id: string;
}

class ListProductByOrderService {
  async execute({ order_id }: OrderRequest) {
    const findByOrder = await prismaClient.item.findMany({
      include: {
        produto: true, 
      },
      where: {
        order_id: order_id,
      },
    });

    const produtosArray = findByOrder.map((item) => {
      return {
        id: item.produto.id, 
        produto: item.produto.name, 
        quantidade: item.amount, 
        price: item.produto.price, 
      };
    });

    return produtosArray;
  }
}

export { ListProductByOrderService };
