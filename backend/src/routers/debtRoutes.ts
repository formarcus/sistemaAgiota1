import express from "express"
import {
    getDebts,
    getDebtById,
    getDebtsByUser,
    getDebtSummary,
    getDebtPayment,
    createDebt,
    updatedDebt,
    deleteDebt
} from "../controllers/debtController.ts"

const router = express.Router();

router.get('/', getDebts)
router.post('/', createDebt)
router.get('/user/:userId', getDebtsByUser)
router.get('/:id/payments', getDebtPayment)
router.get('/:id/summary', getDebtSummary)
router.get('/:id', getDebtById)
router.put('/:id', updatedDebt)
router.post('/:id', deleteDebt)

export {router}