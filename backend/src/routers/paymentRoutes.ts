import express from "express"

import { 
    createPayment
} from "../controllers/paymentController.ts"

const router = express.Router()

router.post('/', createPayment)

export {
    router
}