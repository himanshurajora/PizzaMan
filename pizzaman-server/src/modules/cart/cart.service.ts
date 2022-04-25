import { ForbiddenException, Injectable, NotAcceptableException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Op } from "sequelize";
import { Ingredents } from "../ingredients/ingredients.model";
import { Cart, CartItems } from "./cart.model";

@Injectable()
export class CartService {
    constructor(@InjectModel(Cart) private readonly cartModule: typeof Cart, @InjectModel(CartItems) private readonly cartItemsModule: typeof CartItems) { }

    // To fetch all cart items by user id
    async getCartById(userId: number) {
        return await this.cartModule.findAll<Cart>({ where: { userId: userId }, include: [{ model: CartItems, include: [Ingredents]}] });
    }

    // To add cart item to cart
    async addCartItem(cart, userId) {
        try {
            const res = await this.cartModule.create<Cart>({ ...cart, userId });

            const cartItem = await cart.cartItem.map(item => ({
                "ingredientId": item.ingredientId,
                "cartId": res.id,
            }))

            cartItem.forEach(async (item) => {
                try{
                    await this.cartItemsModule.create<CartItems>(item);
                }catch(err){
                    throw new NotFoundException(err, "Ingredient Not Found")
                }
            })
            return res;
        }catch(err){
            console.log(err)
            throw new ForbiddenException(err)
        }
    }

    async getCartIdBYUserId(userId: number) {
        return await this.cartModule.findAll<Cart>({ attributes: ['id'], where: { userId: userId } });
    }

    async removeByUserId(userId) {
        return await this.cartModule.destroy<Cart>({ where: { userId: userId } });
    }

    async removeCartItemByUserId(cartId) {
        return await this.cartItemsModule.destroy<CartItems>({ where: { cartId: { [Op.or]: cartId } } })
    }
}