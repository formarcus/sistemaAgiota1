import {dashboardService} from "../services/dashboardeService.ts"

async function getDashboard(req: any, res: any) {
    try {
        const dashboard = await dashboardService.getDashboard();
        return res.json(dashboard);
    }
    catch (error) {

        console.error(error);

        return res.status(500).json({
            error: "Erro ao carregar dashboard"
        });
    }
}

export const dashboardController = {
    getDashboard
}