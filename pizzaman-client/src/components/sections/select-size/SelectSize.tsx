import { useState } from "react";
import { PizzaData } from "../../home/PizzaData";
import "./SelectSize.css";
import { Link } from "react-router-dom";
import { IPizzaSize, ISelectProps } from "../../../interfaces";

export default function SelectSize(props: ISelectProps) {

    const [pizzaSize, setPizzaSize] = useState<IPizzaSize>({id: NaN, name: '', price: NaN});
    const sizes = PizzaData.sizes

    const handleSelectSize = (id : number, name: string, price: number) => {
        setPizzaSize({id, name, price});
        props.setOrderData({
            ...props.orderData,
            size: {id, name, price}
        })
    }

    return (
        <>
            <section className='section'>
                <div className='size-content'>
                    <h1 className="select-size-title">Select A Size 📏</h1>
                    {
                        sizes.map(size => {
                            return (
                                size.id === pizzaSize.id ?
                                    <div className='size-item active' key={size.id} onClick={()=>{handleSelectSize(size.id, size.name, size.price)}}>
                                        <h4>{size.name}</h4>
                                        <p>₹ {size.price}</p>
                                    </div>
                                    :
                                    (<div className='size-item' key={size.id} onClick={() => handleSelectSize(size.id, size.name, size.price)}>
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