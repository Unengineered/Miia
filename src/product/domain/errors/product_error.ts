export default class ProductError extends Error{
    readonly code: string
    constructor({code} : {code: string}){
        super(code)
        this.code = code
    }
}