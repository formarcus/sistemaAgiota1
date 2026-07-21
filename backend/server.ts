import express from "express";
import {router} from "./src/routers/userRoutes.ts"

//import userRouter from "./src/routers/userRoutes"

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/users', router);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}/users`)
    router
})

// app.get('/', (req, res) => {
//     res.json({
//         message: "API do sistema está funcionando!"
//     })
// })