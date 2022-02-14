import { Model, Types , Document, Connection} from "mongoose";
import {DetailedThriftProductEntity, DetailedThriftProductSchema} from '../domain/entities/detailed_thrift_product'
import IProductRepository from '../domain/i_product_repository'
import ProductError from '../domain/errors/product_error'

export default class ProductRepository implements IProductRepository{
   readonly mongoDbConnection: Connection
   readonly detailedThriftProductModel: Model<DetailedThriftProductEntity>

   constructor({mongoDbConnection} : {mongoDbConnection: Connection}){
       this.mongoDbConnection = mongoDbConnection
       this.detailedThriftProductModel = this.mongoDbConnection.model<DetailedThriftProductEntity>('DetailedThriftProduct', DetailedThriftProductSchema)
   }
   
    async getDetailedProduct(id: string): Promise<DetailedThriftProductEntity | ProductError> {
        return this.detailedThriftProductModel
                .findById(id)
                .exec()
                .then((product) => {
                    if(product === null) 
                        return new ProductError({code: "no-product"})
                    else
                        return new DetailedThriftProductEntity({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            originalPrice: product.originalPrice,
                            pictures: product.pictures,
                            sizeChart: product.sizeChart.map((chartValue) =>{
                                return {key: chartValue.key, value: chartValue.value}
                            })
                        })
                }).
                catch((error) => {
                    return new ProductError({code: "unknown"})
                })
    }

    async saveProduct(product: DetailedThriftProductEntity): Promise<DetailedThriftProductEntity | ProductError>{
        const doc = new this.detailedThriftProductModel({
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            pictures: product.pictures,
            sizeChart: product.sizeChart 
        })

        return doc.save()
                .then((doc) => {
                    return doc
                })
                .catch((err) => {
                    return new ProductError({code: "unknown"})
                })
    }
}

