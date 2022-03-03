"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StoreError extends Error {
    constructor({ code }) {
        super(code);
        this.code = code;
    }
}
exports.default = StoreError;
