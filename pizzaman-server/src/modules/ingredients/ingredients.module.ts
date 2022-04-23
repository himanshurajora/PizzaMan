import { Global, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { IngredientsController } from './ingredients.controller';
import { Ingredents } from './ingredients.model';
import { IngredientsService } from './ingredients.service';

@Module({
    imports: [SequelizeModule.forFeature([Ingredents])],
    controllers: [IngredientsController],
    providers: [IngredientsService],
    exports: [IngredientsService]
})
export class IngredientsModule {}
