"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const format_error_1 = __importDefault(require("../errors/format_error"));
class WebsocketRequest {
    constructor({ requestId, method, url, headers, body }) {
        this.requestId = requestId;
        this.method = method;
        this.url = url;
        this.headers = headers;
        this.body = body;
    }
    static fromJson(json) {
        var _a, _b;
        if (json['request_id'] == undefined) {
            throw new format_error_1.default({ code: "missing-request-id" });
        }
        if (json['method'] == undefined) {
            throw new format_error_1.default({ code: "missing-method" });
        }
        if (json['url'] == undefined) {
            throw new format_error_1.default({ code: "missing-url" });
        }
        return new WebsocketRequest({
            requestId: json["request_id"],
            method: json['method'],
            url: json['url'],
            headers: (_a = json['headers']) !== null && _a !== void 0 ? _a : {},
            body: (_b = json['body']) !== null && _b !== void 0 ? _b : {}
        });
    }
}
exports.default = WebsocketRequest;
