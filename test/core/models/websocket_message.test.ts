import { assert } from "chai"
import WebsocketMessage from "../../../src/core/models/websocket_message"

describe("websocket message", function(){

    var json: any
    var message: WebsocketMessage

    beforeEach(function(){
        json = {
            "message_id" : "ID",
            "system" : "SYSTEM",
            "function" : "FUNCTION",
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

        message = new WebsocketMessage({
            messageId : "ID",
            system : "SYSTEM",
            functionName : "FUNCTION",
            headers: {
                "key": "value"
            },
            body : {
                "key": 20,
                "key2": "value",
                "key3": {
                    "key4": "value"
                }
            }
        })
    })


    it("should make websocket message from JSON", function(){
        assert.deepEqual(WebsocketMessage.fromJson(json), message)
    })
    it("should add blank header and body if missing in JSON", function(){
        json['headers'] = undefined
        json['body'] = undefined

        assert.deepEqual(WebsocketMessage.fromJson(json), new WebsocketMessage({
            messageId : "ID",
            system : "SYSTEM",
            functionName : "FUNCTION",
            headers : {},
            body : {}
        }))
    })
    it("should throw missing-message-id error", function(){
        json['message_id'] = undefined
        assert.throws(() => WebsocketMessage.fromJson(json), "missing-message-id")
    })
    it("should throw missing-system error", function(){
        json['system'] = undefined
        assert.throws(() => WebsocketMessage.fromJson(json), "missing-system")
    })
    it("should throw missing-function error", function(){
        json['function'] = undefined
        assert.throws(() => WebsocketMessage.fromJson(json), "missing-function")
    })
    it("should make JSON from websocket response", function(){
        assert.deepEqual(message.toJson(), json)
    })
})