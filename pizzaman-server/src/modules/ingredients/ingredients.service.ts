import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Ingredents } from "./ingredients.model";

@Injectable()
export class IngredientsService {
    constructor(@InjectModel(Ingredents) private readonly IngredientModel: typeof Ingredents ) { }

    // To fetch all ingredients
    async getAllIngredients(): Promise<Ingredents[]> {
        return await this.IngredientModel.findAll();
    }

    // To add new ingredient
    async addIngredient(newIngredient): Promise<Ingredents> {
        return await this.IngredientModel.create<Ingredents>(newIngredient);
    }

    async addManyIngredient(newIngredients): Promise<Ingredents[]>{
        var ingredients = []
        newIngredients.forEach(async (ingredient)=>{
            ingredients.push(await this.IngredientModel.create<Ingredents>(ingredient));
        })

        return ingredients
    }
}