import ProductRepository from './product/infrastructure/product_repository';
import mongoose, { Model } from 'mongoose'
import { PrismaClient } from '@prisma/client';
import { DetailedThriftProductEntity } from './product/domain/entities/detailed_thrift_product';
import ProductService from './product/application/product_service';
import WebsocketRequest from './core/models/websocket_request';
import StoreRepository from './store/infrastructure/store_repository';
import { response } from 'express';
import { StoreLinkSchema, StoreLinkEntity } from "./core/models/store_link";
require('dotenv').config()
//h
const prod_repo = new ProductRepository({
    mongoDbConnection: mongoose.createConnection(process.env.MONGO_REMOTE_URI ?? ""),
    prismaClient: new PrismaClient()
})

const store_repo = new StoreRepository({
    mongoDbConnection: mongoose.createConnection(process.env.MONGO_REMOTE_URI ?? ""),
})

const prod_service = new ProductService({ productRepo: prod_repo })

async function func() {
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
    // const response = await prod_repo.getDetailedProductsByStore("62148dbacd944133da8d8ad4")
    // console.log(response)

    //     const response = await prod_service.getDetailedThriftProducts(new WebsocketRequest({
    //         requestId: "62148dbacd944133da8d8ad4",
    //         method: "62148dbacd944133da8d8ad4",
    //         // url: "https://www.everythng.in/detailed?store_id=62148f53cd944133da8d8adf",
    //         url: "https://www.everythng.in/detailed",
    //         headers: "" as any,
    //         body: "" as any,
    //     }))
    //     console.log(JSON.stringify(response))
    store_repo.putStoreLink(new StoreLinkEntity({
        id: null,
        name: 'glorythrift2022',
        thumbnail: 'https://instagram.fbom5-1.fna.fbcdn.net/v/t51.2885-19/273113974_1375647572875435_155466951975051105_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.fbom5-1.fna.fbcdn.net&_nc_cat=107&_nc_ohc=jK8ENH7O3QwAX-bQXUz&edm=ABfd0MgBAAAA&ccb=7-4&oh=00_AT_VCZGyBLcilPH8bsNlVTDGZrxTL9FqYWSn-OSmQybKcQ&oe=6227DE15&_nc_sid=7bff83',
        instagram: 'https://www.instagram.com/glorythrift2022/'
    }))
        .then((response) =>
            store_repo.putStoreLink(new StoreLinkEntity({
                id: null,
                name: '_yellow.petals',
                thumbnail: 'https://instagram.fbom5-1.fna.fbcdn.net/v/t51.2885-19/122475658_164301378676086_6339241234922259013_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.fbom5-1.fna.fbcdn.net&_nc_cat=106&_nc_ohc=qNOxPv4x2noAX-sGYdp&edm=ABfd0MgBAAAA&ccb=7-4&oh=00_AT_-dD_eZWT8_5k7TOcDSmB6o59lPwiYkxU6Kr-kRHHY4A&oe=6227B0A0&_nc_sid=7bff83',
                instagram: 'https://www.instagram.com/_yellow.petals/'
            })))
        .then((response) =>
            store_repo.putStoreLink(new StoreLinkEntity({
                id: null,
                name: 'restlyle_thrift',
                thumbnail: 'https://instagram.fbom5-1.fna.fbcdn.net/v/t51.2885-19/272444935_463569035148319_2872641912478707149_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.fbom5-1.fna.fbcdn.net&_nc_cat=107&_nc_ohc=mPUOnQiuY0oAX9R4v40&edm=ABfd0MgBAAAA&ccb=7-4&oh=00_AT89-60ZcYNuWFcztGbxHc52aJsjZ1l5JMnsI2pzWDl6Eg&oe=6228159B&_nc_sid=7bff83',
                instagram: 'https://www.instagram.com/restlyle_thrift/'
            })))
        .then((response) =>
            store_repo.putStoreLink(new StoreLinkEntity({
                id: null,
                name: 'curvythrift',
                thumbnail: 'https://instagram.fbom5-1.fna.fbcdn.net/v/t51.2885-19/274134880_539455417205389_822618706545397124_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.fbom5-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=ycvx1DQrG6wAX_dD1rq&tn=LVFQvU52-yvNxoGN&edm=ABfd0MgBAAAA&ccb=7-4&oh=00_AT-PrHUafWwFOa2exsOkKdHCh-RPywmDsvzf1g7X05LPJQ&oe=622765B3&_nc_sid=7bff83',
                instagram: 'https://www.instagram.com/curvythrift/'
            })))
        .then((response) =>
            store_repo.putStoreLink(new StoreLinkEntity({
                id: null,
                name: 'thrift_india',
                thumbnail: 'https://instagram.fbom5-1.fna.fbcdn.net/v/t51.2885-19/97543029_181575136426046_385860845420150784_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.fbom5-1.fna.fbcdn.net&_nc_cat=102&_nc_ohc=8bJylIjOnJAAX8Aro26&tn=LVFQvU52-yvNxoGN&edm=ABfd0MgBAAAA&ccb=7-4&oh=00_AT_Gzpw4Po9l8TxDJE7mdw05KVTrP1b-BjURNI86FP9Btw&oe=6226FD83&_nc_sid=7bff83',
                instagram: 'https://www.instagram.com/thrift_india/'
            })))
        .then((response) =>
            store_repo.putStoreLink(new StoreLinkEntity({
                id: null,
                name: 'thrift.nthrive',
                thumbnail: 'https://instagram.fbom5-1.fna.fbcdn.net/v/t51.2885-19/225795295_335611824971229_2949957147721891101_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.fbom5-1.fna.fbcdn.net&_nc_cat=109&_nc_ohc=9y8RIGwZkTcAX93kndJ&edm=ABfd0MgBAAAA&ccb=7-4&oh=00_AT--zS6rv9xyHuLjCFUsU9SntEEmGYnY-nHHEJwdzIQXlA&oe=62275F89&_nc_sid=7bff83',
                instagram: 'https://www.instagram.com/thrift.nthrive/'
            })))
        .then((response) =>
            store_repo.putStoreLink(new StoreLinkEntity({
                id: null,
                name: 'thrift.duh',
                thumbnail: 'https://instagram.fbom5-1.fna.fbcdn.net/v/t51.2885-19/240764060_561286315291025_8868378589644528170_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.fbom5-1.fna.fbcdn.net&_nc_cat=105&_nc_ohc=JnGjiww3JwsAX8Ww_mL&edm=ABfd0MgBAAAA&ccb=7-4&oh=00_AT-Vj2lXh7e7hzgPMteYy0Mfd1VmayV_hcWNC2UDHTojFg&oe=6228DF1F&_nc_sid=7bff83',
                instagram: 'https://www.instagram.com/thrift.duh/'
            })))
        .then((response) =>
            store_repo.putStoreLink(new StoreLinkEntity({
                id: null,
                name: 'thriftmom_',
                thumbnail: 'https://instagram.fbom5-1.fna.fbcdn.net/v/t51.2885-19/116269812_284721039647070_4590920400227048896_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.fbom5-1.fna.fbcdn.net&_nc_cat=106&_nc_ohc=MRU8G36VN_MAX-q9TvO&edm=ABfd0MgBAAAA&ccb=7-4&oh=00_AT-e59zd-ghz2uZ7BT8VqcvS4abS9toytsDJ_sBX0FxWIw&oe=62281A87&_nc_sid=7bff83',
                instagram: 'https://www.instagram.com/thriftmom_/'
            })))
        .then((response) =>
            store_repo.putStoreLink(new StoreLinkEntity({
                id: null,
                name: 'attic_by_samaura',
                thumbnail: 'https://instagram.fbom5-1.fna.fbcdn.net/v/t51.2885-19/146934398_839042963337990_4269919674447978386_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.fbom5-1.fna.fbcdn.net&_nc_cat=106&_nc_ohc=BbWX0VpY1RcAX8zeUxh&tn=LVFQvU52-yvNxoGN&edm=ABfd0MgBAAAA&ccb=7-4&oh=00_AT__0GbLmVw6-EOYZjIOYwx_Q4OtiMb6diQjqEWqUPLmzA&oe=6227CD5A&_nc_sid=7bff83',
                instagram: 'https://www.instagram.com/attic_by_samaura/'
            })))
        .then((response) =>
            store_repo.putStoreLink(new StoreLinkEntity({
                id: null,
                name: 'prettyonpurpose.shop',
                thumbnail: 'https://instagram.fbom5-1.fna.fbcdn.net/v/t51.2885-19/219871763_214767833874815_6556801354284360686_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.fbom5-1.fna.fbcdn.net&_nc_cat=111&_nc_ohc=-EWK2XtUED0AX9abp9G&tn=LVFQvU52-yvNxoGN&edm=ABfd0MgBAAAA&ccb=7-4&oh=00_AT9zOMmlKjIoTdLyZg46N4OFRll8p7qw8sMVwHW-BfV2cg&oe=6227691E&_nc_sid=7bff83',
                instagram: 'https://www.instagram.com/prettyonpurpose.shop/'
            })))
        .then((response) =>
            store_repo.putStoreLink(new StoreLinkEntity({
                id: null,
                name: '_thriftboutique',
                thumbnail: 'https://instagram.fbom5-1.fna.fbcdn.net/v/t51.2885-19/243701396_816356275712599_7276831479047924677_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.fbom5-1.fna.fbcdn.net&_nc_cat=107&_nc_ohc=tXqV9_3Zz0YAX872Fu4&tn=LVFQvU52-yvNxoGN&edm=ABfd0MgBAAAA&ccb=7-4&oh=00_AT8xy-tXfbEGYYdkc3TDKcqOz_xjw_HwpvsxQiDmFhub1Q&oe=622895B7&_nc_sid=7bff83',
                instagram: 'https://www.instagram.com/_thriftboutique/'
            })))
        .then((response) =>
            store_repo.putStoreLink(new StoreLinkEntity({
                id: null,
                name: 'thriftlift',
                thumbnail: 'https://instagram.fbom5-1.fna.fbcdn.net/v/t51.2885-19/256083584_189246373377181_8702534848728899144_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.fbom5-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=yeSTCSeFZLoAX8a4Af4&edm=ABfd0MgBAAAA&ccb=7-4&oh=00_AT_GpT3sBRudXTBu8DOc0lylnBrpKW24zlAjx2tQ4Xv0DA&oe=6228808B&_nc_sid=7bff83',
                instagram: 'https://www.instagram.com/thriftlift/'
            })))
        .then((response) =>
            store_repo.putStoreLink(new StoreLinkEntity({
                id: null,
                name: 'lulu_thrift_',
                thumbnail: 'https://instagram.fbom5-1.fna.fbcdn.net/v/t51.2885-19/118492641_360764161605730_7632590703279561271_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.fbom5-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=kAgeae8FxWEAX-ZyFqI&edm=ABfd0MgBAAAA&ccb=7-4&oh=00_AT-zliZirezcpskypSeMY4LViUkdZoivSACreebzmNRXKg&oe=6228D7ED&_nc_sid=7bff83',
                instagram: 'https://www.instagram.com/lulu_thrift_/'
            })))
        .then((response) =>
            store_repo.putStoreLink(new StoreLinkEntity({
                id: null,
                name: 'pandapickedstore',
                thumbnail: 'https://instagram.fbom5-1.fna.fbcdn.net/v/t51.2885-19/118286434_324059658944273_12523880221033555_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.fbom5-1.fna.fbcdn.net&_nc_cat=105&_nc_ohc=foHkH6Ca2oYAX92ywG1&edm=ABfd0MgBAAAA&ccb=7-4&oh=00_AT9VC5lv88FOtPWrkDRzBR4NfzTon_U64jhAR874YokdaA&oe=62276F3F&_nc_sid=7bff83',
                instagram: 'https://www.instagram.com/pandapickedstore/'
            })))

}
// func()

(() => {
    var m: Model<StoreLinkEntity> = mongoose.createConnection(process.env.MONGO_REMOTE_URI ?? "").model<StoreLinkEntity>('StoreLink', StoreLinkSchema)
    var result: Array<any> = [];
    var myMap: Map<string, string> = new Map<string, string>();
    m.find()
        .then((response) => {
            response.map((res) => {
                myMap.set(res['name'], res['id']);
                // result.push({ res['name']: res['_id'] })
            })
            const arr = Array.from(myMap);
            console.log(myMap)
            console.log(arr)
        })

    // console.log(result);


})()



console.log("HELLO")

