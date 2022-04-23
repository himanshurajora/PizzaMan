import { Body, Controller, Get, Param, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CartService } from "./cart.service";


@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) { }

    @Get(':id')
    async getCartById(@Param('id') id: number) {
        return await this.cartService.getCartById(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async addToCart(@Body() data, @Request() req){
        return await this.cartService.addCartItem(data, req.user.sub);
    }
}