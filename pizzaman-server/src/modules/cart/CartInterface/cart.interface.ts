import { IsNotEmpty, IsNumber } from "class-validator";

// Cart interfaces with validators

export class CartParams{
    @IsNotEmpty()
    @IsNumber()
    readonly price: number;
}
