import {DetailedThriftProductEntity} from '../domain/entities/detailed_thrift_product'
import ProductError from '../domain/errors/product_error'

export default interface ProductRepository{
    getDetailedProduct(id: string):Promise <DetailedThriftProductEntity | ProductError>
    saveProduct(product: DetailedThriftProductEntity): Promise<DetailedThriftProductEntity | ProductError>
}