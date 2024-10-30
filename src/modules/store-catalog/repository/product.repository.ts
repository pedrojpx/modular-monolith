import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";
import ProductGateway from "../gateway/product.gateway";
import ProductModel from "./product.model";

export default class ProductRepository implements ProductGateway{
    async find(id: string): Promise<Product> {
        const p = await ProductModel.findOne({where: {id:id}})

        return new Product({
            id: new Id(p.id),
            name: p.name,
            description: p.description,
            salesPrice: p.salesPrice
        })
        
    }
    
    async findAll(): Promise<Product[]> {
        const list = await ProductModel.findAll()
        
        return list.map(p => {
            return new Product({
                id: new Id(p.id),
                name: p.name,
                description: p.description,
                salesPrice: p.salesPrice,
            })
        })
    }
}