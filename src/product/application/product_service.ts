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

    async getDetailedThriftProducts(request: WebsocketRequest): Promise<(WebsocketResponse | WebsocketMessage)[]> {
        /**
         * Combine the getDetailedProduct and getProductByStore functions.
         * If store_id is missing, send all the products using productRepo.getDetailedProductsByDate.
         * If store_id is present, send all products from that store using productRepo.getDetailedProductsByStore.
         */
        const storeId = QueryString.parseUrl(request.url).query["store_id"] as string

        if (storeId) {
            return await this.productRepo.getDetailedProductsByStore(storeId)
                .then((result) => {
                    if (result instanceof ProductError) {
                        return [
                            new WebsocketResponse(
                                {
                                    responseId: request.requestId,
                                    statusCode: 400,
                                    statusMessage: "ERROR",
                                    headers: {},
                                    body: {
                                        error: result.code
                                    }
                                }
                            )
                        ]
                    } else {
                        const products = result as DetailedThriftProductEntity[]
                        return [
                            new WebsocketResponse(
                                {
                                    responseId: request.requestId,
                                    statusCode: 200,
                                    statusMessage: "OK",
                                    headers: {},
                                    body: {
                                        "detailed_thrift_products": products.map((product) => product.toJson())
                                    }
                                }
                            )
                        ]
                    }
                })
        }
        return await this.productRepo.getDetailedProductsByDate()
            .then((result) => {
                if (result instanceof ProductError) {
                    return [
                        new WebsocketResponse(
                            {
                                responseId: request.requestId,
                                statusCode: 404,
                                statusMessage: "NOT_FOUND",
                                headers: {},
                                body: {
                                    error: result.code
                                }
                            }
                        )
                    ]
                } else {
                    const products = result as DetailedThriftProductEntity[]
                    return [
                        new WebsocketResponse(
                            {
                                responseId: request.requestId,
                                statusCode: 200,
                                statusMessage: "OK",
                                headers: {},
                                body: {
                                    "detailed_thrift_products": products.map((product) => product.toJson())
                                }
                            }
                        )
                    ]
                }
            })

    }

    async putProduct(request: WebsocketRequest): Promise<(WebsocketResponse | WebsocketMessage)[]> {
        try {
            return this.productRepo.saveProduct(DetailedThriftProductEntity.forSaving({
                name: request.body["name"] as string,
                price: request.body["price"] as number,
                originalPrice: request.body["originalPrice"] as number,
                pictures: request.body["pictures"] as string[],
                sizeChart: request.body["sizeChart"] as { key: string, value: string }[],
                storeLink: request.body["storeLink"] as string
            }))
                .then((result) => {
                    if (result instanceof ProductError) {
                        return [
                            new WebsocketResponse({
                                responseId: request.requestId,
                                statusCode: 400,
                                statusMessage: "ERROR",
                                headers: {},
                                body: {
                                    "error": result.code
                                }
                            })
                        ]
                    } else {
                        const product = result as DetailedThriftProductEntity
                        return [
                            new WebsocketResponse({
                                responseId: request.requestId,
                                statusCode: 200,
                                statusMessage: "OK",
                                headers: {},
                                body: product.toJson()
                            })
                        ]
                    }
                })
        } catch (error) {
            return [
                new WebsocketResponse({
                    responseId: request.requestId,
                    statusCode: 400,
                    statusMessage: "ERROR",
                    headers: {},
                    body: {
                        "error": error
                    }
                })
            ]
        }
    }

    //Comment this function out once getDetailedThriftProducts is complete
    // private async getDetailedProduct(request: WebsocketRequest): Promise<(WebsocketResponse | WebsocketMessage)[]> {

    //     const id = QueryString.parseUrl(request.url).query['id'] as string

    //     if (id === null) {
    //         return await this.productRepo.getDetailedProductsByDate()
    //             .then((result) => {
    //                 if (result instanceof ProductError) {
    //                     return [
    //                         new WebsocketResponse(
    //                             {
    //                                 responseId: request.requestId,
    //                                 statusCode: 404,
    //                                 statusMessage: "NOT_FOUND",
    //                                 headers: {},
    //                                 body: {
    //                                     error: result.code
    //                                 }
    //                             }
    //                         )
    //                     ]
    //                 } else {
    //                     const products = result as DetailedThriftProductEntity[]
    //                     return [
    //                         new WebsocketResponse(
    //                             {
    //                                 responseId: request.requestId,
    //                                 statusCode: 200,
    //                                 statusMessage: "OK",
    //                                 headers: {},
    //                                 body: {
    //                                     "detailed_thrift_products": products.map((product) => product.toJson())
    //                                 }
    //                             }
    //                         )
    //                     ]
    //                 }
    //             })
    //     }

    //     //Comment out this part
    //     // return await this.productRepo.getDetailedProduct(id)
    //     //     .then((result) => {
    //     //         if (result instanceof ProductError) {
    //     //             return [
    //     //                 new WebsocketResponse({
    //     //                     responseId: request.requestId,
    //     //                     statusCode: 400,
    //     //                     statusMessage: "ERROR",
    //     //                     headers: {},
    //     //                     body: {
    //     //                         error: result.code
    //     //                     }
    //     //                 })
    //     //             ]
    //     //         } else {
    //     //             const product = result as DetailedThriftProductEntity
    //     //             return [new WebsocketResponse(
    //     //                 {
    //     //                     responseId: request.requestId,
    //     //                     statusCode: 200,
    //     //                     statusMessage: "OK",
    //     //                     headers: {},
    //     //                     body: {
    //     //                         "summary_thrift_products": product.toJson()
    //     //                     }
    //     //                 }
    //     //             )]
    //     //         }
    //     //     })
    // }

    //Comment this function out once getDetailedThriftProducts is complete
    // private async getProductByStore(request: WebsocketRequest): Promise<(WebsocketResponse | WebsocketMessage)[]> {

    //     const storeId = QueryString.parseUrl(request.url).query['store_id'] as string

    //     return await this.productRepo.getDetailedProductsByStore(storeId)
    //         .then((result) => {
    //             if (result instanceof ProductError) {
    //                 return [
    //                     new WebsocketResponse(
    //                         {
    //                             responseId: request.requestId,
    //                             statusCode: 400,
    //                             statusMessage: "ERROR",
    //                             headers: {},
    //                             body: {
    //                                 error: result.code
    //                             }
    //                         }
    //                     )
    //                 ]
    //             } else {
    //                 const products = result as DetailedThriftProductEntity[]
    //                 return [
    //                     new WebsocketResponse(
    //                         {
    //                             responseId: request.requestId,
    //                             statusCode: 200,
    //                             statusMessage: "OK",
    //                             headers: {},
    //                             body: {
    //                                 "detailed_thrift_products": products.map((product) => product.toJson())
    //                             }
    //                         }
    //                     )
    //                 ]
    //             }
    //         })
    // }



    /**
     * Some functions won't be required after
     * moving away from the SQL databases, they 
     * have been listed below.
     */

    //  async getSummaryProducts(request: WebsocketRequest): Promise<(WebsocketResponse | WebsocketMessage)[]> {
    //     return this.productRepo.getProductsByDate()
    //         .then((result) => {
    //             if(result instanceof ProductError){
    //                 return [
    //                     new WebsocketResponse({
    //                         responseId: request.requestId,
    //                         statusCode: 400,
    //                         statusMessage: "ERROR",
    //                         headers: {},
    //                         body: {
    //                             error: result.code
    //                         }
    //                     })
    //                 ]
    //             }
    //             const products = result as SummaryThriftProduct[]
    //             return [
    //                 new WebsocketResponse({
    //                     responseId: request.requestId,
    //                     statusCode: 200,
    //                     statusMessage: "OK",
    //                     headers: {},
    //                     body: {
    //                         products: products.map((product) => product.toJson())
    //                     }
    //                 })]
    //         })
    //         .catch((error) =>{
    //             return [
    //                 new WebsocketResponse({
    //                     responseId: request.requestId,
    //                     statusCode: 400,
    //                     statusMessage: "ERROR",
    //                     headers: {},
    //                     body: {
    //                         error: error.code
    //                     }
    //                 })
    //             ]
    //         })
    // }
}