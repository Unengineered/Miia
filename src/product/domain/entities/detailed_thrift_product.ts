import { Schema, Types } from 'mongoose'
import { StoreLinkEntity } from '../../../core/models/store_link'


class DetailedThriftProductEntity {
    readonly id: string | null
    readonly name: string | null
    readonly price: number
    readonly originalPrice: number | null
    readonly pictures: string[]
    readonly sizeChart: { key: String, value: String }[]
    readonly storeLink: StoreLinkEntity | string

    /**
     * TODO:
     * - add store link 
     * - test todo
     * - test todo 2
     */

    constructor({ id, name, price, originalPrice, pictures, sizeChart, storeLink }:
        { id: string | null, name: string | null, price: number, originalPrice: number | null, pictures: string[], sizeChart: { key: String, value: String }[], storeLink: StoreLinkEntity | string }) {
        this.id = id
        this.name = name
        this.price = price
        this.originalPrice = originalPrice
        this.pictures = pictures
        this.sizeChart = sizeChart
        this.storeLink = storeLink
    }

    toJson(): Object {
        return {
            "id": this.id,
            "name": this.name,
            "price": this.price,
            "original_price": this.originalPrice,
            "pictures": this.pictures,
            "size_chart": this.sizeChart,
            "store_link": (this.storeLink instanceof StoreLinkEntity) ? this.storeLink.toJson() : this.storeLink
        }
    }

    static forSaving({ name, price, originalPrice, pictures, sizeChart, storeLink }:
        { name: string | null, price: number, originalPrice: number | null, pictures: string[], sizeChart: { key: string, value: string }[], storeLink: string }): DetailedThriftProductEntity {
        return new DetailedThriftProductEntity({
            id: null,
            name: name,
            price: price,
            originalPrice: originalPrice,
            pictures: pictures,
            sizeChart: sizeChart,
            storeLink: storeLink
        })
    }
}



const DetailedThriftProductSchema = new Schema({
    _id: { type: Types.ObjectId, required: true, auto: true},
    name: String,
    price: Number,
    originalPrice: Number,
    pictures: [String],
    sizeChart: [{ key: String, value: String, _id : false }],
    storeLink: {type: Types.ObjectId, ref: 'StoreLink', required: true}
})


export { DetailedThriftProductSchema, DetailedThriftProductEntity}

