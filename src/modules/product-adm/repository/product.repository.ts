import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";
import ProductGateway from "../gateway/product.gateway";
import { ProductModel } from "./product.model";

export default class ProductRepository implements ProductGateway {
    async add(product: Product): Promise<void> {
        await ProductModel.create({
            id: product.id.id,
            name: product.name,
            description: product.description,
            purchasePrice: product.purchasePrice,
            stock: product.stock,
            createdAt: new Date(),
            updatedAt: new Date()
        })
    }

    async find(id: string): Promise<Product> {
        const m = await ProductModel.findOne({
            where: { id: id }
        })

        if (!m) {
            throw new Error(`product model with id ${id} not found`)
        }

        const p = new Product({
            id: new Id(m.id), 
            name: m.name, 
            description: m.description, 
            purchasePrice: m.purchasePrice, 
            stock: m.stock, 
            createdAt: m.createdAt, 
            updatedAt: m.updatedAt
        })
        return p
    }
}