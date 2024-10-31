import Id from "../../../@shared/domain/value-object/id.value-object"
import Client from "../../domain/client.entity"
import AddClientUseCase from "./add-client.usecase"

const client = new Client({
    address: "address",
    email:"mail",
    name: "pedro"
})

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(client))
    }
}

describe("add client usecase unit test", () => {
    it("should add a client", async() => {
        const repo = MockRepository()
        const usecase = new AddClientUseCase(repo)

        const result = await usecase.execute({
            address: client.address, email: client.email, name: client.name
        })

        expect(repo.add).toHaveBeenCalled()
        expect(result.id).toBeDefined()
        expect(result.name).toBe(client.name)
        expect(result.address).toBe(client.address)
        expect(result.email).toBe(client.email)
    })
})