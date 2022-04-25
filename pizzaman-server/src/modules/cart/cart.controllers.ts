import { Body, Controller, Get, Param, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CartService } from "./cart.service";


@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) { }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getCartById(@Request() req) {
        return await this.cartService.getCartById(req.user.sub);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async addToCart(@Body() data, @Request() req){
        return await this.cartService.addCartItem(data, req.user.sub);
    }
}