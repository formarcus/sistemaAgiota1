import express from "express";
import { getUsers, addUser } from "../controllers/userController.ts"


const router = express.Router();

// const { getUsers } = require("../controllers/userController");

router.get('/', getUsers);
router.post('/', addUser);

export { router } 