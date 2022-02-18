import { assert } from 'chai'
import Sinon from 'sinon'
import InterServiceMessage, { SendTo } from '../../../src/core/models/inter_service_message'
import WebsocketRequest from '../../../src/core/models/websocket_request'
import WebsocketResponse from '../../../src/core/models/websocket_response'
import ProductService from '../../../src/product/application/product_service'
import ProductController from '../../../src/product/presentation/product_controller'


describe("PRODUCT CONTROLLER", function () {

    var productController: ProductController
    var productService = Sinon.createStubInstance(ProductService)

    before(function(){
        productController = new ProductController({productService: productService})
    })

    this.afterEach(function(){
        productService.getDetailedProduct.reset()
        productService.getProductByStore.reset()
        productService.getSummaryProducts.reset()
        productService.putProduct.reset()
    })

    it("should handle successful GET summary request", async function(){
        productService.getSummaryProducts.resolves(
            [
                new WebsocketResponse({
                    responseId: "ID",
                    statusCode: 200,
                    statusMessage: "OK",
                    headers: {},
                    body: {
                        "summary_thrift_products" : [
                            {
                                id: 1,
                                name: "FIRST PRODUCT",
                                thumbnail: "url1"
                            },
                            {
                                id: 2,
                                name: "SECOND PRODUCT",
                                thumbnail: "url2"
                            }
                        ]
                    }
                })
            ]
        )

        const response = await productController.handleRequest(new InterServiceMessage(
            {
                packet: new WebsocketRequest(
                    {
                        requestId: "ID",
                        method: "GET",
                        url: "https://www.everythng.in/summary",
                        headers: {},
                        body: {}
                    }
                ),
                uid: "UID",
                socketId: "SOCKET_ID"
            }
        ))
        
        assert.deepEqual(response, [new InterServiceMessage(
            {
                packet: new WebsocketResponse(
                    {
                        responseId: "ID",
                        statusCode: 200,
                        statusMessage: "OK",
                        headers: {},
                        body: {
                            "summary_thrift_products": [
                                {
                                    id: 1,
                                    name: "FIRST PRODUCT",
                                    thumbnail: "url1" 
                                },
                                {
                                    id: 2,
                                    name: "SECOND PRODUCT",
                                    thumbnail: "url2"
                                }
                            ]
                        }
                    }
                ),
                uid: "UID",
                socketId: "SOCKET_ID",
                sendTo: SendTo.SOCKET_ID
            }
        )] )
    })

    it("should handle PUT request")
    it("should handle DELETE request")

})