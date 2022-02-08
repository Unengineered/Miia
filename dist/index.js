"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const websocket_server_1 = __importDefault(require("./websocket/websocket_server"));
const socket_io_1 = require("socket.io");
const httpServer = require('http').createServer();
const server = new websocket_server_1.default({ server: new socket_io_1.Server(httpServer) });
