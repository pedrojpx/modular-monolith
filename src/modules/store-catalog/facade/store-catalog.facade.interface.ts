export interface FindStoreCatalogFacadeInputDTO {
    id: string
}

export interface FindStoreCatalogFacadeOutputDTO {
    id: string,
    name: string,
    description: string,
    salesPrice: number
}

export interface FindAllStoreCatalogFacadeOutputDTO {
    products: {
        id: string,
        name: string,
        description: string,
        salesPrice: number
    }[]
}

export default interface StoreCatalogFacadeInterface {
    find(id: FindStoreCatalogFacadeInputDTO): Promise<FindStoreCatalogFacadeOutputDTO>
    findAll(): Promise<FindAllStoreCatalogFacadeOutputDTO>
}