import prismaClient from "../../prisma";

interface DetailRequest{
      order_id: string;
}

class DetaiOrderService{
      async exectute({order_id}: DetailRequest){
            const detail = await prismaClient.item.findMany({
                  where:{
                        order_id: order_id
                  },
                  include:{
                        produto: true,
                        order:true,


                  }
                  
            })
            return detail;
      }
}

export {DetaiOrderService}