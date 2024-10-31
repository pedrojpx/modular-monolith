import Id from "../../../@shared/domain/value-object/id.value-object";
import Transaction from "../../domain/transaction";
import ProcessPaymentUseCase from "./process-payment.usecase";

const t = new Transaction({
    id: new Id("1"),
    amount: 100,
    orderId: "1",
    status: "approved"
})

const MockRepository = () => {
    return {
        save: jest.fn().mockReturnValue(Promise.resolve(t))
    }
}

describe("process payment usecase unit test", () => {
    
    it("should approve a transaction", async() => {
        const repo = MockRepository()
        const usecase = new ProcessPaymentUseCase(repo)

        const input = {
            orderId: "1",
            amount: 100
        }

        const result = await usecase.execute(input)

        expect(result.transactionId).toBe(t.id.id)
        expect(repo.save).toHaveBeenCalled()
        expect(result.status).toBe("approved")
        expect(result.amount).toBe(t.amount)
        expect(result.orderId).toBe(t.orderId)
        expect(result.createdAt).toBe(t.createdAt)
        expect(result.updatedAt).toBe(t.updatedAt)

    })

})
