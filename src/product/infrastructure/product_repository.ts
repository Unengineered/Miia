import { Model, Types, Document, Connection } from "mongoose";
import { DetailedThriftProductEntity, DetailedThriftProductSchema } from '../domain/entities/detailed_thrift_product'
import { StoreLinkEntity, StoreLinkSchema } from '../../core/models/store_link'

import IProductRepository from '../domain/i_product_repository'
import ProductError from '../domain/errors/product_error'
import { PrismaClient } from "@prisma/client";
import SummaryThriftProduct from "../domain/entities/summary_thrift_product";

export default class ProductRepository implements IProductRepository {
    readonly mongoDbConnection: Connection
    readonly detailedThriftProductModel: Model<DetailedThriftProductEntity>
    readonly storeLinkModel: Model<StoreLinkEntity>
    readonly prismaClient: PrismaClient

    constructor({ mongoDbConnection, prismaClient }: { mongoDbConnection: Connection, prismaClient: PrismaClient }) {
        this.mongoDbConnection = mongoDbConnection
        this.prismaClient = prismaClient
        this.detailedThriftProductModel = this.mongoDbConnection.model<DetailedThriftProductEntity>('DetailedThriftProduct', DetailedThriftProductSchema)
        this.storeLinkModel = this.mongoDbConnection.model<StoreLinkEntity>('StoreLink', StoreLinkSchema)
    }

    async saveProduct(product: DetailedThriftProductEntity): Promise<DetailedThriftProductEntity | ProductError> {

        // Removed need for SQL database
        // const SQLEntry = await this.prismaClient.summaryProduct.create({
        //     data: {
        //         name: product.name,
        //         thumbnail: product.pictures[0]
        //     }
        // })

        const storeId = (product.storeLink instanceof StoreLinkEntity) ? product.storeLink.id : product.storeLink

        const doc = new this.detailedThriftProductModel({
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            pictures: product.pictures,
            sizeChart: product.sizeChart,
            storeLink: storeId
        })

        return doc.save()
            .then((doc) => {
                return doc
            })
            .catch((err) => {
                console.log(err)
                return new ProductError({ code: "unknown" })
            })
    }

    async getDetailedProductsByStore(id: string): Promise<DetailedThriftProductEntity[] | ProductError> {
        return this.detailedThriftProductModel
            .find({ 'storeLink': id })
            .populate('storeLink')
            .lean()
            .exec()
            .then((products) => {
                if (products === null) return new ProductError({ code: "no-items" })
                return products.map((product) => {
                    //Remapping product to entity to avoid extra fields

                    //TODO : Add error check for storelink
                    const storeLink: any = product.storeLink;
                    return new DetailedThriftProductEntity({
                        id: product._id.toString(),
                        name: product.name,
                        price: product.price,
                        originalPrice: product.originalPrice,
                        pictures: product.pictures,
                        sizeChart: product.sizeChart,
                        storeLink: new StoreLinkEntity({ id: storeLink._id.toString(), name: storeLink.name, thumbnail: storeLink.thumbnail, instagram: storeLink.instagram })
                    })
                })
            })
            .catch((err) => {
                return new ProductError({ code: "unknown" })
            })
    }

    async getDetailedProductsByDate(): Promise<DetailedThriftProductEntity[] | ProductError> {
        return this.detailedThriftProductModel
            .find()
            .populate('storeLink')
            .sort({ "_id": -1 })
            .lean()
            .exec()
            .then((products) => {
                if (products === null) return new ProductError({ code: "no-items" })
                return products.map((product) => {
                    //Remapping product to entity to avoid extra fields
                    const storeLink: any = product.storeLink;
                    return new DetailedThriftProductEntity({
                        id: product._id.toString(),
                        name: product.name,
                        price: product.price,
                        originalPrice: product.originalPrice,
                        pictures: product.pictures,
                        sizeChart: product.sizeChart,
                        storeLink: new StoreLinkEntity({ id: storeLink._id.toString(), name: storeLink.name, thumbnail: storeLink.thumbnail, instagram: storeLink.instagram })
                    })
                })
            })
            .catch((err) => {
                return new ProductError({ code: "unknown" })
            })
    }

    /**
     * Some functions won't be required after
     * moving away from the SQL databases, they 
     * have been listed below.
     */

    //  async getProductsByDate(): Promise<SummaryThriftProduct[] | ProductError>{
    //     return this.prismaClient.summaryProduct
    //         .findMany({
    //             orderBy: [
    //                 {
    //                     createdAt: 'desc'
    //                 }
    //             ]
    //         })
    //         .then((products) => {
    //             return products.map((product) => {
    //                 return new SummaryThriftProduct({
    //                     id: product.id,
    //                     name: product.name,
    //                     thumbnail: product.thumbnail
    //                 })
    //             })
    //         })
    //         .catch((err) => {
    //             console.log("SQL ERROR")
    //             console.log(err)
    //             return new ProductError({code: "unknown"})
    //         })
    // }

    // async getDetailedProduct(id: string): Promise<DetailedThriftProductEntity | ProductError> {
    //     return this.detailedThriftProductModel
    //             .findById(id)
    //             .populate('storeLink')
    //             .exec()
    //             .then((product) => {
    //                 if(product === null) 
    //                     return new ProductError({code: "no-product"})
    //                 else
    //                     return new DetailedThriftProductEntity({
    //                         id: product.id,
    //                         name: product.name,
    //                         price: product.price,
    //                         originalPrice: product.originalPrice,
    //                         pictures: product.pictures,
    //                         sizeChart: product.sizeChart.map((chartValue) =>{
    //                             return {key: chartValue.key, value: chartValue.value}
    //                         }),
    //                         storeLink: (product.storeLink instanceof StoreLinkEntity) ?  new StoreLinkEntity(
    //                             {
    //                                 id: product.storeLink.id,
    //                                 name: product.storeLink.name,
    //                                 thumbnail: product.storeLink.thumbnail,
    //                                 instagram: product.storeLink.instagram
    //                             } 
    //                         ) : product.storeLink
    //                     })
    //             }).
    //             catch((error) => {
    //                 return new ProductError({code: "unknown"})
    //             })
    // }
}

