import {prisma} from "../prisma.ts"
import { toCents, fromCents } from "../utils/money.ts";
import { paymentService } from "../services/paymentService.ts";

async function getPaymentsByDebt(req:any, res:any) {
    try{
        const debtId = req.params.debtId;

        const payments = await paymentService.findPaymentByDebtId(debtId);

        return res.json(payments)
        
    }
    catch(error){
        console.error(error)

        return res.status(500).json({
            error: "Erro ao buscar pagamentos"
        })
    }    
}

async function createPayment(req:any, res:any) {
    try{
        const payment = await paymentService.createPayment({
            amount:Number(req.body.amount),
            description:req.body.description,
            debtId:Number(req.body.debtId)
        });

        return res.status(201).json(payment);
    }
    catch(error:any){
        console.error(error)

        if(error.message === "DEBT_NOT_FOUND"){
            return res.status(404).json({
                error: "Dívida não encontrada"
            })
        }

        if(error.message === "DEBT_CANCELLED"){
            return res.status(400).json({
                error: "Dívida cancelada"
            })
        }

        if(error.message === "DEBT_ALREADY_PAID"){
            return res.status(400).json({
                error: "Dívida já quitada"
            })
        }

        if(error.message === "INVALID_PAYMENT_AMOUNT"){
            return res.status(400).json({
                error: "Valor do pagamento deve ser maior que zero"
            })
        }

        if(error.message === "PAYMENT_AMOUNT_EXCEEDS_DEBT"){
            return res.status(400).json({
                error: "Valor do pagamento excede o valor da dívida"
            })
        }

        return res.status(500).json({
            error: "Erro ao registrar pagamento"
        })
    }

}

export {
    createPayment,
    getPaymentsByDebt
}