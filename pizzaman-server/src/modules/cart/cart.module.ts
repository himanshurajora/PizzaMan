import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CartController } from './cart.controllers';
import { Cart, CartItems } from './cart.model';
import { CartService } from './cart.service';

@Module({
    imports: [SequelizeModule.forFeature([Cart, CartItems])],
    controllers: [CartController],
    providers: [CartService],
    exports: [CartService]
})
export class CartModule {}
