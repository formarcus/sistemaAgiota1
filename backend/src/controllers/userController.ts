//import {prisma} from "../prisma.ts"
import { response } from "express";
import {prisma} from "../prisma.ts";

async function getUsers(req:any, res:any){
    try {
        debugger
        const users = await prisma.user.findMany();
        return res.json(users);
    }
    catch(error){
        console.log(error);

    }
} 

async function getUserById(req:any, res:any) {
    try{
        const id = Number(req.params.id);

        const user = await prisma.user.findUnique({
            where:{
                id:id
            }
        })

        if(!user){
            return res.status(404).json({
                error: "Usuário não encontrado"
            })
        }

        return res.json(user);
    }
    catch(error){
        console.error(error);

        return res.status(500).json({
            error:"Erro ao buscar usuário"
        })
    }
}

async function addUser(req: any, res: any) {
    try{
        const {
            name,
            phone,
            email
        } = req.body;

        const user = await prisma.user.create({
            data:{
                name,
                phone,
                email
            }
        })

        return res.status(201).json(user)
    }
    catch(error){

        console.error(error)
        return res.status(500).json({
            error:"Erro ao criar o usuário"
        })
    }
}

export { getUsers, addUser, getUserById }