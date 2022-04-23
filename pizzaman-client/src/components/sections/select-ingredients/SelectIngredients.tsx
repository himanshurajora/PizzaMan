import { useState } from "react"
import { PizzaData } from "../../home/PizzaData"
import "./SelectIngredients.css"
import { Link } from "react-router-dom"
export default function SelectIngredients(){
    const [ingredients, setIngredients] = useState([])
    const ingredientsData = PizzaData.toppings;
    return(
        <section className='section'>
        <div className='section-content'>
            <h1 className="select-size-title">Select Ingredients</h1>
            <p style={{textAlign: "center"}}>🧆🥓🍅🥕</p>
            {
              ingredientsData.map(ingredient => {
                return(
                  <div className='ingredient-container' key={ingredient.id}>
                    <input type='checkbox' id={ingredient.id.toString()} className='ingredient-checkbox'/>
                    <label htmlFor={ingredient.id.toString()} className='ingredient-label'>&nbsp; {ingredient.name}</label>
                  </div>
                )
              })
            }
            <br />
        </div>
        <div className="section-options">
            <button className="section-continue-button">
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