import { StoreLinkEntity } from "../../core/models/store_link";
import StoreError from "./errors/store_error";

export default interface IStoreRepository{
    getStoreLinkList(): Promise<StoreLinkEntity[] | StoreError>
    putStoreLink(store: StoreLinkEntity): Promise<StoreLinkEntity | StoreError>
}