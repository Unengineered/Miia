"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreLinkEntity = exports.StoreLinkSchema = exports.DetailedThriftProductEntity = exports.DetailedThriftProductSchema = void 0;
const mongoose_1 = require("mongoose");
class DetailedThriftProductEntity {
    /**
     * TODO:
     * - add store link
     * - test todo
     * - test todo 2
     */
    constructor({ id, name, price, originalPrice, pictures, sizeChart, storeLink }) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.originalPrice = originalPrice;
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
            "pictures": this.pictures,
            "size_chart": this.sizeChart,
            "store_link": (this.storeLink instanceof StoreLinkEntity) ? this.storeLink.toJson() : this.storeLink
        };
    }
    static forSaving({ name, price, originalPrice, pictures, sizeChart, storeLink }) {
        return new DetailedThriftProductEntity({
            id: null,
            name: name,
            price: price,
            originalPrice: originalPrice,
            pictures: pictures,
            sizeChart: sizeChart,
            storeLink: storeLink
        });
    }
}
exports.DetailedThriftProductEntity = DetailedThriftProductEntity;
class StoreLinkEntity {
    constructor({ id, name, thumbnail, instagram }) {
        this.id = id;
        this.name = name;
        this.thumbnail = thumbnail;
        this.instagram = instagram;
    }
    toJson() {
        return {
            "id": this.id,
            "name": this.name,
            "thumbnail": this.thumbnail,
            "instagram": this.instagram
        };
    }
}
exports.StoreLinkEntity = StoreLinkEntity;
const DetailedThriftProductSchema = new mongoose_1.Schema({
    _id: { type: mongoose_1.Types.ObjectId, required: true, auto: true },
    name: String,
    price: Number,
    originalPrice: Number,
    pictures: [String],
    sizeChart: [{ key: String, value: String }],
    storeLink: { type: mongoose_1.Types.ObjectId, ref: 'StoreLink', required: true }
});
exports.DetailedThriftProductSchema = DetailedThriftProductSchema;
const StoreLinkSchema = new mongoose_1.Schema({
    _id: { type: mongoose_1.Types.ObjectId, auto: true },
    name: String,
    thumbnail: String,
    instagram: String
});
exports.StoreLinkSchema = StoreLinkSchema;
