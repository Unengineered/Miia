import WebsocketRequest from "./core/models/websocket_request";

console.log("Hello, world");

export function testFunc(): boolean{
    return true;
}

export class AClass{
    testFunc2(): boolean{
        const req = WebsocketRequest.fromJson({});
        return false;
    }
}