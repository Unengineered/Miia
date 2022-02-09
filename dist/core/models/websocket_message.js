"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const format_error_1 = __importDefault(require("../errors/format_error"));
class WebsocketMessage {
    constructor({ messageId, system, functionName, headers, body }) {
        this.messageId = messageId;
        this.system = system;
        this.functionName = functionName;
        this.headers = headers !== null && headers !== void 0 ? headers : {};
        this.body = body !== null && body !== void 0 ? body : {};
    }
    static fromJson(json) {
        if (json['message_id'] == undefined) {
            throw new format_error_1.default({ code: "missing-message-id" });
        }
        if (json['system'] == undefined) {
            throw new format_error_1.default({ code: "missing-system" });
        }
        if (json['function'] == undefined) {
            throw new format_error_1.default({ code: "missing-function" });
        }
        return new WebsocketMessage({
            messageId: json['message_id'],
            system: json['system'],
            functionName: json['function'],
            headers: json['headers'],
            body: json['body']
        });
    }
    toJson() {
        return {
            "message_id": this.messageId,
            "system": this.system,
            "function": this.functionName,
            "headers": this.headers,
            "body": this.body
        };
    }
}
exports.default = WebsocketMessage;
