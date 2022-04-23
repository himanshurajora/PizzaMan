import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CartModule } from '../cart/cart.module';
import { OrderController } from './order.controllers';
import { OrderItem, Orders } from './order.model';
import { OrderService } from './order.service';

@Module({
    imports: [SequelizeModule.forFeature([Orders, OrderItem]), CartModule],
    controllers: [OrderController],
    providers: [OrderService],
    exports: [OrderService]
})
export class OrdersModule {}
