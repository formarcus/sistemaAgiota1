import { prismaVersion } from "../../generated/prisma/internal/prismaNamespace"
import { prisma } from "../prisma.ts"

async function findAllDebts() {
    return await prisma.debt.findMany({
        include: {
            user: true,
            payments: true
        },
        orderBy: {
            createdAt: "desc"
        }
    })
}

async function findDebtById(id: any) {
    return await prisma.debt.findUnique({
        where: {
            id: id
        },
        include: {
            user: true,
            payments: true
        }
    })
}

async function findDebtsByUserId(userId: any) {
    return await prisma.debt.findMany({
        where: {
            userId
        },
        include: {
            payments: true
        },
        orderBy: {
            createdAt: "desc"
        }
    })
}
async function createDebt(data: any) {
    const user = await prisma.user.findUnique({
        where: {
            id: data.userId
        }
    })

    if (!user) {
        throw new Error(
            "USER_NOT_FOUND"
        );
    }

    if (!user.active) {

        throw new Error(
            "USER_INACTIVE"
        );
    }

    return await prisma.debt.create({
        data: {
            description: data.description,
            amount: data.amount,
            userId: data.userId
        }
    });
}

async function updateDebt(id: any, data: any) {
    return await prisma.debt.update({
        where: {
            id
        },
        data: {
            description: data.description,
            amount: data.amount
        }
    })
}

async function deleteDebt(id: any) {
    return await prisma.debt.delete({
        where: {
            id
        }
    })
}

export const debtService = {
    findAllDebts,
    findDebtById,
    findDebtsByUserId,
    createDebt,
    updateDebt,
    deleteDebt
}