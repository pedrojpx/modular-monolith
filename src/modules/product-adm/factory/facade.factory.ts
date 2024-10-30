import ProductAdmFacade from "../facade/product-adm.facade";
import ProductRepository from "../repository/product.repository";
import AddProductUseCase from "../usecase/add-product/add-product.usecase";
import CheckStockUseCase from "../usecase/check-stock/check-stock.usecase";

export default class ProductAdmFacadeFactory {
    static create(): ProductAdmFacade {
        const repo = new ProductRepository()
        const addusecase = new AddProductUseCase(repo)
        const checkstockusecase = new CheckStockUseCase(repo)
        const facade = new ProductAdmFacade({addUseCase: addusecase, checkStockUseCase: checkstockusecase})

        return facade
    }
}