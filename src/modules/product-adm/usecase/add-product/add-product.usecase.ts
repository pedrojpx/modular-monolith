import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import ProductGateway from "../../gateway/product.gateway";
import { AddProductInputDTO, AddProductOutputDTO } from "./add-product-dto";

export default class AddProductUseCase {
    private _repo: ProductGateway

    constructor(repo: ProductGateway) {
        this._repo = repo
    }

    async execute(input: AddProductInputDTO): Promise<AddProductOutputDTO> {
        const props = {
            id: new Id(input.id),
            name: input.name,
            description: input.description,
            purchasePrice: input.purchasePrice,
            stock: input.stock
        }

        const p = new Product(props)

        this._repo.add(p)

        return {
            id: p.id.id,
            name: p.name,
            description: p.description,
            purchasePrice: p.purchasePrice,
            stock: p.stock,
            createdAt: p.createdAt,
            updatedAt: p.updatedAt
        }
        
    }
}