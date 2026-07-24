import express from "express";
import { 
    getUsers, 
    getUserById,
    getUserSummary,
    getUserDebts,
    createdUser, 
    updateUser,
    deactivateUser
 } from "../controllers/userController.ts"


const router = express.Router();

// const { getUsers } = require("../controllers/userController");

router.get('/', getUsers);
router.post('/', createdUser);
router.get('/:id', getUserById);
router.get('/:id/summary', getUserSummary);
router.get('/:id/debts', getUserDebts);
router.put('/:id', updateUser);
router.delete('/:id', deactivateUser);

export { router } 