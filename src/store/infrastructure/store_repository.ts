import { StoreLinkEntity } from "../../core/models/store_link";
import StoreError from "../domain/errors/store_error";
import store_error from "../domain/errors/store_error";
import IStoreRepository from "../domain/i_store_repository";

class StoreRepository implements IStoreRepository{
    getStoreLinkList(): Promise<StoreLinkEntity[] | store_error> {
        throw new StoreError({code: "unimplemented."});
    }
    putStoreLink(): Promise<StoreLinkEntity[] | store_error> {
        throw new StoreError({code: "unimplemented."});
    }

}