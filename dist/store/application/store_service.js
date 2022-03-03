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
const store_link_1 = require("../../core/models/store_link");
const websocket_response_1 = __importDefault(require("../../core/models/websocket_response"));
const store_error_1 = __importDefault(require("../domain/errors/store_error"));
class StoreService {
    constructor({ storeRepo }) {
        this.storeRepo = storeRepo;
    }
    getStoreLinkList(request) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.storeRepo.getStoreLinkList()
                .then((result) => {
                if (result instanceof store_error_1.default) {
                    return [
                        new websocket_response_1.default({
                            responseId: request.requestId,
                            statusCode: 404,
                            statusMessage: "NOT_FOUND",
                            headers: {},
                            body: {
                                error: result.code
                            }
                        })
                    ];
                }
                const storeLinks = result;
                return [
                    new websocket_response_1.default({
                        responseId: request.requestId,
                        statusCode: 200,
                        statusMessage: "OK",
                        headers: {},
                        body: {
                            "store_links": storeLinks.map((storeLink) => storeLink.toJson())
                        }
                    })
                ];
            });
        });
    }
    saveStoreLink(request) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.storeRepo.putStoreLink(store_link_1.StoreLinkEntity.forSaving({
                name: request.body["name"],
                thumbnail: request.body["thumbnail"],
                instagram: request.body["instagram"],
            }))
                .then((result) => {
                if (result instanceof store_error_1.default) {
                    return [
                        new websocket_response_1.default({
                            responseId: request.requestId,
                            statusCode: 500,
                            statusMessage: "INTERNAL_SERVER_ERROR",
                            headers: {},
                            body: {
                                error: result.code
                            }
                        })
                    ];
                }
                const storeLink = result;
                return [
                    new websocket_response_1.default({
                        responseId: request.requestId,
                        statusCode: 200,
                        statusMessage: "OK",
                        headers: {},
                        body: {
                            "store_link": storeLink.toJson()
                        }
                    })
                ];
            });
        });
    }
}
exports.default = StoreService;
