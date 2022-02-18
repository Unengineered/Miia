export default class SummaryThriftProduct {
    readonly id: number
    readonly name: string | null
    readonly thumbnail: string

    //TODO(advait): Add store link

    constructor({ id, name, thumbnail }:
        { id: number, name: string | null, thumbnail: string }) {
        this.id = id
        this.name = name
        this.thumbnail = thumbnail
    }

    toJson(): Object{
        return {
            "id" : this.id,
            "name" : this.name,
            "thumbnail" : this.thumbnail
        }
    }
}