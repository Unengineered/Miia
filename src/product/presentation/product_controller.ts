import {InterServiceMessage, SendTo} from "../../core/models/inter_service_message";
import WebsocketMessage from "../../core/models/websocket_message";
import WebsocketRequest from "../../core/models/websocket_request";
import ProductError from "../domain/errors/product_error";
import Url from 'url-parse'
import ProductService from "../application/product_service";
import WebsocketResponse from "../../core/models/websocket_response";
import QueryString from 'query-string'

class ProductController{

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
        throw new ProductError({code: "unimpliment"})
    }

    async handleMessage(message: InterServiceMessage): Promise<InterServiceMessage[]>{
        throw new ProductError({code: "unimpliment"})
    } 

    //TODO(advait): Handle product errors
    private async handleGetRequest(request: InterServiceMessage) : Promise<InterServiceMessage[]>{
        if(request.packet instanceof WebsocketRequest){
            const url = new Url(request.packet.url)
            switch(url.pathname){
                case 'summary' : {
                    const serviceResponse = await this.productService.getSummaryProducts()
                    return [new InterServiceMessage({
                        packet: new WebsocketResponse({
                                responseId: request.packet.requestId,
                                statusCode: 200,
                                statusMessage: "OK",
                                headers: {},
                                body: {
                                    products: serviceResponse
                                }
                            }),
                        uid: request.uid,
                        sendTo: SendTo.SOCKET_ID,
                        socketId: request.socketId
                    })]
                }
    
                case 'detailed' : {
                    //TODO: Handle type error of parsed id string
                    const id = QueryString.parseUrl(request.packet.url).query['id'] as string
                    const num_id = Number.parseInt(id)

                    const serviceResponse = await this.productService.getDetailedProduct(num_id)
                    return [new InterServiceMessage({
                        packet: new WebsocketResponse({
                                responseId: request.packet.requestId,
                                statusCode: 200,
                                statusMessage: "OK",
                                headers: {},
                                body: serviceResponse
                            }),
                        uid: request.uid,
                        sendTo: SendTo.SOCKET_ID,
                        socketId: request.socketId
                    })]
                }
            }
        }
        throw new ProductError({code: "unimpliment"})
    }

    private async handlePutRequest(request: InterServiceMessage) : Promise<InterServiceMessage[]>{
        throw new ProductError({code: "unimpliment"})
    }

    private async handleDeleteRequest(request: InterServiceMessage) : Promise<InterServiceMessage[]>{
        throw new ProductError({code: "unimpliment"})
    }
}