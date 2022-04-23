import { IsNotEmpty } from 'class-validator'

export class OrdersParms {

    @IsNotEmpty()
    readonly price: number;
}