import { prisma } from "../prisma.ts";
import { fromCents } from "../utils/money.ts";


async function getDashboard() {

    const usersCount = await prisma.user.count()
    const debts = await prisma.debt.findMany({
        include: {
            payments: true,
            user: true
        }
    })

    let totalDebts = 0;
    let totalPaids = 0;
    let openDebts = 0;
    let paidDebts = 0;


    for (const debt of debts) {

        totalDebts += debt.amount;

        const debtPaid = debt.payments.reduce(
            (total, payment) => total + payment.amount,
            0
        )

        totalPaids += debtPaid

        if (debt.status === "OPEN") {
            openDebts++
        }

        if (debt.status === "PAID") {
            paidDebts++
        }

    }

    const totalRemaining = Math.max(0, totalDebts - totalPaids);

    const debtorsMap = new Map();

    for (const debt of debts) {
        const current = debtorsMap.get(debt.userId)
            || {
            userId: debt.userId,
            name: debt.user.name,
            remaining: 0
        }

        const debtPaid = debt.payments.reduce(
            (total, payment) => total + payment.amount,
            0
        )

        const remaining = Math.max(0, debt.amount - debtPaid)
        current.remaining += remaining;
        debtorsMap.set(debt.userId, current)
    }

    const topDebtors = Array.from(
        debtorsMap.values()
    ).sort(
        (a, b) => b.remaining - a.remaining
    ).slice(0, 5)

    const recentPayments = await prisma.payment.findMany({
        take:5,
        orderBy: {
            createdAt: "desc"
        },
        include: {
            debt:{
                include: {
                    user: true
                }
            }
        }
    })

    return {
        usersCount,
        totalDebts,
        totalPaids,
        totalRemaining,
        openDebts,
        paidDebts,
        topDebtors,
        recentPayments
    }

}



export const dashboardService = { getDashboard };