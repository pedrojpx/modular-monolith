import { Sequelize } from "sequelize-typescript"
import { ClientModel } from "./client.model"
import ClientRepository from "./client.repository"
import Client from "../domain/client.entity"
import Id from "../../@shared/domain/value-object/id.value-object"

describe("ProductRepository test", () => {
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true}
        })

        sequelize.addModels([ClientModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })


    it("should find a client", async() => {
        const client = await ClientModel.create({
            id: "1",
            name: "pedro",
            email: "mail",
            address: "address",
            createdAt: new Date(),
            updatedAt: new Date()
        })

        const repo = new ClientRepository()
        const c = await repo.find(client.id)

        expect(c.id.id).toEqual(client.id)
        expect(c.name).toEqual(client.name)
        expect(c.address).toEqual(client.address)
        expect(c.email).toEqual(client.email)
        expect(c.createdAt).toEqual(client.createdAt)
        expect(c.updatedAt).toEqual(client.updatedAt)

    })
    
    it("should create a client", async() => {
        const client = new Client({
            id: new Id("1"),
            name: "pedro",
            email: "mail",
            address: "address",
            createdAt: new Date(),
            updatedAt: new Date()
        })

        const repo = new ClientRepository()
        await repo.add(client)

        const found = await ClientModel.findOne({where: {id: client.id.id}})

        expect(client.id.id).toEqual(found.id)
        expect(client.name).toEqual(found.name)
        expect(client.address).toEqual(found.address)
        expect(client.email).toEqual(found.email)
        expect(client.createdAt).toEqual(found.createdAt)
        expect(client.updatedAt).toEqual(found.updatedAt)

    })
})