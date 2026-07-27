import { prisma } from "../prisma.ts";

async function findPaymentByDebtId(debtId: any) {
    return await prisma.payment.findMany({
        where: {
            debtId: debtId
        },
        orderBy: {
            createdAt: "desc"
        }
    })
}

async function createPayment(data: any) {
    
    const debt = await prisma.debt.findUnique({
        where: {
            id: data.debtId
        },
        include: {
            payments: true
        }
    })

    if (!debt) {
        throw new Error(
            "DEBT_NOT_FOUND"
        );
    }
    
    if (debt.status === "CANCELLED") {
        throw new Error(
            "DEBT_CANCELLED"
        );
    }

    if (debt.status === "PAID") {
        throw new Error(
            "DEBT_ALREADY_PAID"
        );
    }

    const totalPaid = debt.payments.reduce(
        (total, payment) => total + payment.amount,
        0
    );

    const remaining = debt.amount - totalPaid;

    if (data.amount > remaining) {
        throw new Error(
            "PAYMENT_AMOUNT_EXCEEDS_DEBT"
        );
    }

    const payment = await prisma.payment.create({
        data: {
            amount: data.amount,
            description: data.description,
            debtId: data.debtId
        }
    })

    const newTotalPaid = totalPaid + data.amount;

    if (newTotalPaid === debt.amount) {
        await prisma.debt.update({
            where: {
                id: debt.id
            },
            data: {
                status: "PAID"
            }
        })
    }

    return payment;
}

export const paymentService = {
    findPaymentByDebtId,
    createPayment
}