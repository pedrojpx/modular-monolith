import Id from "../../../@shared/domain/value-object/id.value-object"
import Client from "../../domain/client.entity"
import FindClientUseCase from "./find-client.usecase"

const client = new Client({
    id: new Id("1"),
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

describe("find client usecase unit test", () => {
    it("should find a client", async() => {
        const repo = MockRepository()
        const usecase = new FindClientUseCase(repo)

        const result = await usecase.execute({id: client.id.id})

        expect(repo.find).toHaveBeenCalled()
        expect(result.id).toBeDefined()
        expect(result.name).toBe(client.name)
        expect(result.address).toBe(client.address)
        expect(result.email).toBe(client.email)
    })
})