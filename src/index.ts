import WebsocketServer from './websocket/websocket_server'
import { Server } from "socket.io";
import ProductRepository from './product/infrastructure/product_repository';
import mongoose from 'mongoose'
import { PrismaClient } from '@prisma/client';
require('dotenv').config()

// const httpServer = require('http').createServer();

// const server = new WebsocketServer({server: new Server(httpServer)})

console.log(process.env.MONGO_REMOTE_URI)

const prod_repo = new ProductRepository({
    mongoDbConnection: mongoose.createConnection(process.env.MONGO_REMOTE_URI ?? ""),
    prismaClient: new PrismaClient()
})

prod_repo.getDetailedProductsByDate()
