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
const product_error_1 = __importDefault(require("../domain/errors/product_error"));
class ProductService {
    constructor({ productRepo }) {
        this.productRepo = productRepo;
    }
    getDetailedProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productRepo.getDetailedProduct(id);
        });
    }
    getSummaryProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productRepo.getProductsByDate();
        });
    }
    getProductByStore(storeId) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new product_error_1.default({ code: "unimplimented" });
        });
    }
    putProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productRepo.saveProduct(product);
        });
    }
}
exports.default = ProductService;
