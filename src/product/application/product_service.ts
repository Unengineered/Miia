import { DetailedThriftProductEntity } from "../domain/entities/detailed_thrift_product";
import ProductError from "../domain/errors/product_error";
import IProductRepository from "../domain/i_product_repository";
import SummaryThriftProduct from "../domain/entities/summary_thrift_product";
import WebsocketResponse from "../../core/models/websocket_response";
import WebsocketRequest from "../../core/models/websocket_request";
import WebsocketMessage from "../../core/models/websocket_message";
import QueryString from 'query-string'

export default class ProductService {
    readonly productRepo: IProductRepository

    constructor({ productRepo }: { productRepo: IProductRepository }) {
        this.productRepo = productRepo
    }

    async getDetailedProduct(request: WebsocketRequest): Promise<(WebsocketResponse | WebsocketMessage)[]> {
        //TODO: Handle type error of parsed id string

        const id = QueryString.parseUrl(request.url).query['id'] as string
        const num_id = Number.parseInt(id)

        return await this.productRepo.getDetailedProduct(num_id)
            .then((result) =>{
                if(result instanceof ProductError){
                    return [
                        new WebsocketResponse({
                            responseId: request.requestId,
                            statusCode: 400,
                            statusMessage: "ERROR",
                            headers: {},
                            body: {
                                error: result.code
                            }
                        })
                    ]
                }else{
                    const product = result as DetailedThriftProductEntity
                    return [new WebsocketResponse(
                        {
                            responseId: request.requestId,
                            statusCode: 200,
                            statusMessage: "OK",
                            headers: {},
                            body: {
                                "summary_thrift_products": product.toJson()
                            }
                        }
                    )]
                }
            })
    }

    async getSummaryProducts(request: WebsocketRequest): Promise<(WebsocketResponse | WebsocketMessage)[]> {
        return this.productRepo.getProductsByDate()
            .then((result) => {
                if(result instanceof ProductError){
                    return [
                        new WebsocketResponse({
                            responseId: request.requestId,
                            statusCode: 400,
                            statusMessage: "ERROR",
                            headers: {},
                            body: {
                                error: result.code
                            }
                        })
                    ]
                }
                const products = result as SummaryThriftProduct[]
                return [
                    new WebsocketResponse({
                        responseId: request.requestId,
                        statusCode: 200,
                        statusMessage: "OK",
                        headers: {},
                        body: {
                            products: products.map((product) => product.toJson())
                        }
                    })]
            })
            .catch((error) =>{
                return [
                    new WebsocketResponse({
                        responseId: request.requestId,
                        statusCode: 400,
                        statusMessage: "ERROR",
                        headers: {},
                        body: {
                            error: error.code
                        }
                    })
                ]
            })
    }

    async getProductByStore(storeId: string): Promise<(WebsocketResponse | WebsocketMessage)[]> {
        throw new ProductError({ code: "unimplimented" })
    }

    async putProduct(product: DetailedThriftProductEntity): Promise<(WebsocketResponse | WebsocketMessage)[]> {
        throw new ProductError({ code: "unimplimented" })
       // return await this.productRepo.saveProduct(product)
    }
}