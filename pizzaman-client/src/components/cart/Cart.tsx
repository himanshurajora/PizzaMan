import { ICartProps } from "../../interfaces";
import "./Cart.css"
export default function Cart(props: ICartProps) {

    const removeFromCart = (index: number) => {
        props.setCartItems(props.cartItems.filter((item, i) => i !== index));
    }

    return (
        <>
            <section className="cart-section">
                <div className="cart-content">
                    <h1 className="cart-title">Your Cart</h1>
                    {
                        props.cartItems.length ?
                            props.cartItems.map((item, index) => {
                                return (
                                    <>
                                        <div className="cart-item">
                                            <div className="cart-item-row">
                                                <div className="cart-item-type">
                                                    <h3>Type</h3>
                                                </div>
                                                <div className="cart-item-name">
                                                    <h3>Name</h3>
                                                </div>
                                                <div className="cart-item-price">
                                                    <h3>Price</h3>
                                                </div>
                                            </div>
                                            <div className="cart-item-row">
                                                <div className="cart-item-type">
                                                    Size
                                                </div>
                                                <div className="cart-item-name">
                                                    {item.size.name}
                                                </div>
                                                <div className="cart-item-price">
                                                    ₹ {item.size.price}
                                                </div>
                                            </div>
                                            {
                                                item.ingredients.map(ingredient => {
                                                    return (
                                                        <div className="cart-item-row">
                                                            <div className="cart-item-type">
                                                                Ingredient
                                                            </div>
                                                            <div className="cart-item-name">
                                                                {ingredient.name}
                                                            </div>
                                                            <div className="cart-item-price">
                                                                ₹ {ingredient.price}
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                            <div className="cart-item-total">
                                                Total: ₹ {
                                                    item.size.price + item.ingredients.reduce((acc, curr) => {
                                                        return acc + curr.price
                                                    }, 0)
                                                }
                                            </div>
                                            {/* Remove From Cart */}
                                            <div className="cart-item-remove">
                                                <button
                                                    className="cart-item-remove-btn"
                                                    onClick={() => removeFromCart(index)}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                            :

                            <div className="cart-title">
                                Your cart is empty 🛒
                            </div>
                    }
                </div>
                {
                    props.cartItems.length ?
                        <div className="cart-order-btn-container">
                            <button
                                className="cart-order-btn"
                            >
                                Place Your Order
                            </button>
                        </div>
                        :
                        null
                }
            </section>
        </>
    )
}