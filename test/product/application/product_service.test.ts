//TODO: (ishan)
import { assert } from 'chai'
import Sinon from 'sinon'
import InterServiceMessage, { SendTo } from '../../../src/core/models/inter_service_message'
import WebsocketRequest from '../../../src/core/models/websocket_request'
import WebsocketResponse from '../../../src/core/models/websocket_response'
import ProductService from '../../../src/product/application/product_service'
import { DetailedThriftProductEntity } from '../../../src/product/domain/entities/detailed_thrift_product'
import ProductRepository from '../../../src/product/infrastructure/product_repository'


describe("PRODUCT SERVICE", function () {

    var productService: ProductService
    var productRepository = Sinon.createStubInstance(ProductRepository)

    before(function () {
        productService = new ProductService({ productRepo: productRepository })
    })

    this.afterEach(function () {
        productRepository.getDetailedProductsByDate.reset()
        productRepository.getDetailedProductsByStore.reset()
        productRepository.saveProduct.reset()
    })


    it("should get detailed products using store_id", async function () {
        productRepository.getDetailedProductsByStore.resolves([
            new DetailedThriftProductEntity({
                id: "122",
                name: "NAME",
                price: 200,
                originalPrice: 5000,
                pictures: ["url1", "url2"],
                sizeChart: [
                    { key: "chest", value: "32" }
                ],
                storeLink: "122",
            })
        ])


        const response = await productService.getDetailedThriftProducts(new WebsocketRequest({
            requestId: "62148dbacd944133da8d8ad4",
            method: "GET",
            url: "https://www.everythng.in/detailed?store_id=62148f53cd944133da8d8adf",
            headers: "" as any,
            body: "" as any,
        }))

        assert.deepEqual(response, [
            new WebsocketResponse({
                responseId: "62148dbacd944133da8d8ad4",
                statusCode: 200,
                statusMessage: "OK",
                headers: {},
                body: {
                    detailed_thrift_products: [new DetailedThriftProductEntity(
                        {
                            id: "122",
                            name: "NAME",
                            price: 200,
                            originalPrice: 5000,
                            pictures: ["url1", "url2"],
                            sizeChart: [
                                { key: "chest", value: "32" }
                            ],
                            storeLink: "122",
                        }
                    ).toJson()]
                }
            })
        ])
    })

    it("should get all detailed products if store_id is not present", async function () {
        productRepository.getDetailedProductsByDate.resolves([
            new DetailedThriftProductEntity({
                id: "122",
                name: "NAME",
                price: 200,
                originalPrice: 5000,
                pictures: ["url1", "url2"],
                sizeChart: [
                    { key: "chest", value: "32" }
                ],
                storeLink: "122",
            }),
            new DetailedThriftProductEntity({
                id: "121",
                name: "NAME1",
                price: 300,
                originalPrice: 10000,
                pictures: ["url3", "url4"],
                sizeChart: [
                    { key: "waist", value: "36" }
                ],
                storeLink: "121",
            })
        ])


        const response = await productService.getDetailedThriftProducts(new WebsocketRequest({
            requestId: "62148dbacd944133da8d8ad4",
            method: "GET",
            url: "https://www.everythng.in/detailed",
            headers: "" as any,
            body: "" as any,
        }))

        assert.deepEqual(response, [
            new WebsocketResponse({
                responseId: "62148dbacd944133da8d8ad4",
                statusCode: 200,
                statusMessage: "OK",
                headers: {},
                body: {
                    detailed_thrift_products: [
                        new DetailedThriftProductEntity(
                            {
                                id: "122",
                                name: "NAME",
                                price: 200,
                                originalPrice: 5000,
                                pictures: ["url1", "url2"],
                                sizeChart: [
                                    { key: "chest", value: "32" }
                                ],
                                storeLink: "122",
                            }
                        ).toJson(),
                        new DetailedThriftProductEntity({
                            id: "121",
                            name: "NAME1",
                            price: 300,
                            originalPrice: 10000,
                            pictures: ["url3", "url4"],
                            sizeChart: [
                                { key: "waist", value: "36" }
                            ],
                            storeLink: "121",
                        }
                        ).toJson()
                    ]
                }
            })
        ])
    })

    // it("should get list of summary products", async function () {

    // })
    it("should save a product", async function () {

    })
})



//TODO:(vd)

/**
 * These tests currently only test if the controller
 * is calling the right methods of the service.
 *
 * Ideally it should also test for the fact the controller
 * returns whatever the service gives it without manipulation.
 * This hasn't been done yet to save time.
 */
// describe("PRODUCT CONTROLLER", function () {


//     it("should handle successful GET summary request", async function () {
//         productService.getSummaryProducts.resolves(
//             [
//                 new WebsocketResponse({
//                     responseId: "ID",
//                     statusCode: 200,
//                     statusMessage: "OK",
//                     headers: {},
//                     body: {
//                         "summary_thrift_products": [
//                             {
//                                 id: 1,
//                                 name: "FIRST PRODUCT",
//                                 thumbnail: "url1"
//                             },
//                             {
//                                 id: 2,
//                                 name: "SECOND PRODUCT",
//                                 thumbnail: "url2"
//                             }
//                         ]
//                     }
//                 })
//             ]
//         )

