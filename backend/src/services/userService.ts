import {prisma} from "../prisma.ts"
import { fromCents } from "../utils/money.ts"

async function findAllUsers(){
    return await prisma.user.findMany({
        orderBy: {
            createdAt: "desc"
        }
    })
}

async function findUserById(id:any) {
    return await prisma.user.findUnique({
        where: {
            id
        }
    });
}

async function createUser(data:any) {
    return await prisma.user.create({
        data: {
            name: data.name,
            phone: data.phone || null,
            email: data.email || null
        }
    })
}

async function updateUser(id:any, data:any) {

    return await prisma.user.update({
        where: {
            id
        },
        data: {
            name: data.name,
            phone: data.phone || null,
            email: data.email || null
        }
    })    
}

async function deleteUser(id:any) {
    return await prisma.user.delete({
        where: {
            id
        }
    });
}
async function getUserSummary(id: any) {

    const user = await prisma.user.findUnique({
        where: {
            id
        },
        include: {
            debts: {
                include: {
                    payments: true
                }
            }
        }
    });

    if (!user) {
        return null;
    }

    let totalDebts = 0;
    let totalPaid = 0;

    for (const debt of user.debts) {

        totalDebts += debt.amount;

        for (const payment of debt.payments) {
            totalPaid += payment.amount;
        }
    }

    return {
        user: {
            id: user.id,
            name: user.name,
            phone: user.phone,
            email: user.email
        },

        totalDebts: fromCents(totalDebts),

        totalPaid: fromCents(totalPaid),

        totalOwed: fromCents(
            totalDebts - totalPaid
        )
    };
}

async function getUserDebts(id:any) {
    
    const userId = Number(id)

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    const debts = await prisma.debt.findMany({
        where:{
            userId: userId
        },
        include: {
            payments: true
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    const result = debts.map(debt => {
        const totalPaid = debt.payments.reduce(
            (total, payment) => total + payment.amount,
            0
        )
        
        const totalOwed = debt.amount - totalPaid

        return {
            id: debt.id,
            description: debt.description,
            amount: fromCents(debt.amount),
            totalPaid: fromCents(totalPaid),
            totalOwed: fromCents(totalOwed),
            dueDate: debt.dueDate,
            status: totalOwed === 0 ? "PAID":"OPEN" 
        }
    })

    return result
}

async function deactivateUser(id:any) {
    return await prisma.user.update({
        where: {
            id
        },
        data: {
            active: false
        }
    });
}


export const userService = {
   findAllUsers,
    findUserById,
    createUser,
    updateUser,
    deleteUser,
    deactivateUser,
    getUserSummary,
    getUserDebts
}