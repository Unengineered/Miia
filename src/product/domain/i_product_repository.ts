import {DetailedThriftProductEntity} from '../domain/entities/detailed_thrift_product'
import ProductError from '../domain/errors/product_error'
import SummaryThriftProduct from './entities/summary_thrift_product'

export default interface ProductRepository{
    saveProduct(product: DetailedThriftProductEntity): Promise<DetailedThriftProductEntity | ProductError>
    getDetailedProductsByDate(): Promise<DetailedThriftProductEntity[] | ProductError>
    getDetailedProductsByStore(id: string):  Promise<DetailedThriftProductEntity[] | ProductError>

    /**
     * Some functions won't be required after
     * moving away from the SQL databases, they 
     * have been listed below.
     */
    
    //getDetailedProduct(id: string):Promise <DetailedThriftProductEntity | ProductError>
    //getProductsByDate(): Promise<SummaryThriftProduct[] | ProductError>
}