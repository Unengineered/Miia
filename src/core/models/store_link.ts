import { Schema, Types } from "mongoose"

const StoreLinkSchema = new Schema({
    _id: { type: Types.ObjectId, auto: true },
    name: String,
    thumbnail: String,
    instagram: String
})

class StoreLinkEntity {
    readonly name: string
    readonly id: string | null
    readonly thumbnail: string
    readonly instagram: string

    constructor({ id, name, thumbnail, instagram }: { id: string | null, name: string, thumbnail: string, instagram: string }) {
        this.id = id
        this.name = name
        this.thumbnail = thumbnail
        this.instagram = instagram
    }

    static forSaving({name, thumbnail, instagram} :
         {name: string, thumbnail: string, instagram: string}): StoreLinkEntity{
        return new StoreLinkEntity({
            id: null,
            name: name,
            thumbnail: thumbnail,
            instagram: instagram
        })
    }

    toJson(): Object {
        return {
            "id": this.id,
            "name": this.name,
            "thumbnail": this.thumbnail,
            "instagram": this.instagram
        }
    }
}

export { StoreLinkSchema, StoreLinkEntity }