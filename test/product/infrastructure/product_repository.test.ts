
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { Connection, Model, Document } from 'mongoose'
import ProductRepository from '../../../src/product/infrastructure/product_repository'
import IProductRepository from '../../../src/product/domain/i_product_repository'
import { DetailedThriftProductEntity, DetailedThriftProductSchema} from '../../../src/product/domain/entities/detailed_thrift_product'
import { assert } from 'chai'
import { PrismaClient} from '@prisma/client'
import ProductError from '../../../src/product/domain/errors/product_error'
import { StoreLinkEntity, StoreLinkSchema } from '../../../src/core/models/store_link'

 describe("PRODUCT REPOSITORY", function () {


    var mongod: MongoMemoryServer
    var repo: IProductRepository
    var mongoConnection: Connection
    var productModel: Model<DetailedThriftProductEntity>
    var storeModel: Model<StoreLinkEntity>
    var prismaClient: PrismaClient

    //for get test
    var store_id: string
    var product_id_1: string
    var product_id_2: string
    var doc_1: Document
    var doc_2: Document

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

        //add docs for get test
        doc_1 = new productModel({
            name: "TEST_DOC_1",
            price: 500,
            originalPrice: 4000,
            pictures: ["https://www.something.com/1", "https://www.something.com/2"],
            sizeChart: [
                { key: "chest", value: "32" },
                { key: "chest", value: "32" }
            ],
            storeLink: store_id
        })

        doc_2 = new productModel({
            name: "TEST_DOC_2",
            price: 500,
            originalPrice: 4000,
            pictures: ["https://www.something.com/1", "https://www.something.com/2"],
            sizeChart: [
                { key: "chest", value: "32" },
                { key: "chest", value: "32" }
            ],
            storeLink: store_id
        })
        
        await doc_1.save()
        await doc_2.save()
        
        product_id_1 = doc_1._id.toString();
        product_id_2 = doc_2._id.toString();
        
        //SETUP PRISMA
        prismaClient = new PrismaClient()
    })


    beforeEach(function () {
        repo = new ProductRepository({ mongoDbConnection: mongoConnection, prismaClient: prismaClient })
    })

    this.afterAll(function () {
        mongod.stop()
    })


    it("Should get products by date", async function () {

        const result = await repo.getDetailedProductsByDate();
        const products = result as DetailedThriftProductEntity[];
        let docs:any = products.map((product) => product.toJson())
        
        assert.equal(docs[docs.length - 1].name, "TEST_DOC_1");
        assert.equal(docs[docs.length - 2].name, "TEST_DOC_2");
    })

    it("should get products by store", async function () {
        let result : DetailedThriftProductEntity[] | ProductError;
        result = await repo.getDetailedProductsByStore(store_id)

        const store_link = new StoreLinkEntity ({
            id: store_id,
            name: 'test-store',
            thumbnail: 'thumbnail',
            instagram: 'instagram'
        });

        let matcher = [new DetailedThriftProductEntity({
            id: product_id_1,
            name: "TEST_DOC_1",
            price: 500,
            originalPrice: 4000,
            description : "product description",
            pictures: ["https://www.something.com/1", "https://www.something.com/2"],
            sizeChart: [
                { key: "chest", value: "32" },
                { key: "chest", value: "32" }
            ],
            storeLink: store_link
            }),
            new DetailedThriftProductEntity({
                id: product_id_2,
                name: "TEST_DOC_2",
                price: 500,
                originalPrice: 4000,
                description : "product description",
                pictures: ["https://www.something.com/1", "https://www.something.com/2"],
                sizeChart: [
                    { key: "chest", value: "32" },
                    { key: "chest", value: "32" }
                ],
                storeLink: store_link
            })
        ]
        assert.deepEqual(result, matcher);
    })

    it("should save document with new detailed thrift product", async function () {
        await repo.saveProduct(DetailedThriftProductEntity.forSaving({
            name: "NAME",
            price: 200,
            originalPrice: 5000,
            description : "product description",
            pictures: ["https://www.something.com/1", "https://www.something.com/2"],
            sizeChart: [
                { key: "chest", value: "32" }
            ],
            storeLink: store_id
        }))
        const count = await productModel.countDocuments({ name: "NAME" });
        assert.equal(count, 1)
    })
        
})

