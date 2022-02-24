import FormatError from "../errors/format_error"

export default class WebsocketRequest {
    readonly requestId: string
    readonly method: string
    readonly url: string
    readonly headers: {[key:string] : any}
    readonly body: {[key:string] : any}

    constructor(
        { requestId, method, url, headers, body }:
            { requestId: string, method: string, url: string, headers: {[key:string] : any}, body: {[key:string] : any} }) {
        this.requestId = requestId
        this.method = method
        this.url = url
        this.headers = headers
        this.body = body
    }

    public static fromJson(json: any): WebsocketRequest {

        if (json['request_id'] == undefined) {
            throw new FormatError({ code: "missing-request-id" })
        }

        if (json['method'] == undefined) {
            throw new FormatError({ code: "missing-method" })
        }

        if (json['url'] == undefined) {
            throw new FormatError({ code: "missing-url" })
        }

        return new WebsocketRequest({
            requestId: json["request_id"] as string,
            method: json['method'],
            url: json['url'],
            headers: json['headers'] ?? {},
            body: json['body'] ?? {}
        })
    }
}
