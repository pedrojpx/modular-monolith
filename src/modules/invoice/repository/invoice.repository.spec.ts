import { Sequelize } from "sequelize-typescript"
import Id from "../../@shared/domain/value-object/id.value-object"
import { InvoiceItemModel } from "./invoice-item.model"
import { InvoiceModel } from "./invoice.model"
import InvoiceRepository from "./invoice.repository"
import Address from "../domain/value-object/address.value-object"
import Invoice from "../domain/entity/Invoice.entity"
import InvoiceItem from "../domain/entity/InvoiceItem.entity"

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

    it("should create an invoice", async() => {
        const address = new Address({
            street: "street",
            number: "123",
            complement: "apt1",
            city: "city",
            state: "ST",
            zipCode: "zip",
        })

        const item1 = new InvoiceItem({
            id: new Id("1"),
            name: "item1",
            price: 10
        })
        
        const item2 = new InvoiceItem({
            id: new Id("2"),
            name: "item2",
            price: 20
        })

        const invoice = new Invoice({
            id: new Id("1"),
            name: "pedro",
            document: "123321",
            address: address,
            items: [item1, item2],
            createdAt: new Date(),
            updatedAt: new Date()
        })

        const repo = new InvoiceRepository()
        const created = await repo.create(invoice)
        const found = await InvoiceModel.findOne({where: {id: invoice.id.id}, include:[{model: InvoiceItemModel, as: "items"}]})

        expect(created.id.id).toEqual(found.id)
        expect(created.name).toEqual(found.name)
        expect(created.document).toEqual(found.document)
        expect(created.address.street).toBe(found.street)
        expect(created.address.number).toBe(found.number)
        expect(created.address.complement).toBe(found.complement)
        expect(created.address.city).toBe(found.city)
        expect(created.address.state).toBe(found.state)
        expect(created.address.zipCode).toBe(found.zipCode)
        expect(created.items.length).toBe(2)
        expect(found.items.length).toBe(2)
        expect(created.items[0].id).toBe(found.items[0].id)
        expect(created.items[0].name).toBe(found.items[0].name)
        expect(created.items[0].price).toBe(found.items[0].price)
        expect(created.items[1].id).toBe(found.items[1].id)
        expect(created.items[1].name).toBe(found.items[1].name)
        expect(created.items[1].price).toBe(found.items[1].price)
        expect(created.total).toBe(30)
    })

    it("should find a client", async() => {
        
        const address = new Address({
            street: "street",
            number: "123",
            complement: "apt1",
            city: "city",
            state: "ST",
            zipCode: "zip",
        })

        const item1 = new InvoiceItem({
            id: new Id("1"),
            name: "item1",
            price: 10
        })
        
        const item2 = new InvoiceItem({
            id: new Id("2"),
            name: "item2",
            price: 20
        })

        const invoice = new Invoice({
            id: new Id("1"),
            name: "pedro",
            document: "123321",
            address: address,
            items: [item1, item2],
            createdAt: new Date(),
            updatedAt: new Date()
        })

        const repo = new InvoiceRepository()
        await repo.create(invoice)
        const found = await repo.find(invoice.id.id)

        expect(found.id.id).toEqual("1")
        expect(found.name).toEqual("pedro")
        expect(found.document).toEqual("123321")
        expect(found.address.street).toBe("street")
        expect(found.address.number).toBe("123")
        expect(found.address.complement).toBe("apt1")
        expect(found.address.city).toBe("city")
        expect(found.address.state).toBe("ST")
        expect(found.address.zipCode).toBe("zip")
        expect(found.items.length).toBe(2)
        expect(found.items[0].id).toBe("1")
        expect(found.items[0].name).toBe("item1")
        expect(found.items[0].price).toBe(10)
        expect(found.items[1].id).toBe("2")
        expect(found.items[1].name).toBe("item2")
        expect(found.items[1].price).toBe(20)
        expect(found.total).toBe(30)

    })

})