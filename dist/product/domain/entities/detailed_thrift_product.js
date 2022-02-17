"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailedThriftProductEntity = exports.DetailedThriftProductSchema = void 0;
const mongoose_1 = require("mongoose");
class DetailedThriftProductEntity {
    /**
     * TODO:
     * - add store link
     * - test todo
     * - test todo 2
     */
    constructor({ id, name, price, originalPrice, pictures, sizeChart }) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.originalPrice = originalPrice;
        this.pictures = pictures;
        this.sizeChart = sizeChart;
    }
    static forSaving({ name, price, originalPrice, pictures, sizeChart }) {
        return new DetailedThriftProductEntity({
            id: null,
            name: name,
            price: price,
            originalPrice: originalPrice,
            pictures: pictures,
            sizeChart: sizeChart,
        });
    }
}
exports.DetailedThriftProductEntity = DetailedThriftProductEntity;
const DetailedThriftProductSchema = new mongoose_1.Schema({
    _id: { type: Number, required: true },
    name: String,
    price: Number,
    originalPrice: Number,
    pictures: [String],
    sizeChart: [{ key: String, value: String }]
});
exports.DetailedThriftProductSchema = DetailedThriftProductSchema;
