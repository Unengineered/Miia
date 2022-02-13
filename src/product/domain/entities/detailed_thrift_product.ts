import {Schema, Types} from 'mongoose'

class DetailedThriftProductEntity {
    readonly id: string | null
    readonly name: string | null
    readonly price: number | null
    readonly originalPrice: number | null
    readonly pictures: string[]
    readonly sizeChart: Object

    constructor({ id, name, price, originalPrice, pictures, sizeChart }:
        { id: string | null, name: string | null, price: number | null, originalPrice: number | null, pictures: string[], sizeChart: [{key: string, value: string}] }) {
            this.id = id
            this.name = name
            this.price = price
            this.originalPrice = originalPrice
            this.pictures = pictures
            this.sizeChart = sizeChart
    }

    static forSaving({name, price, originalPrice, pictures, sizeChart }:
        {name: string | null, price: number | null, originalPrice: number | null, pictures: string[], sizeChart: [{key: string, value: string}] }): DetailedThriftProductEntity{
            return new DetailedThriftProductEntity({
                id: null,
                name: name,
                price: price,
                originalPrice: originalPrice,
                pictures: pictures,
                sizeChart: sizeChart,
            })
        }
}

const DetailedThriftProductSchema = new Schema({
    id: {type: Types.ObjectId, required: true, auto: true},
    name: String,
    price: Number,
    originalPrice: Number,
    prictures: [String],
    sizeChart: [{key: String, value: String}]
})

export {DetailedThriftProductSchema, DetailedThriftProductEntity}

