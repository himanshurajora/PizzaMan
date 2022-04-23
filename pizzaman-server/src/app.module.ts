import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { IngredientsModule } from './modules/ingredients/ingredients.module';
import { CartModule } from './modules/cart/cart.module';
import { OrdersModule } from './modules/orders/orders.module';
import {SequelizeModule} from '@nestjs/sequelize'
import { User } from './modules/user/user.model';
import { Ingredents } from './modules/ingredients/ingredients.model';
import { Cart, CartItems } from './modules/cart/cart.model';
import { OrderItem, Orders } from './modules/orders/order.model';

@Module({
  imports: [
    AuthModule,
    UserModule, 
    IngredientsModule, 
    CartModule, 
    OrdersModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5425,
      username: 'postgres',
      password: 'postgres',
      database: 'pizzastore',
      models: [User, Ingredents, Cart, CartItems, Orders, OrderItem],
      autoLoadModels: true,
      synchronize: true,
      // sync: {force: true}
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
