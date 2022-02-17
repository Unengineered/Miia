import ProductRepository from './product/infrastructure/product_repository';
import mongoose from 'mongoose'
import { PrismaClient } from '@prisma/client';
import { DetailedThriftProductEntity } from './product/domain/entities/detailed_thrift_product';
require('dotenv').config()

const prod_repo = new ProductRepository({
    mongoDbConnection: mongoose.createConnection(process.env.MONGO_REMOTE_URI ?? ""),
    prismaClient: new PrismaClient()
})

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

    // console.log(response)
}

func()

console.log("HELLO")