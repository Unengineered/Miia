import WebsocketServer from './websocket/websocket_server'
import { Server } from "socket.io";
const httpServer = require('http').createServer();

const server = new WebsocketServer({server: new Server(httpServer)})
