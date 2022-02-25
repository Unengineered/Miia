import { StoreLinkEntity } from "../../core/models/store_link";
import WebsocketMessage from "../../core/models/websocket_message";
import WebsocketRequest from "../../core/models/websocket_request";
import WebsocketResponse from "../../core/models/websocket_response";
import StoreError from "../domain/errors/store_error";
import IStoreRepository from "../domain/i_store_repository";

export default class StoreService {
    readonly storeRepo: IStoreRepository

    constructor({ storeRepo }: { storeRepo: IStoreRepository }) {
        this.storeRepo = storeRepo
    }

    async getStoreLinkList(request: WebsocketRequest): Promise<(WebsocketResponse | WebsocketMessage)[]> {

        return await this.storeRepo.getStoreLinkList()
            .then((result) => {
                if (result instanceof StoreError) {
                    return [
                        new WebsocketResponse({
                            responseId: request.requestId,
                            statusCode: 404,
                            statusMessage: "NOT_FOUND",
                            headers: {},
                            body: {
                                error: result.code
                            }
                        })
                    ]
                }

                const storeLinks = result as StoreLinkEntity[]

                return [
                    new WebsocketResponse({
                        responseId: request.requestId,
                        statusCode: 200,
                        statusMessage: "OK",
                        headers: {},
                        body: {
                            "store_links": storeLinks.map((storeLink) => storeLink.toJson())
                        }
                    })
                ]
            })
    }

    async saveStoreLink(request: WebsocketRequest): Promise<(WebsocketResponse | WebsocketMessage)[]> {

        return await this.storeRepo.putStoreLink(StoreLinkEntity.forSaving({
            name: request.body["name"] as string,
            thumbnail: request.body["thumbnail"] as string,
            instagram: request.body["instagram"] as string,
        }))
            .then((result) => {
                if (result instanceof StoreError) {
                    return [
                        new WebsocketResponse({
                            responseId: request.requestId,
                            statusCode: 500,
                            statusMessage: "INTERNAL_SERVER_ERROR",
                            headers: {},
                            body: {
                                error: result.code
                            }
                        })
                    ]
                }

                const storeLink = result as StoreLinkEntity

                return [
                    new WebsocketResponse({
                        responseId: request.requestId,
                        statusCode: 200,
                        statusMessage: "OK",
                        headers: {},
                        body: {
                            "store_link": storeLink
                        }
                    })
                ]
            })
    }
}