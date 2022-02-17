"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProductError extends Error {
    constructor({ code }) {
        super(code);
        this.code = code;
    }
}
exports.default = ProductError;
