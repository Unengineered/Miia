"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreLinkEntity = exports.StoreLinkSchema = void 0;
const mongoose_1 = require("mongoose");
const StoreLinkSchema = new mongoose_1.Schema({
    _id: { type: mongoose_1.Types.ObjectId, auto: true },
    name: String,
    thumbnail: String,
    instagram: String
});
exports.StoreLinkSchema = StoreLinkSchema;
class StoreLinkEntity {
    constructor({ id, name, thumbnail, instagram }) {
        this.id = id;
        this.name = name;
        this.thumbnail = thumbnail;
        this.instagram = instagram;
    }
    static forSaving({ name, thumbnail, instagram }) {
        return new StoreLinkEntity({
            id: null,
            name: name,
            thumbnail: thumbnail,
            instagram: instagram
        });
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
