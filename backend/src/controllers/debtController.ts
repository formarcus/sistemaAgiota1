import { prisma } from "../prisma.ts"
import { toCents, fromCents } from "../utils/money.ts";
import { debtService } from "../services/debtService.ts";

async function getDebts(req: any, res: any) {
    try {

        const debts = await debtService.findAllDebts();
        return res.json(debts);
    }
    catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Erro ao buscar dívidas"
        })
    }
}

async function getDebtById(req: any, res: any) {
    try {

        const id = Number(req.params.id);
        const debt = await debtService.findDebtById(id);

        if (!debt) {
            return res.status(404).json({
                error: "Dívida não encontrada"
            })
        }

        return res.json(debt);

        // const totalPaid = debt.payments.reduce(
        //     (total, payment) => total + payment.amount,
        //     0
        // )

        // const totalOwed = debt.amount - totalPaid;

        // return res.json({
        //     id: debt.id,
        //     description: debt.description,
        //     amount: fromCents(debt.amount),
        //     dueDate: debt.dueDate,
        //     createdAt: debt.createdAt,

        //     user: {
        //         id: debt.user.id,
        //         name: debt.user.name
        //     },

        //     totalPaid: fromCents(totalPaid),
        //     totalOwed: fromCents(totalOwed),

        //     payments: debt.payments.map(payment => ({
        //         id: payment.id,
        //         amount: fromCents(payment.amount),
        //         createdAt: payment.createdAt
        //     }))
        // })

    }
    catch (error) {
        console.error(error)

        return res.status(500).json({
            error: "Erro ao buscar dívida"
        })
    }
}

async function getDebtsByUser(req: any, res: any) {

    try {

        const userId = Number(req.params.userId);
        const debts = await debtService.findDebtsByUserId(userId);

        return res.json(debts);

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            error: "Erro ao buscar dívidas do cliente"

        });
    }
}


async function getDebtSummary(req: any, res: any) {

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
    catch (error) {
        console.error(error)

        return res.satus(500).json({
            error: "Erro ao calcular resumo da dívada"
        })
    }
}

async function getDebtPayment(req: any, res: any) {
    try {
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

async function createDebt(req: any, res: any) {
    try {
        const debt = await debtService.createDebt({
            description: req.body.description,
            amount: req.body.amount,
            userId: Number(req.body.userId)
        });

        return res.status(201).json(debt);
    }
    catch (error: any) {
        console.error(error)

        if (error.message === "USER_NOT_FOUND") {
            return res.status(404).json({
                error: "Cliente não encontrado"

            });
        }


        if (error.message === "USER_INACTIVE") {
            return res.status(400).json({
                error: "Cliente está inativo"
            });
        }

        return res.status(500).json({
            error: "Erro ao criar dívida"
        })
    }
}

async function updatedDebt(req: any, res: any) {
    try {
        const id = Number(req.params.id);
        const debt = await debtService.updateDebt(id, req.body)

        if (!debt) {
            return res.status(404).json({
                error: "Dívida não encontrada"
            })
        }

        return res.json(debt);
        // const totalPaid = debt.payments.reduce(
        //     (total, payment) => total + payment.amount,
        //     0
        // )

        // const newAmount = toCents(amount)

        // if (newAmount < totalPaid) {
        //     return res.status(400).json({
        //         error: "o valor da dívida não pode ser menor que o total já pago"
        //     })
        // }

        // const updatedDebt = await prisma.debt.update({
        //     where: {
        //         id: id
        //     },
        //     data: {
        //         description,
        //         amount: newAmount,
        //         dueDate: dueDate ? new Date(dueDate) : null
        //     }
        // })

        // return res.json({
        //     ...updatedDebt,
        //     amount: fromCents(updatedDebt.amount)
        // })
    }
    catch (error) {
        console.error(error)

        return res.status(500).json({
            error: "Erro ao atualizar dívida"
        })
    }
}

async function deleteDebt(req: any, res: any) {
    try {
        const id = Number(req.params.id)

        await debtService.deleteDebt(id);

        // if (!debt) {
        //     return res.status(404).json({
        //         error: "Dívida não encontrada"
        //     })
        // }

        // if (debt.payments.length > 0) {
        //     return res.status(400).json({
        //         error: "Não é possivel excluir uma dívida que não possui pagamentos"
        //     })
        // }

        // await prisma.debt.delete({
        //     where: {
        //         id: id
        //     }
        // })

        return res.json({
            message: "Dívida excluída com sucesso"
        })
    }
    catch (error) {
        console.error(error)

        return res.status(500).json({
            error: "Erro ao exluir dívida"
        })
    }
}

export {
    getDebts,
    getDebtById,
    getDebtsByUser,
    getDebtSummary,
    getDebtPayment,
    createDebt,
    updatedDebt,
    deleteDebt
}