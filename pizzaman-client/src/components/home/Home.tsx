import { useState } from 'react';
import './Home.css'
import { Link } from 'react-router-dom'
import { PizzaData } from './PizzaData';

export default function Home() {

    const [pizzaSize, setPizzaSize] = useState<number>(NaN);

    return (
        <div className="home section">
            <div className="section-content">
                <h1 className='section-title'>Customize You Pizza 🍕</h1>
                <p className='section-subtitle'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima sint deserunt omnis molestias, atque, libero labore modi vitae iusto nemo ea, sit distinctio excepturi nulla repudiandae ad delectus alias aperiam asperiores commodi officia blanditiis tempora facere? Ullam, iusto. Modi, reprehenderit!
                </p>
            </div>
            <div className="section-options">
                <Link to={'/select-size'} className='section-continue-button'>Continue</Link>
            </div>
        </div>
    );
}