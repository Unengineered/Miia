import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { Connection, Model } from 'mongoose'
import ProductRepository from '../../../src/product/infrastructure/product_repository'
import IProductRepository from '../../../src/product/domain/i_product_repository'
import { DetailedThriftProductEntity, DetailedThriftProductSchema, StoreLinkEntity, StoreLinkSchema } from '../../../src/product/domain/entities/detailed_thrift_product'
import { assert } from 'chai'
import { PrismaClient} from '@prisma/client'
import ProductError from '../../../src/product/domain/errors/product_error'

//TODO: Find a way to mock prisma.


//TODO (yashraj)
describe("PRODUCT REPOSITORY", function () {

    var mongod: MongoMemoryServer
    var repo: IProductRepository
    var mongoConnection: Connection
    var productModel: Model<DetailedThriftProductEntity>
    var storeModel: Model<StoreLinkEntity>
    var prismaClient: PrismaClient

    //for get test
    var store_id: string
    var product_id: string

    before(async function () {
        //SETUP MONGO
        mongod = await MongoMemoryServer.create()
        mongoConnection = mongoose.createConnection(mongod.getUri())
        productModel = mongoConnection.model('DetailedThriftProduct', DetailedThriftProductSchema)
        storeModel = mongoConnection.model('StoreLink', StoreLinkSchema)

        const store = new storeModel(StoreLinkEntity.forSaving({
            name: "test-store",
            thumbnail: "thumbnail",
            instagram: "instagram"
        }))
        await store.save()
        store_id = store._id.toString();
        //add doc for get test
        const doc = new productModel({
            name: "TEST_DOC",
            price: 500,
            originalPrice: 4000,
            pictures: ["url1", "url2"],
            sizeChart: [
                { key: "chest", value: "32" },
                { key: "chest", value: "32" }
            ],
            storeLink: store_id
        })
        
        // const result = await repo.getDetailedProduct(id)
        
        await doc.save()
         
        product_id = doc._id.toString();

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
            ],
            storeLink: store_id
        }))
        const count = await productModel.countDocuments({ name: "NAME" });
        assert.equal(count, 1)
    })

    it("should get products from database", async function () {
        let result : DetailedThriftProductEntity[] | ProductError;
        result = await repo.getDetailedProductsByStore(store_id)
            
        let matcher = [new DetailedThriftProductEntity({
            id: product_id,
            name: "TEST_DOC",
            price: 500,
            originalPrice: 4000,
            pictures: ["url1", "url2"],
            sizeChart: [
                { key: "chest", value: "32" },
                { key: "chest", value: "32" }
            ],
            storeLink: store_id
        })]
        const products = result as DetailedThriftProductEntity[];
        let docs:any = products.map((product) => product.toJson())
        let matcherDocs:any = matcher.map((product) => product.toJson())        
        
        console.log(docs);
        console.log(matcherDocs);

        assert.equal(docs[0].id, matcherDocs[0].id);
        assert.equal(docs[0].name, matcherDocs[0].name);
        assert.equal(docs[0].price, matcherDocs[0].price);
        assert.equal(docs[0].originalPrice, matcherDocs[0].originalPrice);
        assert.deepEqual(docs[0].pictures, matcherDocs[0].pictures);
        assert.deepEqual(docs[0].sizeChart, matcherDocs[0].sizeChart);
        assert.equal(docs[0].store_link._id, store_id);
        assert.equal(docs[0].store_link.name, "test-store");
        assert.equal(docs[0].store_link.thumbnail, "thumbnail");
        assert.equal(docs[0].store_link.instagram, "instagram");
    })

    it("Should get products by date", async function () {
        await repo.saveProduct(DetailedThriftProductEntity.forSaving({
            name: "NAME",
            price: 200,
            originalPrice: 5000,
            pictures: ["url1", "url2"],
            sizeChart: [
                { key: "chest", value: "32" }
            ],
            storeLink: store_id
        }))

        const result = await repo.getDetailedProductsByDate();
        const products = result as DetailedThriftProductEntity[];
        let docs:any = products.map((product) => product.toJson())

        assert.equal(docs[0].name, "NAME");
        assert.equal(docs[1].name, "TEST_DOC");

        console.log(result);
    })
})