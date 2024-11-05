import InvoiceFacade from "../facade/invoice.facade";
import { InvoiceFacadeInterface } from "../facade/invoice.facade.interface";
import InvoiceRepository from "../repository/invoice.repository";
import FindInvoiceUsecase from "../usecase/find/find.invoice.usecase";
import GenerateInvoiceUseCase from "../usecase/generate/generate-invoice.usecase";

export default class InvoiceFacadeFactory {
    static create(): InvoiceFacadeInterface {
        const repo = new InvoiceRepository()
        const find = new FindInvoiceUsecase(repo)
        const generate = new GenerateInvoiceUseCase(repo)

        return new InvoiceFacade(find, generate)
    }
}