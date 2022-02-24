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
class ProductRepository {
    constructor({ mongoDbConnection, prismaClient }) {
        this.mongoDbConnection = mongoDbConnection;
        this.prismaClient = prismaClient;
        this.detailedThriftProductModel = this.mongoDbConnection.model('DetailedThriftProduct', detailed_thrift_product_1.DetailedThriftProductSchema);
        this.storeLinkModel = this.mongoDbConnection.model('StoreLink', detailed_thrift_product_1.StoreLinkSchema);
    }
    saveProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            // Removed need for SQL database
            // const SQLEntry = await this.prismaClient.summaryProduct.create({
            //     data: {
            //         name: product.name,
            //         thumbnail: product.pictures[0]
            //     }
            // })
            const storeId = (product.storeLink instanceof detailed_thrift_product_1.StoreLinkEntity) ? product.storeLink.id : product.storeLink;
            const doc = new this.detailedThriftProductModel({
                name: product.name,
                price: product.price,
                originalPrice: product.originalPrice,
                pictures: product.pictures,
                sizeChart: product.sizeChart,
                storeLink: storeId
            });
            return doc.save()
                .then((doc) => {
                return doc;
            })
                .catch((err) => {
                console.log(err);
                return new product_error_1.default({ code: "unknown" });
            });
        });
    }
    getDetailedProductsByStore(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.detailedThriftProductModel
                .find({ 'storeLink': id })
                .populate('storeLink')
                .exec()
                .then((products) => {
                if (products === null)
                    return new product_error_1.default({ code: "no-items" });
                return products.map((product) => {
                    //Remapping product to entity to avoid extra fields
                    return new detailed_thrift_product_1.DetailedThriftProductEntity({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        originalPrice: product.originalPrice,
                        pictures: product.pictures,
                        sizeChart: product.sizeChart,
                        storeLink: product.storeLink
                    });
                });
            })
                .catch((err) => {
                return new product_error_1.default({ code: "unknown" });
            });
        });
    }
    getDetailedProductsByDate() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.detailedThriftProductModel
                .find()
                .populate('storeLink')
                .sort({ "_id": -1 })
                .exec()
                .then((products) => {
                if (products === null)
                    return new product_error_1.default({ code: "no-items" });
                return products.map((product) => {
                    //Remapping product to entity to avoid extra fields
                    return new detailed_thrift_product_1.DetailedThriftProductEntity({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        originalPrice: product.originalPrice,
                        pictures: product.pictures,
                        sizeChart: product.sizeChart,
                        storeLink: product.storeLink
                    });
                });
            })
                .catch((err) => {
                return new product_error_1.default({ code: "unknown" });
            });
        });
    }
}
exports.default = ProductRepository;
