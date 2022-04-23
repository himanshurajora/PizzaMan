import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Ingredents } from "../ingredients/ingredients.model";
import { User } from "../user/user.model";

@Table
export class Cart extends Model {
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
    userId: number;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    price: number;

    @HasMany(() => CartItems)
    cartItem: CartItems[];

    @BelongsTo(() => User)
    user: User
}

@Table
export class CartItems extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;

    @ForeignKey(() => Ingredents)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    ingredientId: number;

    @ForeignKey(() => Cart)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    cartId: number;

    @BelongsTo(() => Cart)
    cart: Cart

    @BelongsTo(() => Ingredents)
    ingredient: Ingredents
}