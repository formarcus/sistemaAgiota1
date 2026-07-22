import {prisma} from "../prisma.ts"

async function getDebts(req:any, res:any) {
    try{
        const debts = await prisma.debt.findMany({
            include: {
                user: true,
                payments: true            
            }
        })

        return res.json(debts);
    }
    catch(error){
        console.error(error);

        return res.status(500).json({
            error: "Erro ao buscar dívidas"
        })
    }
}

async function createDebt(req:any, res: any){
    try {
        const {
            description,
            amount,
            dueDate,
            userId
        } = req.body;

        const user = await prisma.user.findUnique({
            where: {
                id: Number(userId)
            }
        })

        if(!user){
            return res.status(404).json({
                error: "Usuário não encontrado"
            })
        }

        const debt = await prisma.debt.create({
            data: {
                description,
                amount: Number(amount),
                dueDate: dueDate ? new Date(dueDate) : null,
                userId: Number(userId)
            }
        })

        return res.status(201).json(debt)
    }
    catch(error){
        console.error(error)

        return res.status(500).json({
            error: "Erro ao criar dívida"
        })
    }
}

export { getDebts, createDebt }