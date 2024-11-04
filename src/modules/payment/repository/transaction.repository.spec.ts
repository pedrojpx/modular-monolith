import { Sequelize } from "sequelize-typescript"
import Id from "../../@shared/domain/value-object/id.value-object"
import TransactionModel from "./transaction.model"
import TransactionRepository from "./transaction.repository"
import Transaction from "../domain/transaction"

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

    it("should save a transaction", async() => {
        const t = new Transaction({
            id: new Id("1"),
            amount: 100,
            orderId: "1"
        })
        t.approve()

        const repo = new TransactionRepository()
        const result = await repo.save(t)

        expect(result.id).toBe(t.id)
        expect(result.status).toBe(t.status)
        expect(result.amount).toBe(t.amount)
        expect(result.orderId).toBe(t.orderId)
    })

})
