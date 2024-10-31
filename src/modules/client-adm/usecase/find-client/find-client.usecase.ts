import UseCaseInterface from "../../../@shared/domain/usecase/use-case.interface";
import ClientGateway from "../../gateway/client.gateway";
import { FindClientUseCaseInputDTO, FindClientUseCaseOutputDTO } from "./find-client.usecase.dto";

export default class FindClientUseCase implements UseCaseInterface {
    private _repo: ClientGateway

    constructor(repo: ClientGateway) {
        this._repo = repo
    }

    async execute(input: FindClientUseCaseInputDTO): Promise<FindClientUseCaseOutputDTO> {
        const client = await this._repo.find(input.id)

        return {
            id: client.id.id,
            name: client.name,
            address: client.address,
            email: client.email,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt,
        }
    }
}