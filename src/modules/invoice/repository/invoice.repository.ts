import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/entity/Invoice.entity";
import InvoiceItem from "../domain/entity/InvoiceItem.entity";
import Address from "../domain/value-object/address.value-object";
import InvoiceGateway from "../gateway/invoice.gateway";
import { InvoiceItemModel } from "./invoice-item.model";
import { InvoiceModel } from "./invoice.model";

export default class InvoiceRepository implements InvoiceGateway {
    async create(input: Invoice): Promise<Invoice> {
        const created = await InvoiceModel.create({
            id: input.id.id,
            name: input.name,
            document: input.document,
            street: input.address.street,
            number: input.address.number,
            complement: input.address.complement,
            city: input.address.city,
            state: input.address.state,
            zipCode: input.address.zipCode,
            items: input.items.map(item => {return {id: item.id.id, name: item.name, price: item.price}}),
            createdAt : new Date(),
            updatedAt : new Date(),
        },
        {
            include: [{model: InvoiceItemModel}]        
        })

        return this.invoiceModelToEntity(created)
    }

    async find(id: string): Promise<Invoice> {
        const found = await InvoiceModel.findOne({where: {id: id}, include:[{model: InvoiceItemModel, as: "items"}]}) 

        return this.invoiceModelToEntity(found)
    }

    private invoiceModelToEntity(m: InvoiceModel): Invoice {
        const address = new Address({
            street: m.street,
            number: m.number,
            complement: m.complement,
            city: m.city,
            state: m.state,
            zipCode: m.zipCode,
        })

        const items = m.items.map(item => {return new InvoiceItem({
            id: item.id, 
            name: item.name, 
            price: item.price
        })})

        const invoice = new Invoice({
            id: new Id(m.id),
            name: m.name,
            document: m.document,
            address: address,
            items: items,
            createdAt: m.createdAt,
            updatedAt: m.updatedAt
        })
        
        return invoice
    }

}