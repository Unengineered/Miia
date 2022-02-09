import { Server } from "socket.io";
import { app } from '../core/configs/firebase.config'
import WebsocketMessage from "../core/models/websocket_message";
import WebsocketRequest from "../core/models/websocket_request";

export default class WebsocketServer {
    readonly server: Server
    private clientList: Map<string, string[]> = new Map()

    constructor({ server }: { server: Server }) {
        this.server = server
        this.attachHandlers(this.server)
        this.server.listen(3000)
    }

    private attachHandlers(server: Server): void {
        server.on('connection', async client => {
            const token = client.handshake.auth.token
            console.log("INCOMING CONNECTION WITH TOKEN: ", token)

            try{
                const user = await app.auth().verifyIdToken(token)
                this.addSocketId({uid : user.uid, socketId: client.id})
            }catch(error){
                console.log("TOKEN VERIFICATION FAILUED")
                if(token === "atique"){
                    console.log("GOT INTERNAL CLIENT TOKEN")
                    this.addSocketId({uid: '1ZND67ovhddrwA5vaNawjc1u2Lm1', socketId: client.id})
                }else{
                    return client.disconnect()
                }
            }

            client.on('request', function(data, ack){
                console.log("RECEIVED REQUESST")
                const req= WebsocketRequest.fromJson(data)
                console.log(req)
            })

            client.on('message', function(data, ack){
                console.log("RECEIVED MESSAGE")
                const msg = WebsocketMessage.fromJson(data)
                console.log(msg)
            })
        })
    }

    private addSocketId({uid, socketId}:{uid:string, socketId: string}){
        if(this.clientList.has(uid)){
            this.clientList.get(uid)?.push(socketId)
        }else{
            this.clientList.set(uid, [socketId]) 
        }
    }
}