import { BelongsTo, Column, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import InvoiceItem from "../domain/entity/InvoiceItem.entity";
import { InvoiceItemModel } from "./invoice-item.model";

@Table({
    tableName: 'invoice',
    timestamps: false
})
export class InvoiceModel extends Model {
    @PrimaryKey
    @Column({allowNull: false})
    id: string

    @Column({allowNull: false})
    name: string;

    @Column({allowNull: false})
    document: string;
    
    @HasMany(() => InvoiceItemModel)
    items: InvoiceItem[];

    //fields from address:
    @Column({allowNull: false})
    street: string;

    @Column({allowNull: false})
    number: string;

    @Column({allowNull: false})
    complement: string;

    @Column({allowNull: false})
    city: string;

    @Column({allowNull: false})
    state: string;

    @Column({allowNull: false})
    zipCode: string;
    //--------------------

    @Column({allowNull: false})
    createdAt: Date;

    @Column({allowNull: false})
    updatedAt: Date;
    
}