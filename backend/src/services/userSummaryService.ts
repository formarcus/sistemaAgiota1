import {prisma} from "../prisma.ts"

async function getUserSummary(userId: any) {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        },
        include: {
            debts: {
                include: {
                    payments: true
                }
            }
        }
    });

    if(!user) {
        throw new Error("USER_NOT_FOUND");
    }

    let totalDebts = 0;
    let totalPaid = 0;
    let openDebts = 0;
    let paidDebts = 0;

    for(const debt of user.debts) {
        totalDebts += debt.amount;

        const debtPaid = debt.payments.reduce(
            (total, payment) => { return (total+ payment.amount)},
            0            
        );

        totalPaid += debtPaid;

        if(debt.status === "OPEN") {
            openDebts++;
        } else if(debt.status === "PAID") {
            paidDebts++;
        }

        const totalRemaining =  Math.max(totalDebts - totalPaid);

        return {
            user: {
                id: user.id,
                name: user.name,
            },
            summary: {
                totalDebts,
                totalPaid,
                totalRemaining,
                openDebts,
                paidDebts
            }
        }
    }
}

export const userSummaryService = {
    getUserSummary
}