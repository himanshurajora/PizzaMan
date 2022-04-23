import { IsNotEmpty } from 'class-validator'

// CartItem interfaces with validators

export class CartItemsPrams {

    @IsNotEmpty()
    readonly cartId: number;

    @IsNotEmpty()
    readonly ingredientId: number;
}