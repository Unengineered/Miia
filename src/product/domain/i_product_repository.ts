import {DetailedThriftProductEntity} from '../domain/entities/detailed_thrift_product'
import ProductError from '../domain/errors/product_error'
import SummaryThriftProduct from './entities/summary_thrift_product'

export default interface ProductRepository{
    getDetailedProduct(id: number):Promise <DetailedThriftProductEntity | ProductError>
    saveProduct(product: DetailedThriftProductEntity): Promise<DetailedThriftProductEntity | ProductError>
    getProductsByDate(): Promise<SummaryThriftProduct[] | ProductError>
}