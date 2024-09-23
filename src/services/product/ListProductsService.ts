import prismaClient from "../../prisma";



class ListByProductsService{
    async execute(){
        const products = await prismaClient.product.findMany({
            select:{
                  id: true,
                  name: true,
                  price: true,
                  description: true,
                  banner: true,
                  category_id: true,
                
            }
        })
        return products;
    }
}

export {ListByProductsService}