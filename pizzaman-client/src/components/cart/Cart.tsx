import { ICartProps } from "../../interfaces";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./Cart.css"
import * as axios from "axios";
import { ServerConfig } from "../../config/server.config";
export default function Cart(props: ICartProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const authContext = useAuth();
    const removeFromCart = (index: number) => {
        props.setCartItems(props.cartItems.filter((item, i) => i !== index));
    }

    const handleOrder = async () => {
        if (!authContext.loggedIn) {
            navigate('/login', {
                state: {
                    from: location
                },
                replace: false
            })
        } else {
            try {
                const price = props.cartItems[0].size.price + props.cartItems[0].ingredients.map((item) => item.price).reduce((a, b) => a + b, 0);
                const ingredients = props.cartItems[0].ingredients.map((item) => { return { ingredientId: item.id } })
                console.log(price, ingredients)

                const response = await axios.default.post(`${ServerConfig.development.url}/orders`, {
                    price, orderItem: ingredients
                }, {
                    headers: {
                        'Authorization': `Bearer ${authContext.token}`
                    }
                })

                alert("Purchased Successfully")
                props.setCartItems([...props.cartItems.splice(1)])
            } catch (err) {
                alert("Some Error Occured");
            }
        }
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
                                onClick={handleOrder}
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