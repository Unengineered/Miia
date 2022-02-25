import InterServiceMessage from "../../core/models/inter_service_message";
import StoreError from "../domain/errors/store_error";

class StoreController{
    async handleRequest(interServiceMessage: InterServiceMessage): Promise<InterServiceMessage[]>{
        throw new StoreError({code: "unimplimented"})
    }
}