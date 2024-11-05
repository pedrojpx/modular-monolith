import BaseEntity from "../../../@shared/domain/entity/base.entity";
import Id from "../../../@shared/domain/value-object/id.value-object";

type InvoiceItemProps = {
    id ?: Id
    name: string
    price: number
}

export default class InvoiceItem extends BaseEntity {
    name: string
    price: number

    constructor(p: InvoiceItemProps) {
        super(p.id)
        this.name = p.name
        this.price = p.price
    }
}