"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const websocket_response_1 = __importDefault(require("../../../src/core/models/websocket_response"));
describe("websocket response", function () {
    var response;
    beforeEach(function () {
        response = new websocket_response_1.default({
            responseId: "ID",
            statusCode: 200,
            statusMessage: "OK",
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
    it("should make JSON based on websocket response", function () {
        chai_1.assert.deepEqual(response.toJson(), {
            "response_id": "ID",
            "status_code": 200,
            "status_message": "OK",
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
        });
    });
    it("should automatically add blank header and body to response if missing", function () {
        response = new websocket_response_1.default({
            responseId: "ID",
            statusCode: 200,
            statusMessage: "OK"
        });
        chai_1.assert.deepEqual(response.toJson(), {
            "response_id": "ID",
            "status_code": 200,
            "status_message": "OK",
            "headers": {},
            "body": {}
        });
    });
});
