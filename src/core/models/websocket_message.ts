import FormatError from "../errors/format_error"

export default class WebsocketMessage {
    readonly messageId: string
    readonly system: string
    readonly functionName: string
    readonly headers: Object
    readonly body: Object

    constructor({ messageId, system, functionName, headers, body }: { messageId: string, system: string, functionName: string, headers?: Object, body?: Object }) {
        this.messageId = messageId
        this.system = system
        this.functionName = functionName
        this.headers = headers ?? {}
        this.body = body ?? {}
    }

    public static fromJson(json: any): WebsocketMessage {

        if (json['message_id'] == undefined) {
            throw new FormatError({ code: "missing-message-id" })
        }

        if (json['system'] == undefined) {
            throw new FormatError({ code: "missing-system" })
        }

        if (json['function'] == undefined) {
            throw new FormatError({ code: "missing-function" })
        }

        return new WebsocketMessage({
            messageId: json['message_id'],
            system: json['system'],
            functionName: json['function'],
            headers: json['headers'],
            body: json['body']
        })
    }

    toJson() {
        return {
            "message_id": this.messageId,
            "system": this.system,
            "function": this.functionName,
            "headers": this.headers,
            "body": this.body
        }
    }
}