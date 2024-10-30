import Product from "../domain/product.entity";

//interface do módulo de produto com o mundo externo
export default interface ProductGateway {
    add(product: Product): Promise<void>
    find(id: string): Promise<Product>
}