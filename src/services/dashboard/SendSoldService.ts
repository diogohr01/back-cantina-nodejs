import prismaClient from "../../prisma";

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

        const totalValue = sold.reduce((total, item) => total + Number(item.produto.price), 0);

        return { totalValue: totalValue };
    }
}

export { SendSoldService };