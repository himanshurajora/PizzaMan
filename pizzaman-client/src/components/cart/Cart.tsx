import { ICartProps } from "../../interfaces";

export default function Cart(props: ICartProps) {
    return (
        <>
            <section className="cart-section">
                <div className="cart-content">
                    <h1 className="cart-title">Your Cart</h1>
                    <div className="cart-item">
                        {
                            props.cartItems.map(item => {
                                return (
                                    <>
                                        <h4>
                                            {item.size.name}
                                            - ₹ {item.size.price}
                                        </h4>
                                    </>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
        </>
    )
}