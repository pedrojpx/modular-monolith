import UseCaseInterface from "../../@shared/domain/usecase/use-case.interface";
import ProductAdmFacadeInterface, { AddProductFacadeInputDTO, CheckStockFacadeInputDTO, CheckStockFacadeOutputDTO } from "./product-adm.facade.interface";

export interface FacadeProps {
    addUseCase: UseCaseInterface
    checkStockUseCase: UseCaseInterface
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {
    private _addUseCase: UseCaseInterface
    private _checkStockUseCase: UseCaseInterface

    constructor(props: FacadeProps) {
        this._addUseCase = props.addUseCase
        this._checkStockUseCase = props.checkStockUseCase
    }
    
    addProduct(input: AddProductFacadeInputDTO): Promise<void> {
        //if facade input and usecase are different, this is where to convert them
        return this._addUseCase.execute(input)
    }

    checkStock(input: CheckStockFacadeInputDTO): Promise<CheckStockFacadeOutputDTO> {
        return this._checkStockUseCase.execute(input)
    }
}