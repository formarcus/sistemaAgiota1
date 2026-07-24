import {prisma} from "../prisma.ts"
import { toCents, fromCents } from "../utils/money.ts";

async function getDebts(req:any, res:any) {
    try{
        const debts = await prisma.debt.findMany({
            include: {
                user: true,
                payments: true            
            }
        })

        return res.json(debts);
    }
    catch(error){
        console.error(error);

        return res.status(500).json({
            error: "Erro ao buscar dívidas"
        })
    }
}

async function getDebtById(req: any, res: any){
    try {
        const id = Number(req.params.id)

        const debt = await prisma.debt.findUnique({
            where: {
                id: id
            },
            include: {
                user: true,
                payments: true
            }
        })

        if(!debt){
            return res.status(404).json({
                error: "Dívida não encontrada"
            })
        }

        const totalPaid = debt.payments.reduce(
            (total, payment) => total + payment.amount,
            0
        )

        const totalOwed = debt.amount - totalPaid;

        return res.json({
            id: debt.id,
            description: debt.description,
            amount: fromCents(debt.amount),
            dueDate: debt.dueDate,
            createdAt: debt.createdAt,

            user: {
                id: debt.user.id,
                name: debt.user.name
            },

            totalPaid: fromCents(totalPaid),
            totalOwed: fromCents(totalOwed),

            payments: debt.payments.map(payment => ({
                id: payment.id,
                amount: fromCents(payment.amount),
                paidAt: payment.paidAt
            }))
        })

    }
    catch(error){
        console.error(error)

        return res.status(500).json({
            error: "Erro ao buscar dívida"
        })
    }
}

async function getDebtSummary(req:any, res:any) {
    
    try{
        const id = Number(req.params.id)

        const debt = await prisma.debt.findUnique({
            where:{
                id: id
            },
            include: {
                user: true,
                payments: true
            }
        })
        
        if (!debt) {
            return res.status(404).json({
                error: "Dívida não encontrada"
            });
        }

        const totalPaid = debt.payments.reduce(
            (total, payment) => total + payment.amount,
            0
        );


        const totalOwed = debt.amount - totalPaid;

        
        return res.json({
            debtId: debt.id,

            user: {
                id: debt.user.id,
                name: debt.user.name
            },

            description: debt.description,

            totalDebt: fromCents(debt.amount),

            totalPaid: fromCents(totalPaid),

            totalOwed: fromCents(totalOwed),

            status: totalOwed === 0
                ? "PAID"
                : "OPEN"
        });
    }
    catch(error){
        console.error(error)

        return res.satus(500).json({
            error: "Erro ao calcular resumo da dívada"
        })
    }
}

async function getDebtPayment(req:any, res:any) {
    try{
        const debtId = Number(req.params.id)

        const debt = await prisma.debt.findUnique({
            where: {
                id: debtId
            }
        })

        if (!debt) {
            return res.status(404).json({
                error: "Dívida não encontrada"
            });
        }

        const payments = await prisma.payment.findMany({
            where: {
                debtId: debtId
            },
            orderBy: {
                paidAt: "desc"
            }
        });

        return res.json(
            payments.map(payment => ({
                id: payment.id,
                amount: fromCents(payment.amount),
                paidAt: payment.paidAt
            }))
        );
    }
    catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Erro ao buscar pagamentos"
        });
    }
}

async function createDebt(req:any, res: any){
    try {
        const {
            description,
            amount,
            dueDate,
            userId
        } = req.body;

        const user = await prisma.user.findUnique({
            where: {
                id: Number(userId)
            }
        })

        if(!user){
            return res.status(404).json({
                error: "Usuário não encontrado"
            })
        }

        const debt = await prisma.debt.create({
            data: {
                description,
                amount: toCents(amount),
                dueDate: dueDate ? new Date(dueDate) : null,
                userId: Number(userId)
            }
        })

        return res.status(201).json({
            ...debt,
            amount: fromCents(debt.amount)
        })
    }
    catch(error){
        console.error(error)

        return res.status(500).json({
            error: "Erro ao criar dívida"
        })
    }
}

async function updatedDebt(req: any, res:any){
    try{
        const id = Number(req.params.id);

        const {
            description,
            amount,
            dueDate
        } = req.body

        const debt = await prisma.debt.findUnique({
            where: {
                id: id
            },
            include: {
                payments: true
            }
        })

        if(!debt){
            return res.status(404).json({
                error: "Dívida não encontrada"
            })
        }

        const totalPaid = debt.payments.reduce(
            (total, payment) => total + payment.amount,
            0
        )

        const newAmount = toCents(amount)

        if(newAmount < totalPaid){
            return res.status(400).json({
                error: "o valor da dívida não pode ser menor que o total já pago"
            })
        }

        const updatedDebt = await prisma.debt.update({
            where: {
                id: id
            },
            data: {
                description,
                amount: newAmount,
                dueDate: dueDate ? new Date(dueDate) : null
            }
        })

        return res.json({
            ...updatedDebt,
            amount: fromCents(updatedDebt.amount)
        })
    }
    catch(error){
        console.error(error)

        return res.status(500).json({
            error:"Erro ao atualizar dívida"
        })
    }
}

async function deleteDebt(req:any, res:any) {
    try {
        const id = Number(req.params.id)

        const debt = await prisma.debt.findUnique({
            where: {
                id: id
            },
            include: {
                payments: true
            }
        })

        if(!debt){
            return res.status(404).json({
                error: "Dívida não encontrada"
            })
        }

        if(debt.payments.length > 0){
            return res.status(400).json({
                error: "Não é possivel excluir uma dívida que não possui pagamentos"
            })
        }

        await prisma.debt.delete({
            where: {
                id: id
            }
        })

        return res.json({
            message: "Dívida excluída com sucesso"
        })
    }
    catch(error){
        console.error(error)

        return res.status(500).json({
            error: "Erro ao exluir dívida"
        })
    }
}

export { 
    getDebts, 
    getDebtById, 
    getDebtSummary,
    getDebtPayment,
    createDebt, 
    updatedDebt,
    deleteDebt
 }