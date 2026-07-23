//import {prisma} from "../prisma.ts"
// import { response } from "express";
import {prisma} from "../prisma.ts";
import { fromCents } from "../utils/money.ts";

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

async function getUserSummary(req: any, res: any){
    try{
        const id = Number(req.params.id)

        const user = await prisma.user.findUnique({
            where: {
                id: id
            },
            include:{
                debts:{
                    include:{
                        payments:true
                    }
                }
            }
        })

        if(!user){
            return res.status(404).json({
                error: "Usuário não encontrado"
            })
        }
        
        let totalDebts = 0;
        let totalPaid = 0;

        for(const debt of user.debts){
            totalDebts += debt.amount;

            for(const payment of debt.payments){
                totalPaid += payment.amount;
            }
        }

        const totalOwed = totalDebts - totalPaid;

        return res.json({
            user: {
                id: user.id,
                name: user.name,
                phone: user.phone,
                email: user.email,
            },

            totalDebts: fromCents(totalDebts),
            totalPaid: fromCents(totalPaid),
            totalOwed: fromCents(totalOwed)
        })
    }
    catch(error){
        console.error(error)

        return res.status(500).json({
            error: "Erro ao calcular resumo usuário"
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

async function updateUser(req:any, res:any) {
    try{
        const id = Number(req.params.id);

        const {
            name,
            phone,
            email
        } = req.body;

        const userExists = await prisma.user.findUnique({
            where: {
                id: id
            }
        })

        if(!userExists){
            return res.status(404).json({
                error: "Usuário não encontrado"
            })
        }

        const user = await prisma.user.update({
            where:{
                id: id
            },
            data: {
                name,
                phone,
                email
            }
        })

        return res.json(user)
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            error: "Erro ao atualizar usuário"
        })
    }
}

async function deleteUser(req: any, res: any){
    try{
        const id = Number(req.params.id)

        const userExists = await prisma.user.findUnique({
            where: {
                id: id
            }
        })

        if(!userExists){
            return res.status(404).json({
                error: "Usuário não encontrado"
            })
        }

        await prisma.user.delete({
            where: {
                id: id
            }
        })

        return res.json({
            message: "Usuário excluido com sucesso"
        })
    }
    catch(error){
        console.error(error)

        return res.status(500).json({
            error: "Erro ao excluir usuário"
        })
    }
    
}

export { 
    getUsers,
    getUserById, 
    getUserSummary,
    addUser,
    updateUser, 
    deleteUser
}