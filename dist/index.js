"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const product_repository_1 = __importDefault(require("./product/infrastructure/product_repository"));
const mongoose_1 = __importDefault(require("mongoose"));
const client_1 = require("@prisma/client");
require('dotenv').config();
// const httpServer = require('http').createServer();
// const server = new WebsocketServer({server: new Server(httpServer)})
console.log(process.env.MONGO_REMOTE_URI);
const prod_repo = new product_repository_1.default({
    mongoDbConnection: mongoose_1.default.createConnection((_a = process.env.MONGO_REMOTE_URI) !== null && _a !== void 0 ? _a : ""),
    prismaClient: new client_1.PrismaClient()
});
prod_repo.getDetailedProductsByDate();
