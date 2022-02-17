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
const summary_thrift_product_1 = __importDefault(require("../domain/entities/summary_thrift_product"));
class ProductRepository {
    constructor({ mongoDbConnection, prismaClient }) {
        this.mongoDbConnection = mongoDbConnection;
        this.prismaClient = prismaClient;
        this.detailedThriftProductModel = this.mongoDbConnection.model('DetailedThriftProduct', detailed_thrift_product_1.DetailedThriftProductSchema);
    }
    getDetailedProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.detailedThriftProductModel
                .findById(id)
                .exec()
                .then((product) => {
                if (product === null)
                    return new product_error_1.default({ code: "no-product" });
                else
                    return new detailed_thrift_product_1.DetailedThriftProductEntity({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        originalPrice: product.originalPrice,
                        pictures: product.pictures,
                        sizeChart: product.sizeChart.map((chartValue) => {
                            return { key: chartValue.key, value: chartValue.value };
                        })
                    });
            }).
                catch((error) => {
                return new product_error_1.default({ code: "unknown" });
            });
        });
    }
    saveProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const SQLEntry = yield this.prismaClient.summaryProduct.create({
                data: {
                    name: product.name,
                    thumbnail: product.pictures[0]
                }
            });
            const doc = new this.detailedThriftProductModel({
                _id: SQLEntry.id,
                name: product.name,
                price: product.price,
                originalPrice: product.originalPrice,
                pictures: product.pictures,
                sizeChart: product.sizeChart
            });
            return doc.save()
                .then((doc) => {
                return doc;
            })
                .catch((err) => {
                return new product_error_1.default({ code: "unknown" });
            });
        });
    }
    getProductsByDate() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prismaClient.summaryProduct
                .findMany({
                orderBy: [
                    {
                        createdAt: 'desc'
                    }
                ]
            })
                .then((products) => {
                return products.map((product) => {
                    return new summary_thrift_product_1.default({
                        id: product.id.toString(),
                        name: product.name,
                        thumbnail: product.thumbnail
                    });
                });
            })
                .catch((err) => {
                console.log("SQL ERROR");
                console.log(err);
                return new product_error_1.default({ code: "unknown" });
            });
        });
    }
}
exports.default = ProductRepository;
