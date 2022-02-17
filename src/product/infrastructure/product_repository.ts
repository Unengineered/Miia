import { Model, Types , Document, Connection} from "mongoose";
import {DetailedThriftProductEntity, DetailedThriftProductSchema} from '../domain/entities/detailed_thrift_product'
import IProductRepository from '../domain/i_product_repository'
import ProductError from '../domain/errors/product_error'
import { PrismaClient } from "@prisma/client";
import SummaryThriftProduct from "../domain/entities/summary_thrift_product";

export default class ProductRepository implements IProductRepository{
   readonly mongoDbConnection: Connection
   readonly detailedThriftProductModel: Model<DetailedThriftProductEntity>
   readonly prismaClient: PrismaClient

   constructor({mongoDbConnection, prismaClient} : {mongoDbConnection: Connection, prismaClient: PrismaClient}){
       this.mongoDbConnection = mongoDbConnection
       this.prismaClient = prismaClient
       this.detailedThriftProductModel = this.mongoDbConnection.model<DetailedThriftProductEntity>('DetailedThriftProduct', DetailedThriftProductSchema)
   }
   
    async getDetailedProduct(id: number): Promise<DetailedThriftProductEntity | ProductError> {
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
        const SQLEntry = await this.prismaClient.summaryProduct.create({
            data: {
                name: product.name,
                thumbnail: product.pictures[0]
            }
        })

        const doc = new this.detailedThriftProductModel({
            _id: SQLEntry.id,
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

    async getProductsByDate(): Promise<SummaryThriftProduct[] | ProductError>{
        return this.prismaClient.summaryProduct
            .findMany({
                orderBy: [
                    {
                        createdAt: 'desc'
                    }
                ]
            })
            .then((products) => {
                return products.map((product) => {
                    return new SummaryThriftProduct({
                        id: product.id.toString(),
                        name: product.name,
                        thumbnail: product.thumbnail
                    })
                })
            })
            .catch((err) => {
                console.log("SQL ERROR")
                console.log(err)
                return new ProductError({code: "unknown"})
            })
    }
}

