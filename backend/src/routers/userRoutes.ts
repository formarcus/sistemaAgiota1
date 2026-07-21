import express from "express";
import { 
    getUsers, 
    addUser, 
    getUserById,
    updateUser,
    deleteUser
 } from "../controllers/userController.ts"


const router = express.Router();

// const { getUsers } = require("../controllers/userController");

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', addUser);
router.post('/:id', updateUser);
router.delete('/:id', deleteUser);

export { router } 