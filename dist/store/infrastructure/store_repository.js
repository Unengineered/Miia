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
const store_error_1 = __importDefault(require("../domain/errors/store_error"));
class StoreRepository {
    constructor({ mongoDbConnection }) {
        this.mongoDbConnection = mongoDbConnection;
        this.storeLinkModel = this.mongoDbConnection.model('StoreLink', store_link_1.StoreLinkSchema);
    }
    getStoreLinkList() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.storeLinkModel
                .find()
                .lean()
                .exec()
                .then((stores) => {
                if (!stores)
                    return new store_error_1.default({ code: "no-items" });
                return stores.map((store) => {
                    return new store_link_1.StoreLinkEntity({
                        id: store._id.toString(),
                        name: store.name,
                        thumbnail: store.thumbnail,
                        instagram: store.instagram
                    });
                });
            })
                .catch((err) => {
                return new store_error_1.default({ code: "unknown" });
            });
        });
    }
    putStoreLink(store) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = new this.storeLinkModel({
                name: store.name,
                thumbnail: store.thumbnail,
                instagram: store.instagram
            });
            return doc.save()
                .then((doc) => {
                return doc;
            })
                .catch((err) => {
                return new store_error_1.default({ code: "unknown" });
            });
        });
    }
}
exports.default = StoreRepository;
