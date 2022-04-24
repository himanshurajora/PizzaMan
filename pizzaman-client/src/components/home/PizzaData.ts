import { IPizzaIngredient } from "../../interfaces";

export declare interface PizzaItem{
    id: number
    name: string;
    price: number;
}

export declare interface PizzaData {
    sizes : PizzaItem[];
    crusts : PizzaItem[];
    toppings : IPizzaIngredient[];
}

export const PizzaData : PizzaData = {
    sizes: [
        {id: 1, name: 'Small - LightWeight', price: 120},
        {id: 2, name: 'Medium - Best Deal', price: 150},
        {id: 3, name: 'Large - Heavy Meal', price: 300}
    ],
    crusts: [
        {id: 1, name: 'Thin', price: 10},
        {id: 2, name: 'Thick', price: 40}
    ],
    toppings: [
        {id: 1, name: 'Cheese', price: 10},
        {id: 2, name: 'Pepperoni', price: 20},
        {id: 3, name: 'Mushroom', price: 30},
        {id: 4, name: 'Onion', price: 20},
        {id: 5, name: 'Sausage', price: 30},
        {id: 6, name: 'Pineapple', price: 20},
        {id: 7, name: 'Ham', price: 30},
        {id: 8, name: 'Chicken', price: 20},
        {id: 9, name: 'Bacon', price: 30},
        {id: 10, name: 'Spinach', price: 20},
        {id: 11, name: 'Tomato', price: 30},
        {id: 12, name: 'Olives', price: 20},
        {id: 13, name: 'Anchovies', price: 30},
        {id: 14, name: 'Artichoke', price: 20},
        {id: 15, name: 'Eggplant', price: 30},
        {id: 16, name: 'Zucchini', price: 20},
    ]
}