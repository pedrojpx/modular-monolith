import UseCaseInterface from "../../../@shared/domain/usecase/use-case.interface";
import ProductGateway from "../../gateway/product.gateway";
import { FindAllProductsInputDTO, FindAllProductsOutputDTO } from "./find-all-products.dto";

export default class FindAllProductsUsecase implements UseCaseInterface {
    private _repo: ProductGateway

    constructor(repo: ProductGateway) {
        this._repo = repo
    }

    async execute(input: FindAllProductsInputDTO): Promise<FindAllProductsOutputDTO> {
        const list = await this._repo.findAll()

        return {
            products: list.map((p) => ({
                id: p.id.id,
                name: p.name,
                description: p.description,
                salesPrice: p.salesPrice
            }))
        }
    }
}