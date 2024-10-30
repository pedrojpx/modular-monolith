export interface FindAllProductsInputDTO {}

type ProductsDTO = {
    id: string,
    name: string,
    description: string,
    salesPrice: number
}

export interface FindAllProductsOutputDTO {
    products: ProductsDTO[]
}