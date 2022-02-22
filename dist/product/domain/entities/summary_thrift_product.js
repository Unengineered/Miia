"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SummaryThriftProduct {
    //TODO(advait): Add store link
    constructor({ id, name, thumbnail }) {
        this.id = id;
        this.name = name;
        this.thumbnail = thumbnail;
    }
    toJson() {
        return {
            "id": this.id,
            "name": this.name,
            "thumbnail": this.thumbnail
        };
    }
}
exports.default = SummaryThriftProduct;
