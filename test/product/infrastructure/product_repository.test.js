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
const mongodb_memory_server_1 = require("mongodb-memory-server");
const mongoose_1 = __importDefault(require("mongoose"));
const product_repository_1 = __importDefault(require("../../../src/product/infrastructure/product_repository"));
const detailed_thrift_product_1 = require("../../../src/product/domain/entities/detailed_thrift_product");
const chai_1 = require("chai");
const client_1 = require("@prisma/client");
describe("PRODUCT REPOSITORY", function () {
    var mongod;
    var repo;
    var mongoConnection;
    var productModel;
    var prismaClient;
    //for get test
    var id;
    before(function () {
        return __awaiter(this, void 0, void 0, function* () {
            //SETUP MONGO
            mongod = yield mongodb_memory_server_1.MongoMemoryServer.create();
            mongoConnection = mongoose_1.default.createConnection(mongod.getUri());
            productModel = mongoConnection.model('DetailedThriftProduct', detailed_thrift_product_1.DetailedThriftProductSchema);
            //add doc for get test
            const doc = new productModel({
                name: "TEST_DOC",
                price: 500,
                originalPrice: 4000,
                pictures: ["url1", "url2"],
                sizeChart: [
                    { key: "chest", value: "32" },
                    { key: "chest", value: "32" }
                ]
            });
            yield doc.save();
            id = doc.id;
            //SETUP PRISMA
            prismaClient = new client_1.PrismaClient();
        });
    });
    beforeEach(function () {
        repo = new product_repository_1.default({ mongoDbConnection: mongoConnection, prismaClient: prismaClient });
    });
    this.afterAll(function () {
        mongod.stop();
    });
    it("should save document with new detailed thrift product", function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield repo.saveProduct(detailed_thrift_product_1.DetailedThriftProductEntity.forSaving({
                name: "NAME",
                price: 200,
                originalPrice: 5000,
                pictures: ["url1", "url2"],
                sizeChart: [
                    { key: "chest", value: "32" }
                ]
            }));
            const count = yield productModel.countDocuments({ name: "NAME" });
            chai_1.assert.equal(count, 1);
        });
    });
    it("should get document from database", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield repo.getDetailedProduct(id);
            const matcher = new detailed_thrift_product_1.DetailedThriftProductEntity({
                id: id,
                name: "TEST_DOC",
                price: 500,
                originalPrice: 4000,
                pictures: ["url1", "url2"],
                sizeChart: [
                    { key: "chest", value: "32" },
                    { key: "chest", value: "32" }
                ]
            });
            if (result instanceof detailed_thrift_product_1.DetailedThriftProductEntity) {
                chai_1.assert.equal(result.id, matcher.id);
                chai_1.assert.equal(result.name, matcher.name);
                chai_1.assert.equal(result.price, matcher.price);
                chai_1.assert.equal(result.originalPrice, matcher.originalPrice);
                //TODO(advait): Figure out a way to match arrays
                //assert.equal(result.pictures, matcher.pictures)
                //assert.equal(result.sizeChart, matcher.sizeChart)
            }
        });
    });
});
