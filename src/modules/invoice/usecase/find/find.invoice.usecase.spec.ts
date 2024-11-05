import { fn } from "sequelize"
import Id from "../../../@shared/domain/value-object/id.value-object"
import Invoice from "../../domain/entity/Invoice.entity"
import InvoiceItem from "../../domain/entity/InvoiceItem.entity"
import Address from "../../domain/value-object/address.value-object"
import FindInvoiceUsecase from "./find.invoice.usecase"

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
        const usecase = new FindInvoiceUsecase(repo)

        const found = await usecase.execute({id: invoice.id.id})

        expect(found.id).toEqual("1")
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