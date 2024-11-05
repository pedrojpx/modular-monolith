import UseCaseInterface from "../../../@shared/domain/usecase/use-case.interface";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO } from "./find.invoice.dto";

export default class FindInvoiceUsecase implements UseCaseInterface {
    constructor(private repo: InvoiceGateway) {}

    async execute(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {
        const found = await this.repo.find(input.id)

        return {
            id: found.id.id,
            name: found.name,
            document: found.document,
            address: {
                city: found.address.city,
                complement: found.address.complement,
                number: found.address.number,
                state: found.address.state,
                street: found.address.street,
                zipCode: found.address.zipCode,
            },
            total: found.total,
            items: found.items.map((item) => {return {id: item.id.id, name: item.name, price: item.price}}),
            createdAt: found.createdAt
        }
    }
}