import {userSummaryService } from "../services/userSummaryService.ts";

async function getUserSummary(req:any, res:any) {
    try {
        const userId = Number(req.params.id);

        const result = await userSummaryService.getUserSummary(userId);
        return res.json(result);
    }
    catch(error: any){
        console.error(error);
        if(error.message === "USER_NOT_FOUND"){
            return res.status(404).json({
                error: "Cliente não encontrado"
            })
        }

        return res.status(500).json({
            error: "Error ao buscar resumo financeiro"
        })
    }    
}

export const userSummaryController = {
    getUserSummary
}