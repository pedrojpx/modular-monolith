import { Sequelize } from "sequelize-typescript"
import ProductModel from "./product.model"
import Id from "../../@shared/domain/value-object/id.value-object"
import ProductRepository from "./product.repository"

describe("ProductRepository test", () => {
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true}
        })

        sequelize.addModels([ProductModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it("should find all products", async() => {

        await ProductModel.create({
            id: "1",
            name: "Product 1",
            description: "Product 1 description",
            salesPrice: 100,
        })
        
        await ProductModel.create({
            id: "2",
            name: "Product 2",
            description: "Product 2 description",
            salesPrice: 100,
        })

        const repo = new ProductRepository()
        const result = await repo.findAll()

        expect(result.length).toBe(2)
        expect(result[0].id.id).toBe("1")
        //...etc etc
        expect(result[1].id.id).toBe("2")
        //...etc etc
    })

    it("should find a product", async() => {

        await ProductModel.create({
            id: "1",
            name: "Product 1",
            description: "Product 1 description",
            salesPrice: 100,
        })

        const repo = new ProductRepository()
        const result = await repo.find("1")

        expect(result.id.id).toBe("1")
    })
})