import { assert } from "chai"
import WebsocketResponse from "../../../src/core/models/websocket_response"

describe("WEBSOCKET RESPONSE", function () {
    var response: WebsocketResponse

    beforeEach(function () {
        response = new WebsocketResponse({
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
        })
    })

    it("should make JSON based on websocket response", function(){
        assert.deepEqual(response.toJson(), {
            "response_id" : "ID",
            "status_code" : 200,
            "status_message" : "OK",
            "headers" : {
                "key": "value"
            },
            "body" : {
                "key": 20,
                "key2": "value",
                "key3": {
                    "key4": "value"
                }
            }
        })
    })
    it("should automatically add blank header and body to response if missing", function(){
        response = new WebsocketResponse({
            responseId: "ID",
            statusCode: 200,
            statusMessage: "OK"
        })

        assert.deepEqual(response.toJson(), {
            "response_id" : "ID",
            "status_code" : 200,
            "status_message" : "OK",
            "headers": {},
            "body": {}
        })
    })
})