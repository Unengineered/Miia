import { assert } from "chai";
import WebsocketRequest from "../../../src/core/models/websocket_request";

describe("websocket request", function () {

    var json: any;

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
        }
    })

    it("should make websocket request from JSON", function () {
        const req = WebsocketRequest.fromJson(json)
        assert.deepEqual(req, new WebsocketRequest({
            requestId: "ID", method: "GET", url: "URL", headers: { "key": "value" }, body: {
                "key": 20,
                "key2": "value",
                "key3": {
                    "key4": "value"
                }
            }
        }))
    })
    it("should throw missing-request-id error", function () {
        json['request_id'] = undefined
        assert.throws(() => WebsocketRequest.fromJson(json), "missing-request-id")
    })
    it("should throw missing-url error", function () {
        json['url'] = undefined
        assert.throws(() => WebsocketRequest.fromJson(json), "missing-url")
    })
    it("should throw missing-method error", function () {
        json['method'] = undefined
        assert.throws(() => WebsocketRequest.fromJson(json), "missing-method")
    })
    it("should add blank header and body when they are missing in JSON", function () {
        json['headers'] = undefined
        json['body'] = undefined

        const req = WebsocketRequest.fromJson(json)

        assert.deepEqual(req, new WebsocketRequest({
            requestId: "ID", method: "GET", url: "URL", headers: {}, body: {}
        }))
    })
})