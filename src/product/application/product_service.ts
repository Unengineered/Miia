import { DetailedThriftProductEntity } from "../domain/entities/detailed_thrift_product";
import ProductError from "../domain/errors/product_error";
import IProductRepository from "../domain/i_product_repository";
import SummaryThriftProduct from "../domain/entities/summary_thrift_product";

export default class ProductService{
    readonly productRepo: IProductRepository

    constructor({productRepo} : {productRepo: IProductRepository}){
        this.productRepo = productRepo
    }

    async getDetailedProduct(id: number): Promise<DetailedThriftProductEntity | ProductError>{
        return this.productRepo.getDetailedProduct(id)
    }

    async getSummaryProducts(): Promise<SummaryThriftProduct[] | ProductError>{
        return this.productRepo.getProductsByDate()
    }

    async getProductByStore(storeId: string): Promise<SummaryThriftProduct[] | ProductError>{
        throw new ProductError({code: "unimplimented"})
    }

    async putProduct(product: DetailedThriftProductEntity): Promise<DetailedThriftProductEntity | ProductError>{
        return this.productRepo.saveProduct(product)
    }
}