import { IsNotEmpty, IsString, IsEmail, IsNumber } from "class-validator";

// Ingredients interfaces with validators

export class IngredientsParams{
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;
}
