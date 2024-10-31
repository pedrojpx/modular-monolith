import UseCaseInterface from "../../@shared/domain/usecase/use-case.interface";
import { AddClientFacadeInputDto, ClientFacadeInterface, FindClientFacadeInputDTO, FindClientFacadeOutputDTO } from "./client-adm.facade.interface";

type FacadeProps = {
    add: UseCaseInterface, find: UseCaseInterface
}

export default class ClientAdmFacade implements ClientFacadeInterface {
    private _add: UseCaseInterface
    private _find: UseCaseInterface

    constructor(props: FacadeProps) {
        this._add = props.add
        this._find = props.find
    }
    
    async add(input: AddClientFacadeInputDto): Promise<void> {
        await this._add.execute(input)
    }

    async find(input: FindClientFacadeInputDTO): Promise<FindClientFacadeOutputDTO> {
        return await this._find.execute(input)
    }
}