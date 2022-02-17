"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendTo = exports.InterServiceMessage = void 0;
var SendTo;
(function (SendTo) {
    SendTo[SendTo["SOCKET_ID"] = 0] = "SOCKET_ID";
    SendTo[SendTo["UID"] = 1] = "UID";
})(SendTo || (SendTo = {}));
exports.SendTo = SendTo;
class InterServiceMessage {
    constructor({ packet, uid, socketId, sendTo }) {
        this.packet = packet;
        this.uid = uid;
        this.socketId = socketId;
        this.sendTo = sendTo;
    }
}
exports.default = InterServiceMessage;
exports.InterServiceMessage = InterServiceMessage;
