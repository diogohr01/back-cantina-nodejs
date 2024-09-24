import prismaClient from "../../prisma";
const EfiPay = require('sdk-node-apis-efi')


class SendSoldService {
    async execute() {
        const sold = await prismaClient.item.findMany({
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

        console.log(sold)
        const totalValue = sold.reduce((total, item) => total + Number(item.produto.price) * item.amount , 0);

        return { totalValue: totalValue };
    }
}

export { SendSoldService };

//diogo