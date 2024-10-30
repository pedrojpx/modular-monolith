import { Sequelize } from "sequelize-typescript"
import { ProductModel } from "../repository/product.model"
import ProductAdmFacadeFactory from "../factory/facade.factory"

describe("product adm face test", () => {
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

    it("should create a product", async() => {
        const facade = ProductAdmFacadeFactory.create()

        const input = {
            id: "1",
            name: "Product 1",
            description: "Product 1 description",
            purchasePrice: 100,
            stock: 100
        }

        await facade.addProduct(input)

        const found = await ProductModel.findOne({where: {id: 1}})
        expect(found).toBeDefined()
        expect(found.id).toBe(input.id)
        expect(found.description).toBe(input.description)
        expect(found.purchasePrice).toBe(input.purchasePrice)
        expect(found.stock).toBe(input.stock)
    })

    it("should create a product", async() => {
        const facade = ProductAdmFacadeFactory.create()

        const input = {
            id: "1",
            name: "Product 1",
            description: "Product 1 description",
            purchasePrice: 100,
            stock: 100
        }

        await facade.addProduct(input)

        const output = await facade.checkStock({productId: input.id})

        const found = await ProductModel.findOne({where: {id: 1}})
        expect(output).toBeDefined()
        expect(found.id).toBe(output.productId)
        expect(found.stock).toBe(output.stock)
    })
})