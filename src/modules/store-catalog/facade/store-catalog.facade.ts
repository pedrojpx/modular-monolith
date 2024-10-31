import UseCaseInterface from "../../@shared/domain/usecase/use-case.interface";
import FindAllProductsUsecase from "../usecase/find-all-products/find-all-products.usecase";
import FindProductUsecase from "../usecase/find-product/find-product.usecase";
import StoreCatalogFacadeInterface, { FindAllStoreCatalogFacadeOutputDTO, FindStoreCatalogFacadeInputDTO, FindStoreCatalogFacadeOutputDTO } from "./store-catalog.facade.interface";

export interface FacadeProps {
    find: UseCaseInterface
    findAll: UseCaseInterface
}

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {
    
    private _findUseCase: UseCaseInterface
    private _findAllUseCas: UseCaseInterface
    
    constructor(props: FacadeProps) {
        this._findAllUseCas = props.findAll
        this._findUseCase = props.find

    }
    
    async find(id: FindStoreCatalogFacadeInputDTO): Promise<FindStoreCatalogFacadeOutputDTO> {
        return await this._findUseCase.execute(id)
    }

    async findAll(): Promise<FindAllStoreCatalogFacadeOutputDTO> {
        return await this._findAllUseCas.execute({})
    }
}