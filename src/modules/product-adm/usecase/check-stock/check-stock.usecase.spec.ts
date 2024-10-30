import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import CheckStockUseCase from "./check-stock.usecase";

const product = new Product({
    id: new Id("1"),
    name: "Product 1",
    description: "Product 1 description",
    purchasePrice: 100,
    stock: 100
})

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product))
    }
}

describe("check stock usecase unit test", () => {
    
    it("should get stock of a product", async() => {
        const repo = MockRepository()
        const usecase = new CheckStockUseCase(repo)
        const input = {productId: product.id.id}

        const result = await usecase.execute(input)

        expect(repo.find).toHaveBeenCalled()
        expect(result.productId).toEqual(product.id.id)
        expect(result.stock).toEqual(product.stock)
    })
})