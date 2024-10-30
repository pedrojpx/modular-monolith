import Id from "../../../@shared/domain/value-object/id.value-object"
import Product from "../../domain/product.entity"
import FindProductUsecase from "./find-product.usecase"

const product = new Product({
    id: new Id("1"),
    name: "Product 1",
    description: "Product 1 description",
    salesPrice: 100,
})

const MockRepository = () => {
    return {
        findAll: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product))
    }
}

describe("find product usecase nit test", () => {

    it("should find a product", async() => {
        const repo = MockRepository()
        const usecase = new FindProductUsecase(repo)

        const result = await usecase.execute({id: "1"})

        expect(repo.find).toHaveBeenCalled()
        expect(result).toBeDefined()
        expect(result.id).toBe("1")
    })
})