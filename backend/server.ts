import express from "express";
import cors from "cors"
import {router as userRouter} from "./src/routers/userRoutes.ts"
import {router as debtRouter} from "./src/routers/debtRoutes.ts"
import {router as paymentRouter} from "./src/routers/paymentRoutes.ts"
import {router as dashboardRouter} from "./src/routers/dashboardRoutes.ts"

//import userRouter from "./src/routers/userRoutes"

const app = express();
const PORT = 3000;

app.use(cors())

app.use(express.json());
app.use('/users', userRouter);
app.use('/debts', debtRouter);
app.use('/payments', paymentRouter);
app.use('/dashboard', dashboardRouter)

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})
