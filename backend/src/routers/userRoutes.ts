import express from "express";
import { userSummaryController } from "../controllers/userSummaryController.ts";
import { userController } from "../controllers/userController.ts"

const router = express.Router();

router.get('/', userController.getUsers);
router.post('/', userController.createdUser);
router.get('/:id', userController.getUserById);
router.get('/:id/summary', userSummaryController.getUserSummary);
router.get('/:id/debts', userController.getUserDebts);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deactivateUser);

export { router } 