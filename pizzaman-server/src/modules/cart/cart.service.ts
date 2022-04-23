import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Op } from "sequelize";
import { Cart, CartItems } from "./cart.model";

@Injectable()
export class CartService {
    constructor(@InjectModel(Cart) private readonly cartModule: typeof Cart, @InjectModel(CartItems) private readonly cartItemsModule: typeof CartItems) { }

    // To fetch all cart items by user id
    async getCartById(userId: number) {
        return await this.cartModule.findAll<Cart>({ where: { userId: userId }, include: [{ model: CartItems }] });
    }

    // To add cart item to cart
    async addCartItem(cart, userId) {
        const res = await this.cartModule.create<Cart>({ ...cart, userId });

        const cartItem = await cart.cartItem.map(item => ({
            "ingredientId": item.ingredientId,
            "cartId": res.id,
        }))
        console.log(cartItem)

        cartItem.forEach(async (item) => {
            return await this.cartItemsModule.create<CartItems>(item);
        })
        return res;
    }

    async getCartIdBYUserId(userId: number) {
        return await this.cartModule.findAll<Cart>({ attributes: ['id'], where: { userId: userId}});
    }

    async removeByUserId(userId) {
        return await this.cartModule.destroy<Cart>({ where: { userId: userId }});
    }

    async removeCartItemByUserId(cartId) {
        return await this.cartItemsModule.destroy<CartItems>({ where: { cartId: { [Op.or]: cartId } }})
    }
}