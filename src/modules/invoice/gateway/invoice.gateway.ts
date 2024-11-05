import Invoice from "../domain/entity/Invoice";

export default interface InvoiceGateway {
    find(id: string): Promise<Invoice>
    create(input: Invoice): Promise<Invoice>
}