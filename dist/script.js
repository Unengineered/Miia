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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const product_repository_1 = __importDefault(require("./product/infrastructure/product_repository"));
const mongoose_1 = __importDefault(require("mongoose"));
const client_1 = require("@prisma/client");
const product_service_1 = __importDefault(require("./product/application/product_service"));
const websocket_request_1 = __importDefault(require("./core/models/websocket_request"));
require('dotenv').config();
//h
const prod_repo = new product_repository_1.default({
    mongoDbConnection: mongoose_1.default.createConnection((_a = process.env.MONGO_REMOTE_URI) !== null && _a !== void 0 ? _a : ""),
    prismaClient: new client_1.PrismaClient()
});
const prod_service = new product_service_1.default({ productRepo: prod_repo });
function func() {
    return __awaiter(this, void 0, void 0, function* () {
        // const response = await prod_repo.saveProduct(DetailedThriftProductEntity.forSaving({
        //     name: "TOTAL_TEST",
        //     price: 200,
        //     originalPrice: 2000,
        //     pictures: ["url1", "url2"],
        //     sizeChart: [
        //         {key: "key", value: "value"},
        //         {key: "key", value: "value"}
        //     ]
        // }))
        //const response = await prod_repo.getProductsByDate()
        // const response = await prod_repo.getDetailedProduct(5)
        //const response = await prod_service.getDetailedProduct(5)
        //const response = await prod_service.getSummaryProducts()
        // const response = await prod_repo.saveProduct(DetailedThriftProductEntity.forSaving({
        //     name: "NEW_PROD3",
        //     price: 200,
        //     originalPrice: 2000,
        //     pictures: ["URL1", "URL2"],
        //     sizeChart: [
        //         {key: "KEY", value: "VALUE"},
        //         {key: "KEY2", value: "VALUE2"}
        //     ],
        //     storeLink: "62148f53cd944133da8d8adf"
        // }))
        //const response = await prod_repo.getDetailedProduct("62148d1a3fcd9b74df344a32")
        //const response = await prod_repo.getDetailedProductsByDate()
        // const response = await prod_repo.getDetailedProductsByStore("62148dbacd944133da8d8ad4")
        // console.log(response)
        const response = yield prod_service.getDetailedThriftProducts(new websocket_request_1.default({
            requestId: "62148dbacd944133da8d8ad4",
            method: "62148dbacd944133da8d8ad4",
            // url: "https://www.everythng.in/detailed?store_id=62148f53cd944133da8d8adf",
            url: "https://www.everythng.in/detailed",
            headers: "",
            body: "",
        }));
        console.log(JSON.stringify(response));
    });
}
func();
console.log("HELLO");
