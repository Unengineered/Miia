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
const detailed_thrift_product_1 = require("../domain/entities/detailed_thrift_product");
const product_error_1 = __importDefault(require("../domain/errors/product_error"));
const websocket_response_1 = __importDefault(require("../../core/models/websocket_response"));
const query_string_1 = __importDefault(require("query-string"));
class ProductService {
    constructor({ productRepo }) {
        this.productRepo = productRepo;
    }
    getDetailedProduct(request) {
        return __awaiter(this, void 0, void 0, function* () {
            //TODO: Handle type error of parsed id string
            const id = query_string_1.default.parseUrl(request.url).query['id'];
            if (id === null) {
                return yield this.productRepo.getDetailedProductsByDate()
                    .then((result) => {
                    if (result instanceof product_error_1.default) {
                        return [
                            new websocket_response_1.default({
                                responseId: request.requestId,
                                statusCode: 400,
                                statusMessage: "ERROR",
                                headers: {},
                                body: {
                                    error: result.code
                                }
                            })
                        ];
                    }
                    else {
                        const products = result;
                        return [
                            new websocket_response_1.default({
                                responseId: request.requestId,
                                statusCode: 200,
                                statusMessage: "OK",
                                headers: {},
                                body: {
                                    "detailed_thrift_products": products.map((product) => product.toJson())
                                }
                            })
                        ];
                    }
                });
            }
            return yield this.productRepo.getDetailedProduct(id)
                .then((result) => {
                if (result instanceof product_error_1.default) {
                    return [
                        new websocket_response_1.default({
                            responseId: request.requestId,
                            statusCode: 400,
                            statusMessage: "ERROR",
                            headers: {},
                            body: {
                                error: result.code
                            }
                        })
                    ];
                }
                else {
                    const product = result;
                    return [new websocket_response_1.default({
                            responseId: request.requestId,
                            statusCode: 200,
                            statusMessage: "OK",
                            headers: {},
                            body: {
                                "summary_thrift_products": product.toJson()
                            }
                        })];
                }
            });
        });
    }
    getSummaryProducts(request) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productRepo.getProductsByDate()
                .then((result) => {
                if (result instanceof product_error_1.default) {
                    return [
                        new websocket_response_1.default({
                            responseId: request.requestId,
                            statusCode: 400,
                            statusMessage: "ERROR",
                            headers: {},
                            body: {
                                error: result.code
                            }
                        })
                    ];
                }
                const products = result;
                return [
                    new websocket_response_1.default({
                        responseId: request.requestId,
                        statusCode: 200,
                        statusMessage: "OK",
                        headers: {},
                        body: {
                            products: products.map((product) => product.toJson())
                        }
                    })
                ];
            })
                .catch((error) => {
                return [
                    new websocket_response_1.default({
                        responseId: request.requestId,
                        statusCode: 400,
                        statusMessage: "ERROR",
                        headers: {},
                        body: {
                            error: error.code
                        }
                    })
                ];
            });
        });
    }
    getProductByStore(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const storeId = query_string_1.default.parseUrl(request.url).query['store_id'];
            return yield this.productRepo.getDetailedProductsByStore(storeId)
                .then((result) => {
                if (result instanceof product_error_1.default) {
                    return [
                        new websocket_response_1.default({
                            responseId: request.requestId,
                            statusCode: 400,
                            statusMessage: "ERROR",
                            headers: {},
                            body: {
                                error: result.code
                            }
                        })
                    ];
                }
                else {
                    const products = result;
                    return [
                        new websocket_response_1.default({
                            responseId: request.requestId,
                            statusCode: 200,
                            statusMessage: "OK",
                            headers: {},
                            body: {
                                "detailed_thrift_products": products.map((product) => product.toJson())
                            }
                        })
                    ];
                }
            });
        });
    }
    putProduct(request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.productRepo.saveProduct(detailed_thrift_product_1.DetailedThriftProductEntity.forSaving({
                    name: request.body["name"],
                    price: request.body["price"],
                    originalPrice: request.body["originalPrice"],
                    pictures: request.body["pictures"],
                    sizeChart: request.body["sizeChart"],
                    storeLink: request.body["storeLink"]
                }))
                    .then((result) => {
                    if (result instanceof product_error_1.default) {
                        return [
                            new websocket_response_1.default({
                                responseId: request.requestId,
                                statusCode: 400,
                                statusMessage: "ERROR",
                                headers: {},
                                body: {
                                    "error": result.code
                                }
                            })
                        ];
                    }
                    else {
                        const product = result;
                        return [
                            new websocket_response_1.default({
                                responseId: request.requestId,
                                statusCode: 200,
                                statusMessage: "OK",
                                headers: {},
                                body: product.toJson()
                            })
                        ];
                    }
                });
            }
            catch (error) {
                return [
                    new websocket_response_1.default({
                        responseId: request.requestId,
                        statusCode: 400,
                        statusMessage: "ERROR",
                        headers: {},
                        body: {
                            "error": error
                        }
                    })
                ];
            }
        });
    }
}
exports.default = ProductService;
