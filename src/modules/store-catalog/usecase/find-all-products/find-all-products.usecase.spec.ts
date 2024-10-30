import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import FindAllProductsUsecase from "./find-all-products.usecase";

const product = new Product({
    id: new Id("1"),
    name: "Product 1",
    description: "Product 1 description",
    salesPrice: 100,
})

const product2 = new Product({
    id: new Id("2"),
    name: "Product 2",
    description: "Product 2 description",
    salesPrice: 100,
})

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([product, product2]))
    }
}

describe("find all products use case unit test", () => {
    it("should find all products", async() => {
        const repo = MockRepository()
        const usecase = new FindAllProductsUsecase(repo)

        const result = await usecase.execute({})

        expect(repo.findAll).toHaveBeenCalled()
        expect(result.products.length).toBe(2)
        expect(result.products[0].id).toBe(product.id.id)
        //...etc etc
        expect(result.products[1].id).toBe(product2.id.id)
        //...etc etc
    })
})