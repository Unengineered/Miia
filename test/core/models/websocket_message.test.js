"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const websocket_message_1 = __importDefault(require("../../../src/core/models/websocket_message"));
describe("WEBSOCKET MESSAGE", function () {
    var json;
    var message;
    beforeEach(function () {
        json = {
            "message_id": "ID",
            "system": "SYSTEM",
            "function": "FUNCTION",
            "headers": {
                "key": "value"
            },
            "body": {
                "key": 20,
                "key2": "value",
                "key3": {
                    "key4": "value"
                }
            }
        };
        message = new websocket_message_1.default({
            messageId: "ID",
            system: "SYSTEM",
            functionName: "FUNCTION",
            headers: {
                "key": "value"
            },
            body: {
                "key": 20,
                "key2": "value",
                "key3": {
                    "key4": "value"
                }
            }
        });
    });
    it("should make websocket message from JSON", function () {
        chai_1.assert.deepEqual(websocket_message_1.default.fromJson(json), message);
    });
    it("should add blank header and body if missing in JSON", function () {
        json['headers'] = undefined;
        json['body'] = undefined;
        chai_1.assert.deepEqual(websocket_message_1.default.fromJson(json), new websocket_message_1.default({
            messageId: "ID",
            system: "SYSTEM",
            functionName: "FUNCTION",
            headers: {},
            body: {}
        }));
    });
    it("should throw missing-message-id error", function () {
        json['message_id'] = undefined;
        chai_1.assert.throws(() => websocket_message_1.default.fromJson(json), "missing-message-id");
    });
    it("should throw missing-system error", function () {
        json['system'] = undefined;
        chai_1.assert.throws(() => websocket_message_1.default.fromJson(json), "missing-system");
    });
    it("should throw missing-function error", function () {
        json['function'] = undefined;
        chai_1.assert.throws(() => websocket_message_1.default.fromJson(json), "missing-function");
    });
    it("should make JSON from websocket response", function () {
        chai_1.assert.deepEqual(message.toJson(), json);
    });
});