//         const response = await productController.handleRequest(new InterServiceMessage(
//             {
//                 packet: new WebsocketRequest(
//                     {
//                         requestId: "ID",
//                         method: "GET",
//                         url: "https://www.everythng.in/summary",
//                         headers: {},
//                         body: {}
//                     }
//                 ),
//                 uid: "UID",
//                 socketId: "SOCKET_ID"
//             }
//         ))

//         assert.deepEqual(response, [new InterServiceMessage(
//             {
//                 packet: new WebsocketResponse(
//                     {
//                         responseId: "ID",
//                         statusCode: 200,
//                         statusMessage: "OK",
//                         headers: {},
//                         body: {
//                             "summary_thrift_products": [
//                                 {
//                                     id: 1,
//                                     name: "FIRST PRODUCT",
//                                     thumbnail: "url1"
//                                 },
//                                 {
//                                     id: 2,
//                                     name: "SECOND PRODUCT",
//                                     thumbnail: "url2"
//                                 }
//                             ]
//                         }
//                     }
//                 ),
//                 uid: "UID",
//                 socketId: "SOCKET_ID",
//                 sendTo: SendTo.SOCKET_ID
//             }
//         )])
//     })

//     it("should handle GET detailed product request", async function () {
//         productService.getDetailedProduct.resolves([
//             new WebsocketResponse({
//                 responseId: "ID",
//                 statusCode: 200,
//                 statusMessage: "OK",
//                 headers: {},
//                 body: {
//                     "id": 1,
//                     "name": "TEST_DOC",
//                     "price": 500,
//                     "originalPrice": 4000,
//                     "pictures": ["url1", "url2"],
//                     "sizeChart": [
//                         { "key": "chest", "value": "32" },
//                         { "key": "chest", "value": "32" }
//                     ]
//                 }
//             })
//         ])

//         const response = await productController.handleRequest(new InterServiceMessage(
//             {
//                 packet: new WebsocketRequest(
//                     {
//                         requestId: "ID",
//                         method: "GET",
//                         url: "https://www.everythng.in/detailed?id=2",
//                         headers: {},
//                         body: {}
//                     }
//                 ),
//                 uid: "UID",
//                 socketId: "SOCKET_ID"
//             }
//         ))

//         assert.deepEqual(response, [
//             new InterServiceMessage(
//                 {
//                     uid: "UID",
//                     socketId: "SOCKET_ID",
//                     sendTo: SendTo.SOCKET_ID,
//                     packet: new WebsocketResponse({
//                         responseId: "ID",
//                         statusCode: 200,
//                         statusMessage: "OK",
//                         headers: {},
//                         body: {
//                             "id": 1,
//                             "name": "TEST_DOC",
//                             "price": 500,
//                             "originalPrice": 4000,
//                             "pictures": ["url1", "url2"],
//                             "sizeChart": [
//                                 { "key": "chest", "value": "32" },
//                                 { "key": "chest", "value": "32" }
//                             ]
//                         }
//                     })
//                 }
//             )
//         ])
//     })

//     it("should handle PUT request", async function () {
//         productService.putProduct.resolves([
//             new WebsocketResponse({
//                 responseId: "ID",
//                 statusCode: 200,
//                 statusMessage: "OK",
//                 headers: {},
//                 body: {
//                     "id": 1,
//                     "name": "TEST_DOC",
//                     "price": 500,
//                     "originalPrice": 4000,
//                     "pictures": ["url1", "url2"],
//                     "sizeChart": [
//                         { "key": "chest", "value": "32" },
//                         { "key": "chest", "value": "32" }
//                     ]
//                 }
//             })
//         ])

//         const results = await productController.handleRequest(
//             new InterServiceMessage(
//                 {
//                     packet: new WebsocketRequest({
//                         requestId: "ID",
//                         method: "PUT",
//                         url: "https://www.everythng.com/product",
//                         headers: {},
//                         body: {
//                             "name": "TEST_DOC",
//                             "price": 500,
//                             "originalPrice": 4000,
//                             "pictures": ["url1", "url2"],
//                             "sizeChart": [
//                                 { "key": "chest", "value": "32" },
//                                 { "key": "chest", "value": "32" }
//                             ]
//                         }
//                     }),
//                     uid: "UID",
//                     socketId: "SOCKET_ID"
//                 }
//             )
//         )

//         assert.deepEqual(results, [
//             new InterServiceMessage(
//                 {
//                     uid: "UID",
//                     socketId: "SOCKET_ID",
//                     sendTo: SendTo.SOCKET_ID,
//                     packet: new WebsocketResponse(
//                         {
//                             responseId: "ID",
//                             statusCode: 200,
//                             statusMessage: "OK",
//                             headers: {},
//                             body: {
//                                 "id": 1,
//                                 "name": "TEST_DOC",
//                                 "price": 500,
//                                 "originalPrice": 4000,
//                                 "pictures": ["url1", "url2"],
//                                 "sizeChart": [
//                                     { "key": "chest", "value": "32" },
//                                     { "key": "chest", "value": "32" }
//                                 ]
//                             }
//                         }
//                     )
//                 }
//             )
//         ])
//     })
//     it("should handle DELETE request")
// })