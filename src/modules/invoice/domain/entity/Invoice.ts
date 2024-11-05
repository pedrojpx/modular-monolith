import AggregateRoot from "../../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../../@shared/domain/entity/base.entity";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Address from "../value-object/Address";
import InvoiceItem from "./InvoiceItem";

type InvoiceProps = {
    id ?: Id
    name: string
    document: string
    address: Address
    items: InvoiceItem[]
    createdAt ?: Date
    updatedAt ?: Date
}

export default class Invoice extends BaseEntity implements AggregateRoot {
    private _name: string
    private _document: string
    private _address: Address // value object
    private _items: InvoiceItem[] // Invoice Items entity

    constructor(p: InvoiceProps) {
        super(p.id, p.createdAt, p.updatedAt)
        this._name = p.name
        this._document = p.document
        this._address = p.address
        this._items = p.items
    }
}

