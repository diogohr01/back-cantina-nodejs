import prismaClient from "../../prisma";

class ListOrderService {
      async execute(){
            const orders = await prismaClient.order.findMany({
                  
                  orderBy:{
                        created_at: 'desc'
                  }
                  
            })
            orders.slice(10)
            return orders
      }
}

export {ListOrderService}