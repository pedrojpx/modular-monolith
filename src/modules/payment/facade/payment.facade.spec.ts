import { Sequelize } from "sequelize-typescript"
import TransactionModel from "../repository/transaction.model"
import PaymentFacadeFactory from "../factory/payment.facade.factory"

describe("Transaction repository test", () => {
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true}
        })

        sequelize.addModels([TransactionModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it("should process a transction", async() => {
        const facade = PaymentFacadeFactory.create()

        const input = {
            orderId: "order-1",
            amount: 100
        }

        const output = await facade.process(input)

        expect(output.transactionId).toBeDefined()
        expect(output.orderId).toBe(input.orderId)
        expect(output.amount).toBe(input.amount)
        expect(output.status).toBe("approved")
    })

})