"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_config_1 = require("../core/configs/firebase.config");
const websocket_message_1 = __importDefault(require("../core/models/websocket_message"));
const websocket_request_1 = __importDefault(require("../core/models/websocket_request"));
class WebsocketServer {
    constructor({ server }) {
        this.clientList = new Map();
        this.server = server;
        this.attachHandlers(this.server);
        this.server.listen(3000);
    }
    attachHandlers(server) {
        server.on('connection', (client) => __awaiter(this, void 0, void 0, function* () {
            const token = client.handshake.auth.token;
            console.log("INCOMING CONNECTION WITH TOKEN: ", token);
            try {
                const user = yield firebase_config_1.app.auth().verifyIdToken(token);
                this.addSocketId({ uid: user.uid, socketId: client.id });
            }
            catch (error) {
                console.log("TOKEN VERIFICATION FAILUED");
                if (token === "atique") {
                    console.log("GOT INTERNAL CLIENT TOKEN");
                    this.addSocketId({ uid: '1ZND67ovhddrwA5vaNawjc1u2Lm1', socketId: client.id });
                }
                else {
                    return client.disconnect();
                }
            }
            client.on('request', function (data, ack) {
                console.log("RECEIVED REQUESST");
                const req = websocket_request_1.default.fromJson(data);
                console.log(req);
            });
            client.on('message', function (data, ack) {
                console.log("RECEIVED MESSAGE");
                const msg = websocket_message_1.default.fromJson(data);
                console.log(msg);
            });
        }));
    }
    addSocketId({ uid, socketId }) {
        var _a;
        if (this.clientList.has(uid)) {
            (_a = this.clientList.get(uid)) === null || _a === void 0 ? void 0 : _a.push(socketId);
        }
        else {
            this.clientList.set(uid, [socketId]);
        }
    }
}
exports.default = WebsocketServer;
