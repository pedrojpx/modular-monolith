import UseCaseInterface from "../../../@shared/domain/usecase/use-case.interface";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/entity/Invoice.entity";
import InvoiceItem from "../../domain/entity/InvoiceItem.entity";
import Address from "../../domain/value-object/address.value-object";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate-invoice.dto";

export default class GenerateInvoiceUseCase implements UseCaseInterface {
    
    constructor(private repo: InvoiceGateway) {}

    async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
        const address = new Address({
            city: input.city,
            complement: input.complement,
            number: input.number,
            state: input.state,
            street: input.street,
            zipCode: input.zipCode
        })

        const items = input.items.map(item => {
            return new InvoiceItem({id: new Id(item.id), name: item.name, price: item.price})
        })

        const invoice = new Invoice({
            id: new Id(input.id),
            document: input.document,
            name: input.name,
            address: address,
            items: items
        })
        
        const created = await this.repo.create(invoice)

        return {
            id: created.id.id,
            name: created.name,
            document: created.document,
            city: created.address.city,
            complement: created.address.complement,
            number: created.address.number,
            state: created.address.state,
            street: created.address.street,
            zipCode: created.address.zipCode,
            total: created.total,
            items: created.items.map((item) => {return {id: item.id.id, name: item.name, price: item.price}})
        }
    }
}