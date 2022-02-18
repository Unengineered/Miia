import {InterServiceMessage, SendTo} from "../../core/models/inter_service_message";
import WebsocketMessage from "../../core/models/websocket_message";
import WebsocketRequest from "../../core/models/websocket_request";
import ProductError from "../domain/errors/product_error";
import Url from 'url-parse'
import ProductService from "../application/product_service";
import WebsocketResponse from "../../core/models/websocket_response";

export default class ProductController{

    readonly productService: ProductService

    constructor({productService} : {productService: ProductService}){
        this.productService = productService
    }

    async handleRequest(interServiceMessage: InterServiceMessage): Promise<InterServiceMessage[]>{
        if(interServiceMessage.packet instanceof WebsocketRequest){
            switch(interServiceMessage.packet.method){
                case "GET" : {
                    return this.handleGetRequest(interServiceMessage)
                }
    
                case "PUT" : {
                    return this.handlePutRequest(interServiceMessage)
                }
    
                case "DELETE" : {
                    return this.handleDeleteRequest(interServiceMessage)
                }
            }
        }
        throw new ProductError({code: "unimplimented"})
    }

    async handleMessage(interServiceMessage: InterServiceMessage): Promise<InterServiceMessage[]>{
        throw new ProductError({code: "unimplimented"})
    } 

    private async handleGetRequest(interServiceMessage: InterServiceMessage) : Promise<InterServiceMessage[]>{
        if(interServiceMessage.packet instanceof WebsocketRequest){
            const url = new Url(interServiceMessage.packet.url)
            switch(url.pathname){
                case '/summary' : {
                    const serviceResults = await this.productService.getSummaryProducts(interServiceMessage.packet)
                    return serviceResults.map((result) => {
                            return new InterServiceMessage(
                                {
                                    packet: result,
                                    socketId: interServiceMessage.socketId,
                                    uid: interServiceMessage.uid,
                                    sendTo: result instanceof WebsocketResponse ? SendTo.SOCKET_ID : SendTo.UID
                                }
                            )
                    })
                }
    
                case '/detailed' : {
                    const serviceResults = await this.productService.getDetailedProduct(interServiceMessage.packet)

                    return serviceResults.map((serviceResult) => {
                        return new InterServiceMessage({
                            packet: serviceResult,
                            uid: interServiceMessage.uid,
                            socketId: interServiceMessage.socketId,
                            sendTo: serviceResult instanceof WebsocketRequest ? SendTo.SOCKET_ID : SendTo.UID
                        })
                    })
                }
            }
        }
        throw new ProductError({code: "unimplimented"})
    }

    private async handlePutRequest(interServiceMessage: InterServiceMessage) : Promise<InterServiceMessage[]>{
        const result = await this.productService.putProduct(interServiceMessage.packet as WebsocketRequest)
        throw new ProductError({code: "unimplimented"})
    }

    private async handleDeleteRequest(interServiceMessage: InterServiceMessage) : Promise<InterServiceMessage[]>{
        throw new ProductError({code: "unimplimented"})
    }
}