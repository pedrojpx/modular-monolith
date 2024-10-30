import UseCaseInterface from "../../../@shared/domain/usecase/use-case.interface";
import ProductGateway from "../../gateway/product.gateway";
import { CheckStockInputDTO, CheckStockOutputDTO } from "./check-stock.dto";

export default class CheckStockUseCase implements UseCaseInterface {
    private _repo: ProductGateway

    constructor(repo: ProductGateway) {
        this._repo = repo
    }

    async execute(input: CheckStockInputDTO): Promise<CheckStockOutputDTO> {
        const p = await this._repo.find(input.productId)

        return {
            productId: p.id.id,
            stock: p.stock
        }
    }
}