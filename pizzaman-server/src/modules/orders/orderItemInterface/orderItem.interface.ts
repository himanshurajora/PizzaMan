import { IsNotEmpty } from 'class-validator'

export class OrderItemParms {

    @IsNotEmpty()
    readonly OrderId: number;

    @IsNotEmpty()
    readonly IngredientId: number;
}