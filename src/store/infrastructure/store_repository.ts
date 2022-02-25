import { Connection, Model, Document } from "mongoose";
import { StoreLinkSchema, StoreLinkEntity } from "../../core/models/store_link";
import StoreError from "../domain/errors/store_error";
import store_error from "../domain/errors/store_error";
import IStoreRepository from "../domain/i_store_repository";
import { PrismaClient } from "@prisma/client";


export default class StoreRepository implements IStoreRepository{
    readonly mongoDbConnection: Connection
    readonly storeLinkModel: Model<StoreLinkEntity>
    readonly prismaClient: PrismaClient

    constructor({mongoDbConnection, prismaClient} : {mongoDbConnection: Connection, prismaClient: PrismaClient}){
        this.mongoDbConnection = mongoDbConnection
        this.prismaClient = prismaClient
        this.storeLinkModel = this.mongoDbConnection.model<StoreLinkEntity>('StoreLink', StoreLinkSchema)
    }

    async getStoreLinkList(): Promise<StoreLinkEntity[] | store_error> {
        return this.storeLinkModel
            .find()
            .lean()
            .exec()
            .then((stores) => {
                if (!stores) return new StoreError({code: "no-items"})
                return stores.map((store) => {
                    return new StoreLinkEntity({
                        id: store._id.toString(),
                        name: store.name,
                        thumbnail: store.thumbnail,
                        instagram: store.instagram
                    })
                })
            })
            .catch((err) => {
                return new StoreError({code: "unknown"});
            })
    }

    async putStoreLink(store: StoreLinkEntity): Promise<StoreLinkEntity | store_error> {
        
        const doc = new this.storeLinkModel({
            name: store.name,
            thumbnail: store.thumbnail,
            instagram: store.instagram
        });

        return doc.save()
                .then((doc) => {
                    return doc
                })
                .catch((err) => {
                    return new StoreError({code: "unknown"})
                }) 

    }

}