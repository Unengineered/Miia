import {Schema, Types} from 'mongoose'

class DetailedThriftProductEntity {
    readonly id: number | null
    readonly name: string | null
    readonly price: number | null
    readonly originalPrice: number | null
    readonly pictures: string[]
    readonly sizeChart: {key: String, value: String}[]

    /**
     * TODO:
     * - add store link 
     * - test todo
     * - test todo 2
     */

    constructor({ id, name, price, originalPrice, pictures, sizeChart }:
        { id: number | null, name: string | null, price: number | null, originalPrice: number | null, pictures: string[], sizeChart: {key: String, value: String}[] }) {
            this.id = id
            this.name = name
            this.price = price
            this.originalPrice = originalPrice
            this.pictures = pictures
            this.sizeChart = sizeChart
    }

    toJson(): Object{
        return {
            "id" : this.id,
            "name" : this.name,
            "price" : this.price,
            "originalPrice" : this.originalPrice,
            "pictures" : this.pictures,
            "sizeChart" : this.sizeChart
        }
    }

    static forSaving({name, price, originalPrice, pictures, sizeChart}:
        {name: string | null, price: number | null, originalPrice: number | null, pictures: string[], sizeChart: {key: string, value: string}[] }): DetailedThriftProductEntity{
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
    _id: {type: Number, required: true},
    name: String,
    price: Number,
    originalPrice: Number,
    pictures: [String],
    sizeChart: [{key: String, value: String}]
})

export {DetailedThriftProductSchema, DetailedThriftProductEntity}

