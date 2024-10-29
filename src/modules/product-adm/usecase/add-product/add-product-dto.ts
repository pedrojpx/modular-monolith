import Id from "../../../@shared/domain/value-object/id.value-object"

export interface AddProductInputDTO {
    id?: string
    name: string
    description: string
    purchasePrice: number
    stock: number
}

export interface AddProductOutputDTO {
    id: string
    name: string
    description: string
    purchasePrice: number
    stock: number
    createdAt: Date
    updatedAt: Date
}

