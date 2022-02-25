import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { Connection, Model, Document } from 'mongoose'
import { StoreLinkEntity, StoreLinkSchema } from '../../../src/core/models/store_link'
import IStoreRepository from '../../../src/store/domain/i_store_repository';
import StoreRepository from '../../../src/store/infrastructure/store_repository';
import StoreError from '../../../src/store/domain/errors/store_error';
import { PrismaClient} from '@prisma/client'
import { assert } from 'chai'


describe("STORE REPOSITORY", function(){

    var mongod: MongoMemoryServer
    var repo: IStoreRepository
    var mongoConnection: Connection
    var storeModel: Model<StoreLinkEntity>
    var prismaClient: PrismaClient

    let store_id_1: string
    let store_id_2: string
    
    before(async function () {
        //SETUP MONGO
        mongod = await MongoMemoryServer.create()
        mongoConnection = mongoose.createConnection(mongod.getUri())
        storeModel = mongoConnection.model('StoreLink', StoreLinkSchema)

        const store_1 = new storeModel(StoreLinkEntity.forSaving({
            name: "test-store-1",
            thumbnail: "thumbnail",
            instagram: "instagram"
        }))
        const store_2 = new storeModel(StoreLinkEntity.forSaving({
            name: "test-store-2",
            thumbnail: "thumbnail",
            instagram: "instagram"
        }))
        await store_1.save()
        await store_2.save()

        store_id_1 = store_1._id.toString();
        store_id_2 = store_2._id.toString();

        //SETUP PRISMA
        prismaClient = new PrismaClient()
    })

    beforeEach(function () {
        repo = new StoreRepository({ mongoDbConnection: mongoConnection, prismaClient: prismaClient })
    })

    this.afterAll(function () {
        mongod.stop()
    })

    it("should return list of store links", async function () {
        const result = await repo.getStoreLinkList();
        let matcher = [
            new StoreLinkEntity({
            id: store_id_1,
            name: "test-store-1",
            thumbnail: "thumbnail",
            instagram: "instagram"
            }),
            new StoreLinkEntity({
                id: store_id_2,
                name: "test-store-2",
                thumbnail: "thumbnail",
                instagram: "instagram"
            })
        ]
        assert.deepEqual(result, matcher);
    })

    it("should add store link", async function () {
        await repo.putStoreLink(StoreLinkEntity.forSaving({
            name: "store",
            thumbnail: "test-thumbnail",
            instagram: "test-instagram"
        }));
        const count = await storeModel.countDocuments({ name: "store" });
        assert.equal(count, 1)
    })
})