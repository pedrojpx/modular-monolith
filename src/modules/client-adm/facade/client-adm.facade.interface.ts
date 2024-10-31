export interface AddClientFacadeInputDto {
    id?: string
    name: string
    email: string
    address: string
}

export interface FindClientFacadeInputDTO {
    id: string
}

export interface FindClientFacadeOutputDTO {
    id: string,
    name: string,
    email: string,
    address: string,
    createdAt: Date,
    updatedAt: Date
}

export interface ClientFacadeInterface {
    find(input: FindClientFacadeInputDTO): Promise<FindClientFacadeOutputDTO>
    add(input: AddClientFacadeInputDto): Promise<void>
}