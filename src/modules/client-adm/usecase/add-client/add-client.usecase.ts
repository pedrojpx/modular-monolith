import UseCaseInterface from "../../../@shared/domain/usecase/use-case.interface";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/client.entity";
import ClientGateway from "../../gateway/client.gateway";
import { AddClientInputDto, AddClientOutputDto } from "./add-client.usecase.dto";

export default class AddClientUseCase implements UseCaseInterface {
    private _repo: ClientGateway

    constructor(repo: ClientGateway) {
        this._repo = repo
    }

    async execute(input: AddClientInputDto): Promise<AddClientOutputDto> {
        const client = new Client({
            name: input.name,
            address: input.address,
            email: input.email
        })

        await this._repo.add(client)

        return {
            id: client.id.id,
            name: client.name,
            address: client.address,
            email: client.email,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt
        }
    }
}