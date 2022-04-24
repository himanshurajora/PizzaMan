import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CartService } from "../cart/cart.service";
import { OrderItem, Orders } from "./order.model";

@Injectable()
export class OrderService {
    constructor(@InjectModel(Orders) private readonly orderModule: typeof Orders, @InjectModel(OrderItem) private readonly orderItemModule: typeof OrderItem, private readonly cartService: CartService) { }

    // To fetch all order items by user id
    async getOrderById(userId: number) {
        return await this.orderModule.findAll<Orders>({ where: { userId: userId }, include: [{ model: OrderItem }] });
    }
    

    // To add order item to order
    async addOrderItem(order, userId) {
        const res = await this.orderModule.create<Orders>({ ...order, userId });

        const orderItem = await order.orderItem.map(item => ({
            "ingredientId": item.ingredientId,
            "orderId": res.id,
        }))

        orderItem.forEach(async (item) => {
            return await this.orderItemModule.create<OrderItem>(item);
        })
        const CartId = this.cartService.getCartIdBYUserId(userId);
        await this.cartService.removeCartItemByUserId((await CartId).map( Item => Item.id))
        await this.cartService.removeByUserId(userId)
        return res;
    }
}