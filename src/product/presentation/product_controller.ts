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

    async handleRequest(request: InterServiceMessage): Promise<InterServiceMessage[]>{
        if(request.packet instanceof WebsocketRequest){
            switch(request.packet.method){
                case "GET" : {
                    return this.handleGetRequest(request)
                }
    
                case "PUT" : {
                    return this.handlePutRequest(request)
                }
    
                case "DELETE" : {
                    return this.handleDeleteRequest(request)
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

    private async handlePutRequest(request: InterServiceMessage) : Promise<InterServiceMessage[]>{
        throw new ProductError({code: "unimplimented"})
    }

    private async handleDeleteRequest(request: InterServiceMessage) : Promise<InterServiceMessage[]>{
        throw new ProductError({code: "unimplimented"})
    }
}