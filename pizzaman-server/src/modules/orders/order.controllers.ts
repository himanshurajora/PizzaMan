import { Body, Controller, Get, Param, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { OrderService } from "./order.service";


@Controller('orders')
export class OrderController {
    constructor(private readonly OrderService: OrderService) { }

    @Get(':id')
    async getOrderById(@Param('id') id: number) {
        return await this.OrderService.getOrderById(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async makeOrder(@Body() data, @Request() req){
        return await this.OrderService.addOrderItem(data, req.user.sub);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getAllOrders(@Request() req){
        return await this.OrderService.getAllOrders(req.user.sub)
    }
}