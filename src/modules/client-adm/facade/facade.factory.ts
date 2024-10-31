import ClientRepository from "../repository/client.repository"
import AddClientUseCase from "../usecase/add-client/add-client.usecase"
import FindClientUseCase from "../usecase/find-client/find-client.usecase"
import ClientAdmFacade from "./client-adm.facade"
import { ClientFacadeInterface } from "./client-adm.facade.interface"

export default class ClientAdmFacadeFactory {

    static create(): ClientFacadeInterface{
        const repo = new ClientRepository()
        const add = new AddClientUseCase(repo)
        const find = new FindClientUseCase(repo)
        const facade = new ClientAdmFacade({add: add, find: find})

        return facade
    }

}