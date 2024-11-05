import { UpdatedAt } from "sequelize-typescript"
import Id from "../../../@shared/domain/value-object/id.value-object"
import Product from "../../domain/product.entity"
import { PlaceOrderInputDto } from "./place-order.dto"
import PlaceOrderUseCase from "./place-order.usecase"
import generate from "@babel/generator"
import { find } from "lodash"

const mockDate = new Date(2000,1,1)

describe("unit test for PlaceOrderUseCase", () => {
    describe("validateProducts method", () => {
        //@ts-expect-error - no params in constructor
        const usecase = new PlaceOrderUseCase()

        it("should throw error if no products are selected", async() => {
            const input: PlaceOrderInputDto = {clientId: "0", products: []}

            await expect(usecase["validateProducts"](input)).rejects.toThrow(new Error("No products selected"))
        })

        it("should throw error if when product is out of stock", async() => {
            const mockProductFacade = {
                checkStock: jest.fn(({productId}: {productId: string}) => Promise.resolve({productId, stock: productId === "1" ? 0 : 1}))
            }

            //@ts-expect-error - force set productFacade
            usecase["_productFacade"] = mockProductFacade

            let input: PlaceOrderInputDto = {
                clientId: "0",
                products: [{ productId: "1"}]
            }

            await expect(usecase["validateProducts"](input)).rejects.toThrow(new Error("Product 1 is not available in stock"))
            
            input = {clientId: "0", products: [{productId: "0"}, {productId: "1"}]}
            await expect(usecase["validateProducts"](input)).rejects.toThrow(new Error("Product 1 is not available in stock"))
            await expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(3)
            
            input = {clientId: "0", products: [{productId: "0"}, {productId: "1"}, {productId: "2"}]}
            await expect(usecase["validateProducts"](input)).rejects.toThrow(new Error("Product 1 is not available in stock"))
            await expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(5)
        })
    })

    describe("getProducts method", () => {
        beforeAll(() => {
            jest.useFakeTimers("modern")
            jest.setSystemTime(mockDate)
        })

        afterAll(() => {
            jest.useRealTimers()
        })

        //@ts-expect-error - no params in constructor
        const usecase = new PlaceOrderUseCase()

        it("should throw an error when product not found", async () => {
            const mockCatalogFacade = {
                find: jest.fn().mockResolvedValue(null)
            }
            
            //@ts-expect-error - force set catalogFacade
            usecase["_catalogFacade"] = mockCatalogFacade
            
            await expect(usecase["getProduct"]("0")).rejects.toThrow(new Error("Product not found"))
        })
        
        it("should return a product", async () => {
            const mockCatalogFacade = {
                find: jest.fn().mockResolvedValue({id: "0", name: "Product 0", description: "description", salesPrice: 0})
            }
            
            //@ts-expect-error - force set catalogFacade
            usecase["_catalogFacade"] = mockCatalogFacade
            
            await expect(usecase["getProduct"]("0")).resolves.toEqual(new Product({id: new Id("0"), name: "Product 0", description: "description", salesPrice: 0}))
            expect(mockCatalogFacade.find).toHaveBeenCalledTimes(1)

        })

    })
    
    describe("execute method", () => {
        it("should throw an error when client not found", async() => {
            const mockClientFacade = {
                find: jest.fn().mockResolvedValue(null)
            }

            //@ts-expect-error - no params in constructor
            const usecase = new PlaceOrderUseCase()
            //@ts-expect-error - force set clientFacade
            usecase["_clientFacade"] = mockClientFacade
            
            const input: PlaceOrderInputDto = { clientId: "0", products: []}
            
            await expect(usecase.execute(input)).rejects.toThrow(new Error("Client not found"))
        })
        
        it("should throw an error when products are not valid", async() => {
            const mockClientFacade = {
                find: jest.fn().mockResolvedValue(true)
            }

            //@ts-expect-error - no params in constructor
            const usecase = new PlaceOrderUseCase()
            
            const mockValidateProducts = jest
            //@ts-expect-error - spy on private method
            .spyOn(usecase, "validateProducts")
            //@ts-expect-error - not return never
            .mockRejectedValue(new Error("No products selected"))
            
            //@ts-expect-error - force set clientFacade
            usecase["_clientFacade"] = mockClientFacade
            const input: PlaceOrderInputDto = { clientId: "1", products: []}
            
            await expect(usecase.execute(input)).rejects.toThrow(new Error("No products selected"))
            expect(mockValidateProducts).toHaveBeenCalledTimes(1)
        })
    })

    describe("place an order", () => {
        beforeAll(() => {
            jest.useFakeTimers("modern")
            jest.setSystemTime(mockDate)
        })

        afterAll(() => {
            jest.useRealTimers()
        })

        const clientProps = {
            id: "1c",
            name: "name1",
            document: "document1",
            email: "email1",
            street: "street1",
            number: "number1",
            complement: "complement1",
            city: "city1",
            state: "state1",
            zipCode: "zipCode1",
            address: "client-address-but-in-a-single-string"
        }

        const mockClientFacade = { find: jest.fn().mockResolvedValue(clientProps), add: jest.fn() }
        const mockPaymentFacade = { process: jest.fn() }
        const mockCheckoutRepo = { addOrder: jest.fn(), findOrder: jest.fn() }
        const mockInvoiceFacade = { generate: jest.fn().mockResolvedValue({id: "1i"}), find: jest.fn() }

        const usecase = new PlaceOrderUseCase(mockClientFacade, null, null, mockCheckoutRepo, mockInvoiceFacade, mockPaymentFacade)

        const products = {
            "1": new Product({id: new Id("1"), name: "product 1", description: "description", salesPrice: 40}),
            "2": new Product({id: new Id("2"), name: "product 2", description: "description", salesPrice: 30}),
        }

        const mockValidateProducts = jest
            //@ts-expect-error - spy on private method
            .spyOn(usecase, "validateProducts")
            //@ts-expect-error - spy on private method
            .mockResolvedValue(null)

        const mockGetProduct = jest
            //@ts-expect-error - spy on private method
            .spyOn(usecase, "getProduct")
            //@ts-expect-error - not return never
            .mockImplementation((productId: keyof typeof products) => {
                return products[productId]
            })

        it("should not be approved", async () => {
            mockPaymentFacade.process = mockPaymentFacade.process.mockReturnValue({
                trasactionId: "1t",
                orderId: "1o",
                amount: 100,
                status: "error",
                createdAt: new Date(),
                UpdatedAt: new Date()
            })

            const input: PlaceOrderInputDto = {
                clientId: "1c",
                products: [{productId: "1"}, {productId: "2"}]
            }

            let output = await usecase.execute(input)

            expect(output.invoiceId).toBeNull()
            expect(output.total).toBe(70)
            expect(output.products).toStrictEqual([{productId: "1"}, {productId: "2"}])
            expect(mockClientFacade.find).toHaveBeenCalledTimes(1)
            expect(mockClientFacade.find).toHaveBeenCalledWith({id: "1c"})
            expect(mockValidateProducts).toHaveBeenCalledTimes(1)
            expect(mockValidateProducts).toHaveBeenCalledWith(input)
            expect(mockGetProduct).toHaveBeenCalledTimes(2)
            expect(mockCheckoutRepo.addOrder).toHaveBeenCalledTimes(1)
            expect(mockPaymentFacade.process).toHaveBeenCalledTimes(1)
            expect(mockPaymentFacade.process).toHaveBeenCalledWith({
                orderId: output.id,
                amount: output.total
            })
            expect(mockInvoiceFacade.generate).toHaveBeenCalledTimes(0)
        })

        it("should be approved", async () => {
            mockPaymentFacade.process = mockPaymentFacade.process.mockReturnValue({
                trasactionId: "1t",
                orderId: "1o",
                amount: 100,
                status: "approved",
                createdAt: new Date(),
                UpdatedAt: new Date()
            })

            const input: PlaceOrderInputDto = {
                clientId: "1c",
                products: [{productId: "1"}, {productId: "2"}]
            }

            let output = await usecase.execute(input)

            expect(output.invoiceId).toBe("1i")
            expect(output.total).toBe(70)
            expect(output.products).toStrictEqual([{productId: "1"}, {productId: "2"}])
            expect(mockClientFacade.find).toHaveBeenCalledTimes(1)
            expect(mockClientFacade.find).toHaveBeenCalledWith({id: "1c"})
            expect(mockValidateProducts).toHaveBeenCalledTimes(1)
            expect(mockGetProduct).toHaveBeenCalledTimes(2)
            expect(mockCheckoutRepo.addOrder).toHaveBeenCalledTimes(1)
            expect(mockPaymentFacade.process).toHaveBeenCalledTimes(1)
            expect(mockPaymentFacade.process).toHaveBeenCalledWith({
                orderId: output.id,
                amount: output.total
            })
            expect(mockInvoiceFacade.generate).toHaveBeenCalledTimes(1)
            expect(mockInvoiceFacade.generate).toHaveBeenCalledWith({
                name: "name1",
                document: "name1",
                street: `street of ${clientProps.address}`,
                city: `city of ${clientProps.address}`,
                number: `number of ${clientProps.address}`,
                complement: `complement of ${clientProps.address}`,
                zipCode: `zipCode of ${clientProps.address}`,
                state: `state of ${clientProps.address}`,
                items: [
                    {
                        id: products["1"].id.id,
                        name: products["1"].name,
                        price: products["1"].salesPrice
                    },
                    {
                        id: products["2"].id.id,
                        name: products["2"].name,
                        price: products["2"].salesPrice
                    },
                ]
            })
        })
    })
})