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
const inter_service_message_1 = require("../../core/models/inter_service_message");
const store_error_1 = __importDefault(require("../domain/errors/store_error"));
const websocket_request_1 = __importDefault(require("../../core/models/websocket_request"));
const websocket_response_1 = __importDefault(require("../../core/models/websocket_response"));
class StoreController {
    constructor({ storeService }) {
        this.storeService = storeService;
    }
    handleRequest(interServiceMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            if (interServiceMessage.packet instanceof websocket_request_1.default) {
                switch (interServiceMessage.packet.method) {
                    case "GET": {
                        return this.handleGetRequest(interServiceMessage);
                    }
                    case "PUT": {
                        return this.handlePutRequest(interServiceMessage);
                    }
                }
            }
            throw new store_error_1.default({ code: "unimplimented" });
        });
    }
    handleGetRequest(interServiceMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            if (interServiceMessage.packet instanceof websocket_request_1.default) {
                const serviceResults = yield this.storeService.getStoreLinkList(interServiceMessage.packet);
                return serviceResults.map((serviceResult) => {
                    return new inter_service_message_1.InterServiceMessage({
                        packet: serviceResult,
                        uid: interServiceMessage.uid,
                        socketId: interServiceMessage.socketId,
                        sendTo: serviceResult instanceof websocket_response_1.default ? inter_service_message_1.SendTo.SOCKET_ID : inter_service_message_1.SendTo.UID
                    });
                });
            }
            throw new store_error_1.default({ code: "unimplimented" });
        });
    }
    handlePutRequest(interServiceMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            if (interServiceMessage.packet instanceof websocket_request_1.default) {
                const serviceResults = yield this.storeService.saveStoreLink(interServiceMessage.packet);
                return serviceResults.map((serviceResult) => {
                    return new inter_service_message_1.InterServiceMessage({
                        packet: serviceResult,
                        socketId: interServiceMessage.socketId,
                        uid: interServiceMessage.uid,
                        sendTo: serviceResult instanceof websocket_response_1.default ? inter_service_message_1.SendTo.SOCKET_ID : inter_service_message_1.SendTo.UID
                    });
                });
            }
            throw new store_error_1.default({ code: "unimplimented" });
        });
    }
}
exports.default = StoreController;