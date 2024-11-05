import { fn } from "sequelize"
import Id from "../../../@shared/domain/value-object/id.value-object"
import Invoice from "../../domain/entity/Invoice.entity"
import InvoiceItem from "../../domain/entity/InvoiceItem.entity"
import Address from "../../domain/value-object/address.value-object"
import GenerateInvoiceUseCase from "./generate-invoice.usecase"

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

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
        create: jest.fn().mockReturnValue(Promise.resolve(invoice))
    }
}

describe("unit tests for find invoice usecase", () => {

    it("should find a usecase", async () => {
        const repo = MockRepository()
        const usecase = new GenerateInvoiceUseCase(repo)

        const created = await usecase.execute({
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            complement: invoice.address.complement,
            number: invoice.address.number,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
            items: [item1, item2].map(item => {return {id: item.id.id, name: item.name, price: item.price}})
        })

        expect(created.id).toEqual("1")
        expect(created.name).toEqual("pedro")
        expect(created.document).toEqual("123321")
        expect(created.street).toBe("street")
        expect(created.number).toBe("123")
        expect(created.complement).toBe("apt1")
        expect(created.city).toBe("city")
        expect(created.state).toBe("ST")
        expect(created.zipCode).toBe("zip")
        expect(created.items.length).toBe(2)
        expect(created.items[0].id).toBe("1")
        expect(created.items[0].name).toBe("item1")
        expect(created.items[0].price).toBe(10)
        expect(created.items[1].id).toBe("2")
        expect(created.items[1].name).toBe("item2")
        expect(created.items[1].price).toBe(20)
        expect(created.total).toBe(30)
    })
}) 