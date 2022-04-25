import { Body, Controller, Get, Post } from "@nestjs/common";
import { IngredientsService } from "./ingredients.service";
import { IngredientsParams } from "./IngredientsInterface/ingredients.interface";


@Controller('ingredients')
export class IngredientsController {

    constructor(private readonly ingredientsService: IngredientsService) { }

    @Get()
    async getIngredients() {
        return await this.ingredientsService.getAllIngredients();
    }

    @Post()
    async addIngredient(@Body() newIngredient: IngredientsParams) {
        return await this.ingredientsService.addIngredient(newIngredient);
    }

    @Post('multi-ingredients')
    async addManyIngredients(@Body() newIngredients: IngredientsParams[]){
        return await this.ingredientsService.addManyIngredient(newIngredients)
    }
}