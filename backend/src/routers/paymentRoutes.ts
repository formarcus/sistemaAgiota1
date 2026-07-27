import express from "express"

import { 
    createPayment,
    getPaymentsByDebt
} from "../controllers/paymentController.ts"

const router = express.Router()

router.get('/debt/:debtId', getPaymentsByDebt)
router.post('/', createPayment)

export {
    router
}