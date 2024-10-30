import UseCaseInterface from "../../../@shared/domain/usecase/use-case.interface";
import ProductRepository from "../../repository/product.repository";
import { FindProductInputDto, FindProductOutputDto } from "./find-product.dto";

export default class FindProductUsecase implements UseCaseInterface {
    
    constructor(private repo: ProductRepository) {}

    async execute(input: FindProductInputDto): Promise<FindProductOutputDto> {
        const p = await this.repo.find(input.id)

        return {
            id: p.id.id,
            name: p.name,
            description: p.description,
            salesPrice: p.salesPrice
        }
    }
}