import { assert } from 'chai'
import Sinon from 'sinon'
import InterServiceMessage, { SendTo } from '../../../src/core/models/inter_service_message'
import WebsocketRequest from '../../../src/core/models/websocket_request'
import WebsocketResponse from '../../../src/core/models/websocket_response'
import StoreController from "../../../src/store/presentation/store_controller"
import StoreService from "../../../src/store/application/store_service"

describe("STORE CONTROLLER", function () {
    var storeController: StoreController
    var storeService = Sinon.createStubInstance(StoreService)

    before(function () {
        storeController = new StoreController({ storeService: storeService })
    })

    this.afterEach(function () {
        storeService.getStoreLinkList.reset()
        storeService.saveStoreLink.reset()
    })

    it("should handle GET store link(s) request", async function () {
        storeService.getStoreLinkList.resolves([
            new WebsocketResponse({
                responseId: "ID",
                statusCode: 200,
                statusMessage: "OK",
                headers: {},
                body: {
                    "thrift_stores": [
                        {
                            "id": "id",
                            "name": "thriftlift",
                            "instagram": "https://instagram.com/thriftlift?utm_medium=copy_link",
                            "thumbnail": "https://www.shutterstock.com/image-vector/hanger-logo-icon-clothes-shop-thrift-1786368296"

                        }
                    ]

                }
            })
        ])

        const response = await storeController.handleRequest(new InterServiceMessage(
            {
                packet: new WebsocketRequest(
                    {
                        requestId: "ID",
                        method: "GET",
                        url: "https://www.everythng.in/store/",
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
                            "thrift_stores": [
                                {
                                    "id": "id",
                                    "name": "thriftlift",
                                    "instagram": "https://instagram.com/thriftlift?utm_medium=copy_link",
                                    "thumbnail": "https://www.shutterstock.com/image-vector/hanger-logo-icon-clothes-shop-thrift-1786368296"

                                }
                            ]

                        }
                    })
                }
            )
        ])


    })
    it("should handle PUT store link request", async function () {
        storeService.saveStoreLink.resolves([
            new WebsocketResponse({
                responseId: "ID",
                statusCode: 200,
                statusMessage: "OK",
                headers: {},
                body: {
                    "id": "id",
                    "name": "thriftlift",
                    "instagram": "https://instagram.com/thriftlift?utm_medium=copy_link",
                    "thumbnail": "https://www.shutterstock.com/image-vector/hanger-logo-icon-clothes-shop-thrift-1786368296"
                }
            })
        ])

        const response = await storeController.handleRequest(new InterServiceMessage(
            {
                packet: new WebsocketRequest(
                    {
                        requestId: "ID",
                        method: "PUT",
                        url: "https://www.everythng.in/store/",
                        headers: {},
                        body: {
                            "name": "thriftlift",
                            "instagram": "https://instagram.com/thriftlift?utm_medium=copy_link",
                            "thumbnail": "https://www.shutterstock.com/image-vector/hanger-logo-icon-clothes-shop-thrift-1786368296"
                        }
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
                            "id": "id",
                            "name": "thriftlift",
                            "instagram": "https://instagram.com/thriftlift?utm_medium=copy_link",
                            "thumbnail": "https://www.shutterstock.com/image-vector/hanger-logo-icon-clothes-shop-thrift-1786368296"
                        }
                    })
                }
            )
        ])
    })
})