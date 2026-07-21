// import { PrismaClient } from '../generated/prisma/client.ts'
// import { PrismaPg } from '@prisma/adapter-pg'

// // const prisma = new PrismaClient({
// //   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
// // })


// const connectionString = `${process.env.DATABASE_URL}`;
// const adapter = new PrismaPg({ connectionString });
// const prisma = new PrismaClient({ adapter });


// export { prisma };

import "dotenv/config";

console.log("DATABASE_URL:", process.env.DATABASE_URL);

import { PrismaClient } from "../generated/prisma/client.ts";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
    url: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
    adapter,
});


export {prisma}