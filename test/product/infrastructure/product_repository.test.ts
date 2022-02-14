import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose'
import {Connection, Model} from 'mongoose'
import ProductRepository from '../../../src/product/infrastructure/product_repository';
import IProductRepository from '../../../src/product/domain/i_product_repository'
import { DetailedThriftProductEntity, DetailedThriftProductSchema} from '../../../src/product/domain/entities/detailed_thrift_product';
import { assert } from 'chai';

describe("PRODUCT REPOSITORY", function(){

    var mongod: MongoMemoryServer
    var repo: IProductRepository
    var mongoConnection: Connection
    var productModel: Model<DetailedThriftProductEntity>

    //for get test
    var id: string


    before(async function(){
        mongod = await MongoMemoryServer.create()
        mongoConnection = mongoose.createConnection(mongod.getUri())
        productModel = mongoConnection.model('DetailedThriftProduct', DetailedThriftProductSchema)
        
        //add doc for get test
        const doc = new productModel({
            name: "TEST_DOC",
            price: 500,
            originalPrice: 4000,
            pictures: ["url1", "url2"],
            sizeChart: [
                {key : "chest", value: "32"},
                {key : "chest", value: "32"}
            ]
        })

        await doc.save()
        id = doc.id
    })

    beforeEach(function(){
        repo = new ProductRepository({mongoDbConnection : mongoConnection})
    })

    this.afterAll(function(){
        mongod.stop()
    })

    it("should save document with new detailed thrift product", async function(){
        await repo.saveProduct(DetailedThriftProductEntity.forSaving({
            name: "NAME",
            price: 200,
            originalPrice: 5000,
            pictures: ["url1", "url2"],
            sizeChart: [
                {key : "chest", value: "32"}
            ]
        }))
        const count = await productModel.countDocuments({name: "NAME"});
        assert.equal(count, 1)
    })

    it("should get document from database", async function(){
        const result = await repo.getDetailedProduct(id)
        const matcher = new DetailedThriftProductEntity({
            id: id,
            name: "TEST_DOC",
            price: 500,
            originalPrice: 4000,
            pictures: ["url1", "url2"],
            sizeChart: [
                {key : "chest", value: "32"},
                {key : "chest", value: "32"}
            ]
        })
        if(result instanceof DetailedThriftProductEntity){
            assert.equal(result.id, matcher.id)
            assert.equal(result.name, matcher.name)
            assert.equal(result.price, matcher.price)
            assert.equal(result.originalPrice, matcher.originalPrice)

            //TODO(advait): Figure out a way to match arrays
            //assert.equal(result.pictures, matcher.pictures)
            //assert.equal(result.sizeChart, matcher.sizeChart)
        }
    })
})