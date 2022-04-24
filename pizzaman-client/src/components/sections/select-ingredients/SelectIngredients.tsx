import { useState } from "react"
import { PizzaData } from "../../home/PizzaData"
import "./SelectIngredients.css"
import { Link } from "react-router-dom"
import { IPizzaIngredient, ISelectIngredientsProps } from "../../../interfaces"



export default function SelectIngredients(props: ISelectIngredientsProps) {


  const [ingredients, setIngredients] = useState<IPizzaIngredient[]>([])
  const ingredientsData = PizzaData.toppings;


  const handleAddIngredient = (id: number) => {
    // if not selected then add into array
    var index = ingredients.findIndex(ingredient => ingredient.id === id);

    // if element is not found in the array then add
    if (index === -1) {
      // extract the ingredient's data from the array
      var ingredient = ingredientsData.find(ingredient => ingredient.id === id);
      // add the ingredient to the array
      setIngredients([...ingredients!, ingredient!]);
      props.setOrderData({
        ...props.orderData,
        ingredients: [...props.orderData.ingredients, ingredient!]
      })
    }else{
      // remove the ingredient from the array
      setIngredients(ingredients.filter(ingredient => ingredient.id !== id));
      props.setOrderData({
        ...props.orderData,
        ingredients: props.orderData.ingredients.filter(ingredient => ingredient.id !== id)
      })
    }
  }

  return (
    <section className='section'>
      <div className='section-content'>
        <h1 className="select-size-title">Select Ingredients</h1>
        <p style={{ textAlign: "center" }}>🧆🥓🍅🥕</p>
        <div className="ingredient-container">
          {
            ingredientsData.map(ingredient => {
              return ingredients.findIndex(ingredientX => ingredientX.id === ingredient.id) !== -1 ?
                <div className='ingredient-item active' key={ingredient.id} onClick={() => handleAddIngredient(ingredient.id)}>
                  <h4>{ingredient.name}- ₹{ingredient.price}</h4>
                </div>
                :
                (<div className='ingredient-item' key={ingredient.id} onClick={() => handleAddIngredient(ingredient.id)}>
                  <h4>{ingredient.name}- ₹{ingredient.price}</h4>
                  <p></p>
                </div>)
            })
          }
        </div>
        <br />
      </div>
      <div className="section-options">
        <button onClick={() => { setIngredients([]); props.handleAddToCart() }} className="section-continue-button">
          Add To Cart 🛒
        </button>
        <br />
        <Link className="section-continue-button" to={'/select-size'}>
          Previous
        </Link>

      </div>
    </section>
  )
}