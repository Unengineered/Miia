"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FormatError extends Error {
    constructor({ code }) {
        super(code);
        this.code = code;
    }
}
exports.default = FormatError;
