import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

type TransactionProps = {
    id ?: Id
    amount: number
    orderId: string
    status ?: string
    createdAt?: Date
    updatedAt?: Date
}

export default class Transaction extends BaseEntity implements AggregateRoot {
    private _amount: number
    private _orderId: string
    private _status: string

    constructor(p: TransactionProps) {
        super(p.id, p.createdAt, p.updatedAt)
        this._amount = p.amount
        this._status = p.status || "pending"
        this._orderId = p.orderId 
    }

    validate(): void {
        if (this._amount <= 0) {
            throw new Error("Amount must be greater than 0")
        }
    }

    approve(): void {
        this._status = "approved"
    }

    decline(): void {
        this._status = "declined"
    }

    process(): void {
        if (this._amount >= 100) { //just an operation simulating a payment processing criteria
            this.approve()
        } else {
            this.decline()
        }
    }

    get amount(): number {
        return this._amount
    }

    get orderId(): string {
        return this._orderId
    }

    get status(): string {
        return this._status
    }
}