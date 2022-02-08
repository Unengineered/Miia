
export default class WebsocketResponse {
    readonly responseId: string
    readonly statusCode: number
    readonly statusMessage: string
    readonly headers: Object
    readonly body: Object

    constructor({ responseId, statusCode, statusMessage, headers, body }:
        { responseId: string, statusCode: number, statusMessage: string, headers?: Object, body?: Object }) {
        this.responseId = responseId
        this.statusCode = statusCode
        this.statusMessage = statusMessage
        this.headers = headers ?? {}
        this.body = body ?? {}
    }

    toJson() {
        return ({
            "response_id": this.responseId,
            "status_code": this.statusCode,
            "status_message": this.statusMessage,
            "headers": this.headers ?? {},
            "body": this.body ?? {}
        })
    }
}