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
const websocket_request_1 = __importDefault(require("../../core/models/websocket_request"));
const product_error_1 = __importDefault(require("../domain/errors/product_error"));
const url_parse_1 = __importDefault(require("url-parse"));
const websocket_response_1 = __importDefault(require("../../core/models/websocket_response"));
const query_string_1 = __importDefault(require("query-string"));
class ProductController {
    constructor({ productService }) {
        this.productService = productService;
    }
    handleRequest(request) {
        return __awaiter(this, void 0, void 0, function* () {
            if (request.packet instanceof websocket_request_1.default) {
                switch (request.packet.method) {
                    case "GET": {
                        return this.handleGetRequest(request);
                    }
                    case "PUT": {
                        return this.handlePutRequest(request);
                    }
                    case "DELETE": {
                        return this.handleDeleteRequest(request);
                    }
                }
            }
            throw new product_error_1.default({ code: "unimpliment" });
        });
    }
    handleMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new product_error_1.default({ code: "unimpliment" });
        });
    }
    //TODO(advait): Handle product errors
    handleGetRequest(request) {
        return __awaiter(this, void 0, void 0, function* () {
            if (request.packet instanceof websocket_request_1.default) {
                const url = new url_parse_1.default(request.packet.url);
                switch (url.pathname) {
                    case 'summary': {
                        const serviceResponse = yield this.productService.getSummaryProducts();
                        return [new inter_service_message_1.InterServiceMessage({
                                packet: new websocket_response_1.default({
                                    responseId: request.packet.requestId,
                                    statusCode: 200,
                                    statusMessage: "OK",
                                    headers: {},
                                    body: {
                                        products: serviceResponse
                                    }
                                }),
                                uid: request.uid,
                                sendTo: inter_service_message_1.SendTo.SOCKET_ID,
                                socketId: request.socketId
                            })];
                    }
                    case 'detailed': {
                        //TODO: Handle type error of parsed id string
                        const id = query_string_1.default.parseUrl(request.packet.url).query['id'];
                        const num_id = Number.parseInt(id);
                        const serviceResponse = yield this.productService.getDetailedProduct(num_id);
                        return [new inter_service_message_1.InterServiceMessage({
                                packet: new websocket_response_1.default({
                                    responseId: request.packet.requestId,
                                    statusCode: 200,
                                    statusMessage: "OK",
                                    headers: {},
                                    body: serviceResponse
                                }),
                                uid: request.uid,
                                sendTo: inter_service_message_1.SendTo.SOCKET_ID,
                                socketId: request.socketId
                            })];
                    }
                }
            }
            throw new product_error_1.default({ code: "unimpliment" });
        });
    }
    handlePutRequest(request) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new product_error_1.default({ code: "unimpliment" });
        });
    }
    handleDeleteRequest(request) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new product_error_1.default({ code: "unimpliment" });
        });
    }
}
