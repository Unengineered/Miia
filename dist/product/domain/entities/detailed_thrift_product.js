"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailedThriftProductEntity = exports.DetailedThriftProductSchema = void 0;
const mongoose_1 = require("mongoose");
const store_link_1 = require("../../../core/models/store_link");
class DetailedThriftProductEntity {
    /**
     * TODO:
     * - add store link
     * - test todo
     * - test todo 2
     */
    constructor({ id, name, price, originalPrice, description, pictures, sizeChart, storeLink }) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.originalPrice = originalPrice;
        this.description = description;
        this.pictures = pictures;
        this.sizeChart = sizeChart;
        this.storeLink = storeLink;
    }
    toJson() {
        return {
            "id": this.id,
            "name": this.name,
            "price": this.price,
            "original_price": this.originalPrice,
            "description": this.description,
            "pictures": this.pictures,
            "size_chart": this.sizeChart,
            "store_link": (this.storeLink instanceof store_link_1.StoreLinkEntity) ? this.storeLink.toJson() : this.storeLink
        };
    }
    static forSaving({ name, price, originalPrice, pictures, description, sizeChart, storeLink }) {
        return new DetailedThriftProductEntity({
            id: null,
            name: name,
            price: price,
            originalPrice: originalPrice,
            description: description,
            pictures: pictures,
            sizeChart: sizeChart,
            storeLink: storeLink
        });
    }
}
exports.DetailedThriftProductEntity = DetailedThriftProductEntity;
const DetailedThriftProductSchema = new mongoose_1.Schema({
    _id: { type: mongoose_1.Types.ObjectId, required: true, auto: true },
    name: String,
    price: Number,
    originalPrice: Number,
    description: String,
    pictures: [String],
    sizeChart: [{ key: String, value: String, _id: false }],
    storeLink: { type: mongoose_1.Types.ObjectId, ref: 'StoreLink', required: true }
});
exports.DetailedThriftProductSchema = DetailedThriftProductSchema;
