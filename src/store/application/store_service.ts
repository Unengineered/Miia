import WebsocketMessage from "../../core/models/websocket_message";
import WebsocketRequest from "../../core/models/websocket_request";
import WebsocketResponse from "../../core/models/websocket_response";
import StoreError from "../domain/errors/store_error";

class StoreService{
    async getStoreLinkList(request: WebsocketRequest): Promise<(WebsocketResponse | WebsocketMessage)[]>{
        throw new StoreError({code: "unimplimented"})
    }

    async saveStoreLink(request: WebsocketRequest): Promise<(WebsocketResponse | WebsocketMessage)[]>{
        throw new StoreError({code: "unimplimented"})
    }
}