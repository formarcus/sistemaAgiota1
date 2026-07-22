import {prisma} from "../prisma.ts"

async function createPayment(req:any, res:any) {
    try{
        const {
            amount,
            debtId
        } = req.body;

        const debt = await prisma.debt.findUnique({
            where: {
                id: Number(debtId)
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

        const remaining = debt.amount - totalPaid

        if(Number(amount) > remaining){
            return res.status(400).json({
                error: "O pagamento é maior que o saldo da dívida"
            })
        }
        
        const payment = await prisma.payment.create({
            data: {
                amount: Number(amount),
                debtId: Number(debtId)
            }
        })

        return res.status(201).json(payment)
    }
    catch(error){
        console.error(error)

        return res.status(500).json({
            error: "Erro ao registrar pagamento"
        })
    }    
}

export {
    createPayment
}