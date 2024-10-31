import UseCaseInterface from "../../../@shared/domain/usecase/use-case.interface";
import Transaction from "../../domain/transaction";
import PaymentGateway from "../../gateway/payment.gateway";
import { ProcessPaymentInputDto, ProcessPaymentOutputDto } from "./process-payment.dto";

export default class ProcessPaymentUseCase implements UseCaseInterface {
    constructor(private repo: PaymentGateway) {}

    async execute(input: ProcessPaymentInputDto): Promise<ProcessPaymentOutputDto> {
        const t = new Transaction({
            amount: input.amount,
            orderId: input.orderId
        })

        t.process() //in real case this is where the payment would go to an external gateway for payment

        const saved = await this.repo.save(t)

        return {
            transactionId: saved.id.id,
            orderId: saved.orderId,
            amount: saved.amount,
            status: saved.status,
            createdAt: saved.createdAt,
            updatedAt: saved.updatedAt
        }

    }
}