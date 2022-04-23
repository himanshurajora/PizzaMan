import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Ingredents } from "../ingredients/ingredients.model";
import { User } from "../user/user.model";

@Table
export class Orders extends Model {

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId : number;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    price: number;

    @HasMany(() => OrderItem)
    OrderItem : OrderItem[];

    @BelongsTo(() => User)
    user: User;

}

@Table
export class OrderItem extends Model<OrderItem> {
    
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;

    @ForeignKey(() => Orders)
    @Column({ 
        type: DataType.INTEGER,
        allowNull: false,
    })
    orderId: number;

    @ForeignKey(() => Ingredents)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    ingredientId: number;

    @BelongsTo(() => Orders)
    order: Orders;
    
    @BelongsTo(() => Ingredents)
    ingredient: Ingredents;
}
