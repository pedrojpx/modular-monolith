import { Sequelize } from "sequelize-typescript"
import { InvoiceModel } from "../repository/invoice.model"
import { InvoiceItemModel } from "../repository/invoice-item.model"
import InvoiceFacadeFactory from "../factory/facade.factory"

describe("ProductRepository test", () => {
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true}
        })

        sequelize.addModels([InvoiceItemModel, InvoiceModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    describe("invoice facade unit test", () => {

        it("should create an invoice", async () => {
            const facade = InvoiceFacadeFactory.create()

            const input = {
                id: "1",
                name: "pedro",
                document: "123321",
                street: "street",
                complement: "apt1",
                number: "123",
                city: "city",
                state: "ST",
                zipCode: "112313",
                items: [
                    {id: "1", name: "item1", price: 10},
                    {id: "2", name: "item2", price: 20},
                ]
            }

            const created = await facade.generate(input)
            const found = await InvoiceModel.findOne({where: {id: input.id}, include:[{model: InvoiceItemModel, as: "items"}]})

            expect(created.id).toEqual(found.id)
            expect(created.name).toEqual(found.name)
            expect(created.document).toEqual(found.document)
            expect(created.street).toBe(found.street)
            expect(created.number).toBe(found.number)
            expect(created.complement).toBe(found.complement)
            expect(created.city).toBe(found.city)
            expect(created.state).toBe(found.state)
            expect(created.zipCode).toBe(found.zipCode)
            expect(created.items.length).toBe(2)
            expect(created.items[0].id).toBe(found.items[0].id.id)
            expect(created.items[0].name).toBe(found.items[0].name)
            expect(created.items[0].price).toBe(found.items[0].price)
            expect(created.items[1].id).toBe(found.items[1].id.id)
            expect(created.items[1].name).toBe(found.items[1].name)
            expect(created.items[1].price).toBe(found.items[1].price)
        })

        it("should create an invoice", async () => {
            const facade = InvoiceFacadeFactory.create()

            const input = {
                id: "1",
                name: "pedro",
                document: "123321",
                street: "street",
                complement: "apt1",
                number: "123",
                city: "city",
                state: "ST",
                zipCode: "112313",
                items: [
                    {id: "1", name: "item1", price: 10},
                    {id: "2", name: "item2", price: 20},
                ]
            }

            const created = await facade.generate(input)
            const found = await facade.find({id: input.id})

            expect(created.id).toEqual(found.id)
            expect(created.name).toEqual(found.name)
            expect(created.document).toEqual(found.document)
            expect(created.street).toBe(found.address.street)
            expect(created.number).toBe(found.address.number)
            expect(created.complement).toBe(found.address.complement)
            expect(created.city).toBe(found.address.city)
            expect(created.state).toBe(found.address.state)
            expect(created.zipCode).toBe(found.address.zipCode)
            expect(created.items.length).toBe(2)
            expect(created.items[0].id).toBe(found.items[0].id)
            expect(created.items[0].name).toBe(found.items[0].name)
            expect(created.items[0].price).toBe(found.items[0].price)
            expect(created.items[1].id).toBe(found.items[1].id)
            expect(created.items[1].name).toBe(found.items[1].name)
            expect(created.items[1].price).toBe(found.items[1].price)
        })

    })
})