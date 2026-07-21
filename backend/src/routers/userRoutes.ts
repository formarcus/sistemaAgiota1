import express from "express";
import { getUsers, addUser, getUserById } from "../controllers/userController.ts"


const router = express.Router();

// const { getUsers } = require("../controllers/userController");

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', addUser);

export { router } 