import { useState } from "react";
import { PizzaData } from "../../home/PizzaData";
import "./SelectSize.css";
import { Link } from "react-router-dom";
export default function SelectSize() {

    const [pizzaSize, setPizzaSize] = useState<number>(NaN);


    return (
        <>
            <section className='section'>
                <div className='size-content'>
                    <h1 className="select-size-title">Select A Size 📏</h1>
                    {
                        PizzaData.sizes.map(size => {
                            return (
                                size.id === pizzaSize ?
                                    <div className='size-item active' key={size.id} onClick={() => setPizzaSize(size.id)}>
                                        <h4>{size.name}</h4>
                                        <p>₹ {size.price}</p>
                                    </div>
                                    :
                                    (<div className='size-item' key={size.id} onClick={() => setPizzaSize(size.id)}>
                                        <h4>{size.name}</h4>
                                        <p>₹ {size.price}</p>
                                    </div>)
                            )

                        })
                    }
                </div>
                <div className="section-options">
                    <Link to={'/select-ingredients'} className='section-continue-button'>Continue</Link>
                </div>
            </section>
        </>
    )
}   