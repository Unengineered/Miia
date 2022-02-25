import { Connection, Model } from "mongoose";
import { StoreLinkEntity, StoreLinkSchema } from "../../core/models/store_link";
import StoreError from "../domain/errors/store_error";
import IStoreRepository from "../domain/i_store_repository";

export default class StoreRepository implements IStoreRepository {
    readonly mongoDbConnection: Connection
    readonly storeLinkModel: Model<StoreLinkEntity>

    constructor({ mongoDbConnection }: { mongoDbConnection: Connection }) {
        this.mongoDbConnection = mongoDbConnection
        this.storeLinkModel = this.mongoDbConnection.model<StoreLinkEntity>('StoreLink', StoreLinkSchema)
    }

    getStoreLinkList(): Promise<StoreLinkEntity[] | StoreError> {
        throw new StoreError({ code: "unimplemented." });
    }
    putStoreLink(store: StoreLinkEntity): Promise<StoreLinkEntity | StoreError> {
        throw new StoreError({ code: "unimplemented." });
    }

}