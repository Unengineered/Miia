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
        productRepository.saveProduct.resolves(
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
            )
        )


        const response = await productService.putProduct(
            new WebsocketRequest(
                {
                    requestId: "62148dbacd944133da8d8ad4",
                    method: "GET",
                    url: "https://www.everythng.in/detailed",
                    headers: "" as any,
                    body: "" as any,
                }
            )
        )

        assert.deepEqual(response, [
            new WebsocketResponse({
                responseId: "62148dbacd944133da8d8ad4",
                statusCode: 200,
                statusMessage: "OK",
                headers: {},
                body: new DetailedThriftProductEntity(
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
                ).toJson()
            })
        ])
    })
})