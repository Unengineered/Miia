import { InterServiceMessage, SendTo } from "../../core/models/inter_service_message";
import StoreError from "../domain/errors/store_error";
import StoreService from "../application/store_service";
import WebsocketRequest from "../../core/models/websocket_request";
import WebsocketResponse from "../../core/models/websocket_response";
export default class StoreController {
    readonly storeService: StoreService

    constructor({ storeService }: { storeService: StoreService }) {
        this.storeService = storeService
    }
    async handleRequest(interServiceMessage: InterServiceMessage): Promise<InterServiceMessage[]> {
        if (interServiceMessage.packet instanceof WebsocketRequest) {
            switch (interServiceMessage.packet.method) {
                case "GET": {
                    return this.handleGetRequest(interServiceMessage)
                }
                case "PUT": {
                    return this.handlePutRequest(interServiceMessage)
                }
            }
        }
        throw new StoreError({ code: "unimplimented" })
    }
    private async handleGetRequest(interServiceMessage: InterServiceMessage): Promise<InterServiceMessage[]> {
        if (interServiceMessage.packet instanceof WebsocketRequest) {
            const serviceResults = await this.storeService.getStoreLinkList(interServiceMessage.packet)
            return serviceResults.map((serviceResult) => {
                return new InterServiceMessage({
                    packet: serviceResult,
                    uid: interServiceMessage.uid,
                    socketId: interServiceMessage.socketId,
                    sendTo: serviceResult instanceof WebsocketResponse ? SendTo.SOCKET_ID : SendTo.UID
                })
            })

        }
        throw new StoreError({ code: "unimplimented" })
    }

    private async handlePutRequest(interServiceMessage: InterServiceMessage): Promise<InterServiceMessage[]> {
        if (interServiceMessage.packet instanceof WebsocketRequest) {
            const serviceResults = await this.storeService.saveStoreLink(interServiceMessage.packet)
            return serviceResults.map((serviceResult) => {
                return new InterServiceMessage(
                    {
                        packet: serviceResult,
                        socketId: interServiceMessage.socketId,
                        uid: interServiceMessage.uid,
                        sendTo: serviceResult instanceof WebsocketResponse ? SendTo.SOCKET_ID : SendTo.UID
                    }
                )
            })
        } throw new StoreError({ code: "unimplimented" })
    }
}