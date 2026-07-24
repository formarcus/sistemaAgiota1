
import {prisma} from "../prisma.ts";
import { userService } from "../services/userService.ts";

async function getUsers(req:any, res:any){
    try {
        const users = await userService.findAllUsers();
        return res.json(users);
    }
    catch(error){
        console.log(error);
        
        return res.status(500).json({
            error:"Erro ao buscar usuário"
        })
    }
} 

async function getUserById(req:any, res:any) {
    try{
        const id = Number(req.params.id);

        const user = await userService.findUserById(id);

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

        const summary = await userService.getUserSummary(id)
        
        if(!summary){
            return res.status(404).json({
                error: "Usuário não encontrado"
            })
        }
        
        return res.json(summary);
    }
    catch(error){
        console.error(error)

        return res.status(500).json({
            error: "Erro ao calcular resumo usuário"
        })
    }
}

async function getUserDebts(req:any, res:any){
    try{
        const id = Number(req.params.id)

        // const user = await prisma.user.findUnique({
        //     where: {
        //         id: userId
        //     }
        // })

        const debts = await userService.getUserDebts(id)

        if(!debts) {
            return res.satus(404).json({
                error: "Usuário não encontrado"
            })
        }

        // const debts = await prisma.debt.findMany({
        //     where:{
        //         userId: userId
        //     },
        //     include: {
        //         payments: true
        //     },
        //     orderBy: {
        //         createdAt: "desc"
        //     }
        // })

        // const result = debts.map(debt => {
        //     const totalPaid = debt.payments.reduce(
        //         (total, payment) => total + payment.amount,
        //         0
        //     )
            
        //     const totalOwed = debt.amount - totalPaid

        //     return {
        //         id: debt.id,
        //         description: debt.description,
        //         amount: fromCents(debt.amount),
        //         totalPaid: fromCents(totalPaid),
        //         totalOwed: fromCents(totalOwed),
        //         dueDate: debt.dueDate,
        //         status: totalOwed === 0 ? "PAID":"OPEN" 
        //     }
        // })

        return res.json(debts)
    }
    catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Erro ao buscar dívidas do usuário"
        });
    }

}

async function createdUser(req: any, res: any) {
    try{
        const user = await userService.createUser(req.body)

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
        const userExists = await userService.findUserById(id);
        
        if(!userExists){
            return res.status(404).json({
                error: "Usuário não encontrado"
            })
        }

        const user = await userService.updateUser(id, req.body);
        
        return res.json(user)
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            error: "Erro ao atualizar usuário"
        })
    }
}

async function deactivateUser(req: any, res: any){
    try{
        const id = Number(req.params.id)
        const user = await userService.findUserById(id);
        
        if(!user){
            return res.status(404).json({
                error: "Usuário não encontrado"
            })
        }

        await userService.deactivateUser(id);

        return res.json({
            message: "Usuário desativado com sucesso"
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
    getUserDebts,
    createdUser,
    updateUser, 
    deactivateUser
}