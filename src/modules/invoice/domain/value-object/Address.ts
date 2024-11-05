import ValueObject from "../../../@shared/domain/value-object/value-object.interface";

type AddressProps = {
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
}

export default class Address implements ValueObject {
    private _street: string;
    private _number: string;
    private _complement: string;
    private _city: string;
    private _state: string;
    private _zipCode: string;
    
    constructor(p: AddressProps) {
        this._street = p.street
        this._number = p.number
        this._complement = p.complement
        this._city = p.city
        this._state = p.state
        this._zipCode = p.zipCode
    }

    get street(): string {
        return this._street
    }

    get number(): string {
        return this._number
    }

    get complement(): string {
        return this._complement
    }

    get city(): string {
        return this._city
    }

    get state(): string {
        return this._state
    }

    get zipCode(): string {
        return this._zipCode
    }
}