export default class SummaryThriftProduct {
    readonly id: string
    readonly name: string | null
    readonly thumbnail: string

    //TODO(advait): Add store link

    constructor({ id, name, thumbnail }:
        { id: string, name: string | null, thumbnail: string }) {
        this.id = id
        this.name = name
        this.thumbnail = thumbnail
    }
}