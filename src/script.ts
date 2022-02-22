import ProductRepository from './product/infrastructure/product_repository';
import mongoose from 'mongoose'
import { PrismaClient } from '@prisma/client';
import { DetailedThriftProductEntity } from './product/domain/entities/detailed_thrift_product';
import ProductService from './product/application/product_service';
require('dotenv').config()

const prod_repo = new ProductRepository({
    mongoDbConnection: mongoose.createConnection(process.env.MONGO_REMOTE_URI ?? ""),
    prismaClient: new PrismaClient()
})

const prod_service = new ProductService({productRepo : prod_repo})

async function func(){
    // const response = await prod_repo.saveProduct(DetailedThriftProductEntity.forSaving({
    //     name: "TOTAL_TEST",
    //     price: 200,
    //     originalPrice: 2000,
    //     pictures: ["url1", "url2"],
    //     sizeChart: [
    //         {key: "key", value: "value"},
    //         {key: "key", value: "value"}
    //     ]
    // }))

    //const response = await prod_repo.getProductsByDate()

    // const response = await prod_repo.getDetailedProduct(5)

    //const response = await prod_service.getDetailedProduct(5)
    //const response = await prod_service.getSummaryProducts()

    // const response = await prod_repo.saveProduct(DetailedThriftProductEntity.forSaving({
    //     name: "NEW_PROD3",
    //     price: 200,
    //     originalPrice: 2000,
    //     pictures: ["URL1", "URL2"],
    //     sizeChart: [
    //         {key: "KEY", value: "VALUE"},
    //         {key: "KEY2", value: "VALUE2"}
    //     ],
    //     storeLink: "62148f53cd944133da8d8adf"
    // }))

    //const response = await prod_repo.getDetailedProduct("62148d1a3fcd9b74df344a32")

    //const response = await prod_repo.getDetailedProductsByDate()
    const response = await prod_repo.getDetailedProductsByStore("62148dbacd944133da8d8ad4")
    console.log(response)
}

func()

console.log("HELLO")