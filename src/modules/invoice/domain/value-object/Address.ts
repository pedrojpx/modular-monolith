import ValueObject from "../../../@shared/domain/value-object/value-object.interface";

export default class Address implements ValueObject {
    constructor(private _street: string, private _number: number) {}

    get street(): string {
        return this._street
    }

    get number(): number {
        return this._number
    }
}