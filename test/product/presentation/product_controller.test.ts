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
        productService.getDetailedThriftProducts.reset()
        productService.putProduct.reset()
    })


    it("should handle GET detailed product request", async function () {
        productService.getDetailedThriftProducts.resolves([
            new WebsocketResponse({
                responseId: "ID",
                statusCode: 200,
                statusMessage: "OK",
                headers: {},
                body: {
                    "detailed_thrift_products": {
                        type: 'array',
                        nullable: false,
                        object_types: [
                            {
                                type: 'object',
                                nullable: false,
                                properties: {
                                    "name": { type: 'string', nullable: true },
                                    "price": { type: 'number' },
                                    "pictures": { type: 'array', object_types: [{ type: 'string' }] },
                                    "original_price": { type: 'number', nullable: true },
                                    "size_chart": {
                                        type: 'array',
                                        object_types: [{
                                            type: 'array',
                                            properties: {
                                                "key": { type: 'string' },
                                                "value": { type: 'string' }
                                            }

                                        }

                                        ]
                                    },
                                    "store_link": {
                                        type: 'object',
                                        properties: {
                                            "id": { type: 'string' },
                                            "name": { type: 'string' },
                                            "thumbnail": { type: 'string' },
                                            "instagram": { type: 'string' }
                                        }
                                    }
                                }
                            }
                        ]
                    }
                }
            })
        ])

        const response = await productController.handleRequest(new InterServiceMessage(
            {
                packet: new WebsocketRequest(
                    {
                        requestId: "ID",
                        method: "GET",
                        url: "https://www.everythng.in/?id=2",
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
                            "detailed_thrift_products": {
                                type: 'array',
                                nullable: false,
                                object_types: [
                                    {
                                        type: 'object',
                                        nullable: false,
                                        properties: {
                                            "name": { type: 'string', nullable: true },
                                            "price": { type: 'number' },
                                            "pictures": { type: 'array', object_types: [{ type: 'string' }] },
                                            "original_price": { type: 'number', nullable: true },
                                            "size_chart": {
                                                type: 'array',
                                                object_types: [{
                                                    type: 'array',
                                                    properties: {
                                                        "key": { type: 'string' },
                                                        "value": { type: 'string' }
                                                    }

                                                }

                                                ]
                                            },
                                            "store_link": {
                                                type: 'object',
                                                properties: {
                                                    "id": { type: 'string' },
                                                    "name": { type: 'string' },
                                                    "thumbnail": { type: 'string' },
                                                    "instagram": { type: 'string' }
                                                }
                                            }
                                        }
                                    }
                                ]
                            }
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