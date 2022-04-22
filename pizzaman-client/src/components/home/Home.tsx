import { useState } from 'react';
import './Home.css'
import { PizzaData } from './PizzaData';

export default function Home() {

    const [pizzaSize, setPizzaSize] = useState<number>(NaN);

    return (
        <div className="home">
            <h1>Customize You Pizza</h1>
            <section className='section-size'>
                <h3>Select A Size</h3>
                <div className="section-div">
                    <div className='size-container'>
                        {
                            PizzaData.sizes.map(size => {
                                return (
                                    size.id === pizzaSize ?
                                        <div className='size-item active' key={size.id} onClick={() => setPizzaSize(size.id)}>
                                            <h4>{size.name}</h4>
                                            <p>₹ {size.price}</p>
                                        </div>
                                        :
                                        <div className='size-item' key={size.id} onClick={() => setPizzaSize(size.id)}>
                                            <h4>{size.name}</h4>
                                            <p>₹ {size.price}</p>
                                        </div>
                                )

                            })
                        }
                    </div>
                </div>
            </section>
        </div>
    );
}