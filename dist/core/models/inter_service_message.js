"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InterServiceMessage {
    constructor({ packet, uid, socketId, sendTo }) {
        this.packet = packet;
        this.uid = uid;
        this.socketId = socketId;
        this.sendTo = sendTo;
    }
}
exports.default = InterServiceMessage;
