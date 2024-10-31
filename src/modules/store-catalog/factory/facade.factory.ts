import StoreCatalogFacade from "../facade/store-catalog.facade";
import StoreCatalogFacadeInterface from "../facade/store-catalog.facade.interface";
import ProductRepository from "../repository/product.repository";
import FindAllProductsUsecase from "../usecase/find-all-products/find-all-products.usecase";
import FindProductUsecase from "../usecase/find-product/find-product.usecase";

export default class StoreCatalogFacadeFactory {
    
    static create(): StoreCatalogFacadeInterface {
        const repo = new ProductRepository()
        const find = new FindProductUsecase(repo)
        const findall = new FindAllProductsUsecase(repo)

        const facade = new StoreCatalogFacade({
            find: find,
            findAll: findall
        })

        return facade
    }
}