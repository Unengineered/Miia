import { assert } from 'chai'
import Sinon from 'sinon'
import { StoreLinkEntity } from '../../../src/core/models/store_link'
import WebsocketRequest from '../../../src/core/models/websocket_request'
import WebsocketResponse from '../../../src/core/models/websocket_response'
import StoreService from '../../../src/store/application/store_service'
import StoreRepository from '../../../src/store/infrastructure/store_repository'

describe("STORE SERVICE", function () {

    var storeService: StoreService
    var storeRepository = Sinon.createStubInstance(StoreRepository)


    before(function () {
        storeService = new StoreService({ storeRepo: storeRepository })
    })

    this.beforeEach(function () {
        storeRepository.getStoreLinkList.reset()
        storeRepository.putStoreLink.reset()
    })

    it("should return websocket response with list of store links", async function () {
        storeRepository.getStoreLinkList.resolves([
            new StoreLinkEntity({
                id: "101",
                name: "Arkon",
                thumbnail: "https://www.example.com/example",
                instagram: "https://www.instagram.com/instagram"
            }),
            new StoreLinkEntity({
                id: "102",
                name: "H&M",
                thumbnail: "https://www.example.com/example",
                instagram: "https://www.instagram.com/instagram"
            }),
            new StoreLinkEntity({
                id: "103",
                name: "Zara",
                thumbnail: "https://www.example.com/example",
                instagram: "https://www.instagram.com/instagram"
            })
        ])

        const response = await storeService.getStoreLinkList
            (
                new WebsocketRequest(
                    {
                        requestId: "62148dbacd944133da8d8ad4",
                        method: "GET",
                        url: "https://www.everythng.in/store_links",
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
                body: {
                    store_links: [
                        new StoreLinkEntity({
                            id: "101",
                            name: "Arkon",
                            thumbnail: "https://www.example.com/example",
                            instagram: "https://www.instagram.com/instagram"
                        }),
                        new StoreLinkEntity({
                            id: "102",
                            name: "H&M",
                            thumbnail: "https://www.example.com/example",
                            instagram: "https://www.instagram.com/instagram"
                        }),
                        new StoreLinkEntity({
                            id: "103",
                            name: "Zara",
                            thumbnail: "https://www.example.com/example",
                            instagram: "https://www.instagram.com/instagram"
                        })
                    ]
                }
            })
        ])
    })

    it("should return websocket response with newly added store link", async function () {
        storeRepository.putStoreLink.resolves(
            new StoreLinkEntity({
                id: "102",
                name: "H&M",
                thumbnail: "https://www.example.com/example",
                instagram: "https://www.instagram.com/instagram"
            })
        )

        const response = await storeService.saveStoreLink(
            new WebsocketRequest(
                {
                    requestId: "62148dbacd944133da8d8ad4",
                    method: "PUT",
                    url: "https://www.everythng.in/store_link",
                    headers: {},
                    body: new StoreLinkEntity(
                        {
                            id: "102",
                            name: "H&M",
                            thumbnail: "https://www.example.com/example",
                            instagram: "https://www.instagram.com/instagram"
                        }
                    ),
                }
            )
        )

        assert.deepEqual(response, [
            new WebsocketResponse({
                responseId: "62148dbacd944133da8d8ad4",
                statusCode: 200,
                statusMessage: "OK",
                headers: {},
                body: {
                    store_link: new StoreLinkEntity(
                        {
                            id: "102",
                            name: "H&M",
                            thumbnail: "https://www.example.com/example",
                            instagram: "https://www.instagram.com/instagram"
                        }
                    ),
                }
            })
        ])
    })
})