import WebsocketMessage from "./websocket_message";
import WebsocketRequest from "./websocket_request";
import WebsocketResponse from "./websocket_response";

export default class InterServiceMessage {
    readonly packet: (WebsocketMessage | WebsocketRequest | WebsocketResponse)
    readonly uid: string
    readonly socketId?: string
    readonly sendTo?: string

    constructor({ packet, uid, socketId, sendTo }:
        { packet: (WebsocketMessage | WebsocketRequest | WebsocketResponse), uid: string, socketId?: string, sendTo?: string }) {
        this.packet = packet
        this.uid = uid
        this.socketId = socketId
        this.sendTo = sendTo
    }
}