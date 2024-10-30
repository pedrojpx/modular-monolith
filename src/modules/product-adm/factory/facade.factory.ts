import ProductAdmFacade from "../facade/product-adm.facade";
import ProductRepository from "../repository/product.repository";
import AddProductUseCase from "../usecase/add-product/add-product.usecase";

export default class ProductAdmFacadeFactory {
    static create(): ProductAdmFacade {
        const repo = new ProductRepository()
        const addusecase = new AddProductUseCase(repo)
        const facade = new ProductAdmFacade({addUseCase: addusecase, checkStockUseCase: undefined})

        return facade
    }
}