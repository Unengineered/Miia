"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WebsocketResponse {
    constructor({ responseId, statusCode, statusMessage, headers, body }) {
        this.responseId = responseId;
        this.statusCode = statusCode;
        this.statusMessage = statusMessage;
        this.headers = headers !== null && headers !== void 0 ? headers : {};
        this.body = body !== null && body !== void 0 ? body : {};
    }
    toJson() {
        var _a, _b;
        return ({
            "response_id": this.responseId,
            "status_code": this.statusCode,
            "status_message": this.statusMessage,
            "headers": (_a = this.headers) !== null && _a !== void 0 ? _a : {},
            "body": (_b = this.body) !== null && _b !== void 0 ? _b : {}
        });
    }
}
exports.default = WebsocketResponse;
