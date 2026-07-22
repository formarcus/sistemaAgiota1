import express from "express"
import {
    getDebts,
    createDebt
} from "../controllers/debtController.ts"

const router = express.Router();

router.get('/', getDebts)
router.post('/', createDebt)

export {router}