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
require('dotenv').config();
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
        const response = yield prod_service.getSummaryProducts();
        console.log(response);
    });
}
func();
console.log("HELLO");
