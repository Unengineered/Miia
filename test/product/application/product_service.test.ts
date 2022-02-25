import { assert } from 'chai'
import Sinon from 'sinon'
import InterServiceMessage, { SendTo } from '../../../src/core/models/inter_service_message'
import { StoreLinkEntity } from '../../../src/core/models/store_link'
import WebsocketRequest from '../../../src/core/models/websocket_request'
import WebsocketResponse from '../../../src/core/models/websocket_response'
import ProductService from '../../../src/product/application/product_service'
import { DetailedThriftProductEntity} from '../../../src/product/domain/entities/detailed_thrift_product'
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
                id: "101",
                name: "Lightning McQueen Tee",
                price: 200,
                originalPrice: 5000,
                pictures: ["https://www.something.com/something", "https://www.something.com/something"],
                sizeChart: [
                    { key: "chest", value: "32" }
                ],
                storeLink: new StoreLinkEntity({
                    id: "121",
                    name: "Akron",
                    thumbnail: "https://www.everythng.in/",
                    instagram: "https://www.instagram.com/store"
                }),
            }),
            new DetailedThriftProductEntity({
                id: "102",
                name: "Men Solid Muscle Fit Piqu Polo Shirt",
                price: 700,
                originalPrice: 5000,
                pictures: ["https://www.something.com/something", "https://www.something.com/something"],
                sizeChart: [
                    { key: "chest", value: "32" }
                ],
                storeLink: new StoreLinkEntity({
                    id: "122",
                    name: "H&M",
                    thumbnail: "https://www.everythng.in/",
                    instagram: "https://www.instagram.com/store"
                }),
            }),
            new DetailedThriftProductEntity({
                id: "103",
                name: "Women Green Solid Pure Cotton Corduroy Casual Shirt",
                price: 1600,
                originalPrice: 4000,
                pictures: ["https://www.something.com/something", "https://www.something.com/something"],
                sizeChart: [
                    { key: "waist", value: "36" }
                ],
                storeLink: new StoreLinkEntity({
                    id: "123",
                    name: "H&M",
                    thumbnail: "https://www.everythng.in/",
                    instagram: "https://www.instagram.com/store"
                }),
            })
        ])


        const response = await productService.getDetailedThriftProducts(new WebsocketRequest({
            requestId: "62148dbacd944133da8d8ad4",
            method: "GET",
            url: "https://www.everythng.in/products?store_id=62148f53cd944133da8d8adf",
            headers: {},
            body: {},
        }))

        assert.deepEqual(response, [
            new WebsocketResponse({
                responseId: "62148dbacd944133da8d8ad4",
                statusCode: 200,
                statusMessage: "OK",
                headers: {},
                body: {
                    detailed_thrift_products: [new DetailedThriftProductEntity({
                        id: "101",
                        name: "Lightning McQueen Tee",
                        price: 200,
                        originalPrice: 5000,
                        pictures: ["https://www.something.com/something", "https://www.something.com/something"],
                        sizeChart: [
                            { key: "chest", value: "32" }
                        ],
                        storeLink: new StoreLinkEntity({
                            id: "121",
                            name: "Akron",
                            thumbnail: "https://www.everythng.in/",
                            instagram: "https://www.instagram.com/store"
                        }),
                    }).toJson(),
                    new DetailedThriftProductEntity({
                        id: "102",
                        name: "Men Solid Muscle Fit Piqu Polo Shirt",
                        price: 700,
                        originalPrice: 5000,
                        pictures: ["https://www.something.com/something", "https://www.something.com/something"],
                        sizeChart: [
                            { key: "chest", value: "32" }
                        ],
                        storeLink: new StoreLinkEntity({
                            id: "122",
                            name: "H&M",
                            thumbnail: "https://www.everythng.in/",
                            instagram: "https://www.instagram.com/store"
                        }),
                    }).toJson(),
                    new DetailedThriftProductEntity({
                        id: "103",
                        name: "Women Green Solid Pure Cotton Corduroy Casual Shirt",
                        price: 1600,
                        originalPrice: 4000,
                        pictures: ["https://www.something.com/something", "https://www.something.com/something"],
                        sizeChart: [
                            { key: "waist", value: "36" }
                        ],
                        storeLink: new StoreLinkEntity({
                            id: "123",
                            name: "H&M",
                            thumbnail: "https://www.everythng.in/",
                            instagram: "https://www.instagram.com/store"
                        }),
                    }).toJson()]
                }
            })
        ])
    })

    it("should get all detailed products if store_id is not present", async function () {
        productRepository.getDetailedProductsByDate.resolves([
            new DetailedThriftProductEntity({
                id: "101",
                name: "Lightning McQueen Tee",
                price: 200,
                originalPrice: 5000,
                pictures: ["https://www.something.com/something", "https://www.something.com/something"],
                sizeChart: [
                    { key: "chest", value: "32" }
                ],
                storeLink: new StoreLinkEntity({
                    id: "121",
                    name: "Akron",
                    thumbnail: "https://www.everythng.in/",
                    instagram: "https://www.instagram.com/store"
                }),
            }),
            new DetailedThriftProductEntity({
                id: "102",
                name: "Men Solid Muscle Fit Piqu Polo Shirt",
                price: 700,
                originalPrice: 5000,
                pictures: ["https://www.something.com/something", "https://www.something.com/something"],
                sizeChart: [
                    { key: "chest", value: "32" }
                ],
                storeLink: new StoreLinkEntity({
                    id: "122",
                    name: "H&M",
                    thumbnail: "https://www.everythng.in/",
                    instagram: "https://www.instagram.com/store"
                }),
            }),
            new DetailedThriftProductEntity({
                id: "103",
                name: "Women Green Solid Pure Cotton Corduroy Casual Shirt",
                price: 1600,
                originalPrice: 4000,
                pictures: ["https://www.something.com/something", "https://www.something.com/something"],
                sizeChart: [
                    { key: "waist", value: "36" }
                ],
                storeLink: new StoreLinkEntity({
                    id: "123",
                    name: "H&M",
                    thumbnail: "https://www.everythng.in/",
                    instagram: "https://www.instagram.com/store"
                }),
            })
        ])


        const response = await productService.getDetailedThriftProducts(new WebsocketRequest({
            requestId: "62148dbacd944133da8d8ad4",
            method: "GET",
            url: "https://www.everythng.in/products",
            headers: {},
            body: {},
        }))

        assert.deepEqual(response, [
            new WebsocketResponse({
                responseId: "62148dbacd944133da8d8ad4",
                statusCode: 200,
                statusMessage: "OK",
                headers: {},
                body: {
                    detailed_thrift_products: [
                        new DetailedThriftProductEntity({
                            id: "101",
                            name: "Lightning McQueen Tee",
                            price: 200,
                            originalPrice: 5000,
                            pictures: ["https://www.something.com/something", "https://www.something.com/something"],
                            sizeChart: [
                                { key: "chest", value: "32" }
                            ],
                            storeLink: new StoreLinkEntity({
                                id: "121",
                                name: "Akron",
                                thumbnail: "https://www.everythng.in/",
                                instagram: "https://www.instagram.com/store"
                            }),
                        }).toJson(),
                        new DetailedThriftProductEntity({
                            id: "102",
                            name: "Men Solid Muscle Fit Piqu Polo Shirt",
                            price: 700,
                            originalPrice: 5000,
                            pictures: ["https://www.something.com/something", "https://www.something.com/something"],
                            sizeChart: [
                                { key: "chest", value: "32" }
                            ],
                            storeLink: new StoreLinkEntity({
                                id: "122",
                                name: "H&M",
                                thumbnail: "https://www.everythng.in/",
                                instagram: "https://www.instagram.com/store"
                            }),
                        }).toJson(),
                        new DetailedThriftProductEntity({
                            id: "103",
                            name: "Women Green Solid Pure Cotton Corduroy Casual Shirt",
                            price: 1600,
                            originalPrice: 4000,
                            pictures: ["https://www.something.com/something", "https://www.something.com/something"],
                            sizeChart: [
                                { key: "waist", value: "36" }
                            ],
                            storeLink: new StoreLinkEntity({
                                id: "123",
                                name: "H&M",
                                thumbnail: "https://www.everythng.in/",
                                instagram: "https://www.instagram.com/store"
                            }),
                        }).toJson()
                    ]
                }
            })
        ])
    })

    it("should save a product", async function () {
        productRepository.saveProduct.resolves(
            new DetailedThriftProductEntity({
                id: "103",
                name: "Women Green Solid Pure Cotton Corduroy Casual Shirt",
                price: 1600,
                originalPrice: 4000,
                pictures: ["https://www.something.com/something", "https://www.something.com/something"],
                sizeChart: [
                    { key: "waist", value: "36" }
                ],
                storeLink: new StoreLinkEntity({
                    id: "121",
                    name: "Akron",
                    thumbnail: "https://www.everythng.in/",
                    instagram: "https://www.instagram.com/store"
                })
            })
        )


        const response = await productService.putProduct(
            new WebsocketRequest(
                {
                    requestId: "62148dbacd944133da8d8ad4",
                    method: "GET",
                    url: "https://www.everythng.in/products",
                    headers: {},
                    body: {},
                }
            )
        )

        assert.deepEqual(response, [
            new WebsocketResponse({
                responseId: "62148dbacd944133da8d8ad4",
                statusCode: 200,
                statusMessage: "OK",
                headers: {},
                body: new DetailedThriftProductEntity({
                    id: "103",
                    name: "Women Green Solid Pure Cotton Corduroy Casual Shirt",
                    price: 1600,
                    originalPrice: 4000,
                    pictures: ["https://www.something.com/something", "https://www.something.com/something"],
                    sizeChart: [
                        { key: "waist", value: "36" }
                    ],
                    storeLink: new StoreLinkEntity({
                        id: "121",
                        name: "Akron",
                        thumbnail: "https://www.everythng.in/",
                        instagram: "https://www.instagram.com/store"
                    })
                })
                    .toJson()
            })
        ])
    })
})