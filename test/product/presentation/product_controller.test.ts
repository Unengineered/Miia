import { assert } from 'chai'
import Sinon from 'sinon'
import InterServiceMessage, { SendTo } from '../../../src/core/models/inter_service_message'
import WebsocketRequest from '../../../src/core/models/websocket_request'
import WebsocketResponse from '../../../src/core/models/websocket_response'
import ProductService from '../../../src/product/application/product_service'
import ProductController from '../../../src/product/presentation/product_controller'


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
                    "detailed_thrift_products": [
                        {
                            "name": "skirt",
                            "price": 234,
                            "original_price": 3400,
                            "description" : "product description",
                            "pictures": [
                                "https://skirt.com/pk",
                                "https://skirt.com/pk"
                            ],
                            "size_chart": [
                                {
                                    "key": "length",
                                    "value": "2"
                                },
                                {
                                    "key": "seam",
                                    "value": "loose"
                                }
                            ],
                            "store_link": {
                                "id": "1",
                                "name": "thriftlift",
                                "thumbnail": "https://www.shutterstock.com/image-vector/hanger-logo-icon-clothes-shop-thrift-1786368296",
                                "instagram": "https://instagram.com/thriftlift?utm_medium=copy_link"
                            }
                        }
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
                        url: "https://www.everythng.in/product/",
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
                            "detailed_thrift_products": [
                                {
                                    "name": "skirt",
                                    "price": 234,
                                    "original_price": 3400,
                                    "description" : "product description",
                                    "pictures": [
                                        "https://skirt.com/pk",
                                        "https://skirt.com/pk"
                                    ],
                                    "size_chart": [
                                        {
                                            "key": "length",
                                            "value": "2"
                                        },
                                        {
                                            "key": "seam",
                                            "value": "loose"
                                        }
                                    ],
                                    "store_link": {
                                        "id": "1",
                                        "name": "thriftlift",
                                        "thumbnail": "https://www.shutterstock.com/image-vector/hanger-logo-icon-clothes-shop-thrift-1786368296",
                                        "instagram": "https://instagram.com/thriftlift?utm_medium=copy_link"
                                    }
                                }
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
                    "original_price": 4000,
                    "description" : "product description",
                    "pictures": ["url1", "url2"],
                    "size_chart": [
                        { "key": "chest", "value": "32" },
                        { "key": "chest", "value": "32" }
                    ],
                    "store_link": "STORE_ID"
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
                            "original_price": 4000,
                            "description" : "product description",
                            "pictures": ["url1", "url2"],
                            "size_chart": [
                                { "key": "chest", "value": "32" },
                                { "key": "chest", "value": "32" }
                            ],
                            "store_link": "STORE_ID"
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
                                "original_price": 4000,
                                "description" : "product description",
                                "pictures": ["url1", "url2"],
                                "size_chart": [
                                    { "key": "chest", "value": "32" },
                                    { "key": "chest", "value": "32" }
                                ],
                                "store_link": "STORE_ID"
                            }
                        }
                    )
                }
            )
        ])
    })
    it("should handle DELETE request")
})