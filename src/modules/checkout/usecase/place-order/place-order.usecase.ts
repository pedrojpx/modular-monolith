import UseCaseInterface from "../../../@shared/domain/usecase/use-case.interface";
import Id from "../../../@shared/domain/value-object/id.value-object";
import { ClientFacadeInterface } from "../../../client-adm/facade/client-adm.facade.interface";
import { InvoiceFacadeInterface } from "../../../invoice/facade/invoice.facade.interface";
import PaymentFacadeInterface from "../../../payment/facade/facade.interface";
import ProductAdmFacadeInterface from "../../../product-adm/facade/product-adm.facade.interface";
import StoreCatalogFacadeInterface from "../../../store-catalog/facade/store-catalog.facade.interface";
import Client from "../../domain/client.entity";
import Order from "../../domain/order.entity";
import Product from "../../domain/product.entity";
import CheckoutGateway from "../../gateway/checkout.gateway";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "./place-order.dto";

export default class PlaceOrderUseCase implements UseCaseInterface {

    constructor(
        private _clientFacade: ClientFacadeInterface,
        private _productFacade: ProductAdmFacadeInterface,
        private _catalogFacade: StoreCatalogFacadeInterface,
        private _repo: CheckoutGateway,
        private _invoiceFacade: InvoiceFacadeInterface,
        private _paymentFacade: PaymentFacadeInterface
    ) {}

    async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {
        //buscar o cliente. Caso não enconre -> client not found
        const client = await this._clientFacade.find({id: input.clientId})
        if (!client) {
            throw new Error("Client not found");
        }
      
        //validar o produto
        await this.validateProducts(input)
        
        //recuperar os produtos
        const products = await Promise.all(
            input.products.map(p => this.getProduct(p.productId))
        )

        //criar o objeto do client
        const myClient = new Client({
            id: new Id(client.id),
            name: client.name,
            email: client.email,
            address: client.address
        })

        //criar o objeto da order (client, products)
        const order = new Order({
            client: myClient,
            products: products,
        })

        //processpayment -> paymentfacade.process(order, amount)
        const payment = await this._paymentFacade.process({orderId: order.id.id, amount: order.total})

        //caso seja aprovado -> gerar invoice
        const invoice = 
            payment.status === "approved" ?
                await this._invoiceFacade.generate({
                    name: client.name,
                    document: client.name,
                    street: `street of ${client.address}`,
                    city: `city of ${client.address}`,
                    number: `number of ${client.address}`,
                    complement: `complement of ${client.address}`,
                    zipCode: `zipCode of ${client.address}`,
                    state: `state of ${client.address}`,
                    items: products.map((p) => {
                        return {
                            id: p.id.id,
                            name: p.name,
                            price: p.salesPrice
                        }
                    })
                }) : null
        
        //mudar o status da minha order para approved
        payment.status === "approved" && order.approved()
        this._repo.addOrder(order)

        //retornar dto
        return {
            id: order.id.id,
            invoiceId: payment.status === "approved" ? invoice.id : null,
            status: order.status,
            total: order.total,
            products: order.products.map(p => {
                return {
                    productId: p.id.id
                }
            }),
        }
    }

    private async validateProducts(input: PlaceOrderInputDto): Promise<void> {
        if (input.products.length === 0) {
            throw new Error("No products selected")
        }

        for( const p of input.products) {
            const product = await this._productFacade.checkStock({
                productId: p.productId
            })

            if(product.stock <= 0) {
                throw new Error(`Product ${product.productId} is not available in stock`)
            }
        }
    }

    private async getProduct(id: string): Promise<Product> {
        const p = await this._catalogFacade.find({id: id})
        if (!p) {
            throw new Error("Product not found")
        }

        const props = {
            id: new Id(p.id),
            name: p.name,
            description: p.description,
            salesPrice: p.salesPrice,
        }

        return new Product(props)
    }
}