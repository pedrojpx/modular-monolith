import { Sequelize } from "sequelize-typescript"
import { ProductModel } from "./product.model"
import Product from "../domain/product.entity"
import { detailed } from "yargs-parser"
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

    it("should create a product", async() => {
        const repo = new ProductRepository()
        const p = new Product({
            id: new Id("1"),
            name: "product 1",
            description: "description",
            purchasePrice: 100,
            stock: 10,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        const result = await repo.add(p)
        
        const created = await ProductModel.findOne({
            where: {id: p.id.id}
        })

        expect(p.id.id).toEqual(created.id)
        expect(p.name).toEqual(created.name)
        expect(p.description).toEqual(created.description)
        expect(p.purchasePrice).toEqual(created.purchasePrice)
        expect(p.stock).toEqual(created.stock)
    })

    it("should find a product", async() => {
        const repo = new ProductRepository()
        const props = {
            id: new Id("1"),
            name: "product 1",
            description: "description",
            purchasePrice: 100,
            stock: 10,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        
        await ProductModel.create({
            id: props.id.id,
            name: props.name,
            description: props.description,
            purchasePrice: props.purchasePrice,
            stock: props.stock,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        
        const found = await repo.find(props.id.id)

        expect(props.id).toEqual(found.id)
        expect(props.name).toEqual(found.name)
        expect(props.description).toEqual(found.description)
        expect(props.purchasePrice).toEqual(found.purchasePrice)
        expect(props.stock).toEqual(found.stock)
    })
})