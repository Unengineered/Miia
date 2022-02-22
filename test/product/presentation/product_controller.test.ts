import { assert } from 'chai'
import Sinon from 'sinon'
import InterServiceMessage, { SendTo } from '../../../src/core/models/inter_service_message'
import WebsocketRequest from '../../../src/core/models/websocket_request'
import WebsocketResponse from '../../../src/core/models/websocket_response'
import ProductService from '../../../src/product/application/product_service'
import ProductController from '../../../src/product/presentation/product_controller'

//TODO:(vd)

/**
 * These tests currently only test if the controller
 * is calling the right methods of the service.
 * 
 * Ideally it should also test for the fact the controller
 * returns whatever the service gives it without manipulation.
 * This hasn't been done yet to save time.
 */
describe("PRODUCT CONTROLLER", function () {

    var productController: ProductController
    var productService = Sinon.createStubInstance(ProductService)

    before(function () {
        productController = new ProductController({ productService: productService })
    })

    this.afterEach(function () {
        productService.getDetailedProduct.reset()
        productService.getProductByStore.reset()
        productService.getSummaryProducts.reset()
        productService.putProduct.reset()
    })

    it("should handle successful GET summary request", async function () {
        productService.getSummaryProducts.resolves(
            [
                new WebsocketResponse({
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
        )])
    })

    it("should handle GET detailed product request", async function () {
        productService.getDetailedProduct.resolves([
            new WebsocketResponse({
                responseId: "ID",
                statusCode: 200,
                statusMessage: "OK",
                headers: {},
                body: {
                    "id": 1,
                    "name": "TEST_DOC",
                    "price": 500,
                    "originalPrice": 4000,
                    "pictures": ["url1", "url2"],
                    "sizeChart": [
                        { "key": "chest", "value": "32" },
                        { "key": "chest", "value": "32" }
                    ]
                }
            })
        ])

        const response = await productController.handleRequest(new InterServiceMessage(
            {
                packet: new WebsocketRequest(
                    {
                        requestId: "ID",
                        method: "GET",
                        url: "https://www.everythng.in/detailed?id=2",
                        headers: {},
                        body: {}
                    }
                ),
                uid: "UID",
                socketId: "SOCKET_ID"
            }
        ))

        assert.deepEqual(response, [
            new InterServiceMessage(
                {
                    uid: "UID",
                    socketId: "SOCKET_ID",
                    sendTo: SendTo.SOCKET_ID,
                    packet: new WebsocketResponse({
                        responseId: "ID",
                        statusCode: 200,
                        statusMessage: "OK",
                        headers: {},
                        body: {
                            "id": 1,
                            "name": "TEST_DOC",
                            "price": 500,
                            "originalPrice": 4000,
                            "pictures": ["url1", "url2"],
                            "sizeChart": [
                                { "key": "chest", "value": "32" },
                                { "key": "chest", "value": "32" }
                            ]
                        }
                    })
                }
            )
        ])
    })

    it("should handle PUT request", async function () {
        productService.putProduct.resolves([
            new WebsocketResponse({
                responseId: "ID",
                statusCode: 200,
                statusMessage: "OK",
                headers: {},
                body: {
                    "id": 1,
                    "name": "TEST_DOC",
                    "price": 500,
                    "originalPrice": 4000,
                    "pictures": ["url1", "url2"],
                    "sizeChart": [
                        { "key": "chest", "value": "32" },
                        { "key": "chest", "value": "32" }
                    ]
                }
            })
        ])

        const results = await productController.handleRequest(
            new InterServiceMessage(
                {
                    packet: new WebsocketRequest({
                        requestId: "ID",
                        method: "PUT",
                        url: "https://www.everythng.com/product",
                        headers: {},
                        body: {
                            "name": "TEST_DOC",
                            "price": 500,
                            "originalPrice": 4000,
                            "pictures": ["url1", "url2"],
                            "sizeChart": [
                                { "key": "chest", "value": "32" },
                                { "key": "chest", "value": "32" }
                            ]
                        }
                    }),
                    uid: "UID",
                    socketId: "SOCKET_ID"
                }
            )
        )

        assert.deepEqual(results, [
            new InterServiceMessage(
                {
                    uid: "UID",
                    socketId: "SOCKET_ID",
                    sendTo: SendTo.SOCKET_ID,
                    packet: new WebsocketResponse(
                        {
                            responseId: "ID",
                            statusCode: 200,
                            statusMessage: "OK",
                            headers: {},
                            body: {
                                "id": 1,
                                "name": "TEST_DOC",
                                "price": 500,
                                "originalPrice": 4000,
                                "pictures": ["url1", "url2"],
                                "sizeChart": [
                                    { "key": "chest", "value": "32" },
                                    { "key": "chest", "value": "32" }
                                ]
                            }
                        }
                    )
                }
            )
        ])
    })
    it("should handle DELETE request")
})