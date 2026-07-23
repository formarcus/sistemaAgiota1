import express from "express";
import { 
    getUsers, 
    getUserById,
    getUserSummary,
    addUser, 
    updateUser,
    deleteUser
 } from "../controllers/userController.ts"


const router = express.Router();

// const { getUsers } = require("../controllers/userController");

router.get('/', getUsers);
router.get('/:id', getUserById);
router.get('/:id/summary', getUserSummary);
router.post('/', addUser);
router.post('/:id', updateUser);
router.delete('/:id', deleteUser);

export { router } 