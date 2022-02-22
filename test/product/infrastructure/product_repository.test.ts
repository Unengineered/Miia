import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { Connection, Model } from 'mongoose'
import ProductRepository from '../../../src/product/infrastructure/product_repository'
import IProductRepository from '../../../src/product/domain/i_product_repository'
import { DetailedThriftProductEntity, DetailedThriftProductSchema } from '../../../src/product/domain/entities/detailed_thrift_product'
import { assert } from 'chai'
import { PrismaClient} from '@prisma/client'

//TODO: Find a way to mock prisma.

describe("PRODUCT REPOSITORY", function () {

    var mongod: MongoMemoryServer
    var repo: IProductRepository
    var mongoConnection: Connection
    var productModel: Model<DetailedThriftProductEntity>
    var prismaClient: PrismaClient

    //for get test
    var id: number


    before(async function () {
        //SETUP MONGO
        mongod = await MongoMemoryServer.create()
        mongoConnection = mongoose.createConnection(mongod.getUri())
        productModel = mongoConnection.model('DetailedThriftProduct', DetailedThriftProductSchema)

        //add doc for get test
        const doc = new productModel({
            _id: 1,
            name: "TEST_DOC",
            price: 500,
            originalPrice: 4000,
            pictures: ["url1", "url2"],
            sizeChart: [
                { key: "chest", value: "32" },
                { key: "chest", value: "32" }
            ]
        })

        await doc.save()
        id = doc.id

        //SETUP PRISMA
        prismaClient = new PrismaClient()
    })

    beforeEach(function () {
        repo = new ProductRepository({ mongoDbConnection: mongoConnection, prismaClient: prismaClient })
    })

    this.afterAll(function () {
        mongod.stop()
    })

    it.skip("should save document with new detailed thrift product", async function () {
        await repo.saveProduct(DetailedThriftProductEntity.forSaving({
            name: "NAME",
            price: 200,
            originalPrice: 5000,
            pictures: ["url1", "url2"],
            sizeChart: [
                { key: "chest", value: "32" }
            ]
        }))
        const count = await productModel.countDocuments({ name: "NAME" });
        assert.equal(count, 1)
    })

    it("should get document from database", async function () {
        const result = await repo.getDetailedProduct(id)
        const matcher = new DetailedThriftProductEntity({
            id: id,
            name: "TEST_DOC",
            price: 500,
            originalPrice: 4000,
            pictures: ["url1", "url2"],
            sizeChart: [
                { key: "chest", value: "32" },
                { key: "chest", value: "32" }
            ]
        })

        assert.deepEqual(result, matcher)

    })
})