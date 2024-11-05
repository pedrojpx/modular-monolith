import TransactionRepository from "../repository/transaction.repository";
import ProcessPaymentUseCase from "../usecase/process-payment/process-payment.usecase";
import PaymentFacadeInterface, { PaymentFacadeInputDTO, PaymentFacadeOutputDTO } from "./facade.interface";

export default class PaymentFacade implements PaymentFacadeInterface {
    constructor(private usecase: ProcessPaymentUseCase) {}
    
    async process(input: PaymentFacadeInputDTO): Promise<PaymentFacadeOutputDTO> {
        return await this.usecase.execute(input)
    }
}