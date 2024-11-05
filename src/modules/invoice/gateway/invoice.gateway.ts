import Invoice from "../domain/entity/Invoice.entity";

export default interface InvoiceGateway {
    find(id: string): Promise<Invoice>
    create(input: Invoice): Promise<Invoice>
}