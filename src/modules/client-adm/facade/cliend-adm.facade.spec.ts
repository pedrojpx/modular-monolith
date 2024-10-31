import { Sequelize } from "sequelize-typescript"
import { ClientModel } from "../repository/client.model"
import ClientRepository from "../repository/client.repository"
import AddClientUseCase from "../usecase/add-client/add-client.usecase"
import ClientAdmFacade from "./client-adm.facade"
import FindClientUseCase from "../usecase/find-client/find-client.usecase"
import Client from "../domain/client.entity"
import Id from "../../@shared/domain/value-object/id.value-object"
import ClientAdmFacadeFactory from "./facade.factory"

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

    it("should create a client", async() => {
        const facade = ClientAdmFacadeFactory.create()

        const input = {
            id: "1",
            name: "pedro",
            email: "e@mail",
            address: "address"
        }
        await facade.add(input)

        const client = await ClientModel.findOne({where: {id: "1"}})

        expect(input.id).toBe(client.id)
        expect(input.name).toBe(client.name)
        expect(input.address).toBe(client.address)
        expect(input.email).toBe(client.email)
    })

    it("should find a client", async() => {
        const facade = ClientAdmFacadeFactory.create()
        
        const input = {
            id: "1",
            name: "pedro",
            email: "mail",
            address: "address",
            createdAt: new Date(),
            updatedAt: new Date()
        }
        await ClientModel.create(input)
        const found = await facade.find({id : "1"})


        expect(input.id).toBe(found.id)
        expect(input.name).toBe(found.name)
        expect(input.address).toBe(found.address)
        expect(input.email).toBe(found.email)
    })
})