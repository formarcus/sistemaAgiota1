import {prisma} from "../prisma.ts";
import { fromCents } from "../utils/money.ts";


async function getDashboard(){
    const users = await prisma.user.findMany({
        include : {
            debts: {
                include : {
                    payments: true
                }
            }
        }
    })

    let totalDebtAmoumnt = 0;
    let totalPaid = 0;
    let usersWithDebt = 0;

    for(const user of users){
        
        let userDebt = 0;

        for(const debt of user.debts){
            
            totalDebtAmoumnt += debt.amount;
            userDebt += debt.amount;

            for(const payment of debt.payments){

                totalPaid += payment.amount;
            }
        }
        
        if(userDebt > 0){
            usersWithDebt++       
        }
    }

    const totalOwed = totalDebtAmoumnt - totalPaid

    return {
        totalUsers : users.filter((user:any) => user.active).length,
        usersWithDebt,
        totalDebtAmoumnt: fromCents(totalDebtAmoumnt),
        totalPaid:fromCents(totalPaid),
        totalOwed:fromCents(totalOwed)
    }
} 

export const dashboardService = {getDashboard};