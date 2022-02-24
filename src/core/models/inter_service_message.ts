import WebsocketMessage from "./websocket_message";
import WebsocketRequest from "./websocket_request";
import WebsocketResponse from "./websocket_response";

enum SendTo{
    "SOCKET_ID",
    "UID"
}

export default class InterServiceMessage {
    readonly packet: (WebsocketMessage | WebsocketRequest | WebsocketResponse)
    readonly uid: string
    readonly socketId?: string
    readonly sendTo?: SendTo

    constructor({ packet, uid, socketId, sendTo }:
        { packet: (WebsocketMessage | WebsocketRequest | WebsocketResponse), uid: string, socketId?: string, sendTo?: SendTo }) {
        this.packet = packet
        this.uid = uid
        this.socketId = socketId
        this.sendTo = sendTo
    }
}

export {InterServiceMessage, SendTo}