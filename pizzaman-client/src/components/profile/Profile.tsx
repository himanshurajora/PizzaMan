import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { IOrderData } from "../../interfaces";
import * as axios from 'axios';
import { useLocation } from "react-router-dom";
import "./Profile.css"
import { ServerConfig } from "../../config/server.config";
import { PizzaData } from "../home/PizzaData";

const sizeInitialState = {
    id: NaN,
    name: '',
    price: NaN
  }
  
export default function Profile() {
    const authContext = useAuth()
    var [orderItems, setOrderItems] = useState<IOrderData[]>([])
    const location = useLocation()
    useEffect(() => {
        console.log("called")
        orderItems = []
        if (authContext.loggedIn && authContext.token) {
            // fetch cartItems from api
            axios.default.get(`${ServerConfig.development.url}/orders`, { headers: { 'Authorization': `Bearer ${authContext.token}` } }).then((response) => {
                response.data.forEach((item: any) => {
                    var order: IOrderData = { size: { ...sizeInitialState }, ingredients: [] }
                    // set size properties
                    order.size.id = item.id;

                    // set ingredient properties
                    item.OrderItem.forEach((orderItem: any) => {
                        let ingredient: any = {}
                        ingredient.id = orderItem.ingredientId;
                        ingredient.name = orderItem.ingredient.name;
                        ingredient.price = orderItem.ingredient.price;

                        order.ingredients.push(ingredient)
                    })

                    order.size.price = item.price - order.ingredients.reduce((a, b) => { return a + b.price }, 0)
                    order.size.name = PizzaData.sizes.filter((value) => { return value.price === order.size.price })[0].name
                    orderItems.push(order)
                    setOrderItems([...orderItems])
                })
            })
        }
    }, [authContext.loggedIn, authContext.token, location])

    return (
        <>
            <section className="profile-section">
                <div className="profile-content">
                    <h1 className="profile-title">Your Orders</h1>
                    {
                        orderItems.length ?
                            orderItems.map((item, index) => {
                                return (
                                    <>
                                        <div className="profile-item">
                                            <div className="profile-item-row">
                                                <div className="profile-item-type">
                                                    <h3>Type</h3>
                                                </div>
                                                <div className="profile-item-name">
                                                    <h3>Name</h3>
                                                </div>
                                                <div className="profile-item-price">
                                                    <h3>Price</h3>
                                                </div>
                                            </div>
                                            <div className="profile-item-row">
                                                <div className="profile-item-type">
                                                    Size
                                                </div>
                                                <div className="profile-item-name">
                                                    {item.size.name}
                                                </div>
                                                <div className="profile-item-price">
                                                    ₹ {item.size.price}
                                                </div>
                                            </div>
                                            {
                                                item.ingredients.map(ingredient => {
                                                    return (
                                                        <div className="profile-item-row">
                                                            <div className="profile-item-type">
                                                                Ingredient
                                                            </div>
                                                            <div className="profile-item-name">
                                                                {ingredient.name}
                                                            </div>
                                                            <div className="profile-item-price">
                                                                ₹ {ingredient.price}
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                            <div className="profile-item-total">
                                                Total: ₹ {
                                                    item.size.price + item.ingredients.reduce((acc, curr) => {
                                                        return acc + curr.price
                                                    }, 0)
                                                }
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                            :

                            <div className="profile-title">
                                No Orders yet
                            </div>
                    }
                </div>

            </section>
        </>
    )
}