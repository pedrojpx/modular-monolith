import UseCaseInterface from "../../@shared/domain/usecase/use-case.interface";
import { FindInvoiceFacadeInputDto, FindInvoiceFacadeOutputDto, GenerateInvoiceFacadeInputDto, GenerateInvoiceFacadeOutputDto, InvoiceFacadeInterface } from "./invoice.facade.interface";

export default class InvoiceFacade implements InvoiceFacadeInterface {
    constructor(private _find: UseCaseInterface, private _generate: UseCaseInterface) {}
    
    async find(input: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDto> {
        return await this._find.execute(input)
    }

    async generate(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto> {
        return await this._generate.execute(input)
    }
}