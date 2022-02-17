"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const websocket_request_1 = __importDefault(require("../../../src/core/models/websocket_request"));
describe("WEBSOCKET REQUEST", function () {
    var json;
    beforeEach(function () {
        json = {
            "request_id": "ID",
            "method": "GET",
            "url": "URL",
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
    });
    it("should make websocket request from JSON", function () {
        const req = websocket_request_1.default.fromJson(json);
        chai_1.assert.deepEqual(req, new websocket_request_1.default({
            requestId: "ID", method: "GET", url: "URL", headers: { "key": "value" }, body: {
                "key": 20,
                "key2": "value",
                "key3": {
                    "key4": "value"
                }
            }
        }));
    });
    it("should throw missing-request-id error", function () {
        json['request_id'] = undefined;
        chai_1.assert.throws(() => websocket_request_1.default.fromJson(json), "missing-request-id");
    });
    it("should throw missing-url error", function () {
        json['url'] = undefined;
        chai_1.assert.throws(() => websocket_request_1.default.fromJson(json), "missing-url");
    });
    it("should throw missing-method error", function () {
        json['method'] = undefined;
        chai_1.assert.throws(() => websocket_request_1.default.fromJson(json), "missing-method");
    });
    it("should add blank header and body when they are missing in JSON", function () {
        json['headers'] = undefined;
        json['body'] = undefined;
        const req = websocket_request_1.default.fromJson(json);
        chai_1.assert.deepEqual(req, new websocket_request_1.default({
            requestId: "ID", method: "GET", url: "URL", headers: {}, body: {}
        }));
    });
});
