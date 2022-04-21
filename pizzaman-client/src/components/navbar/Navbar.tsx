import "./Navbar.css";
import { Link } from "react-router-dom";
import { useState } from "react";
export default function Navbar() {

    const [loggedIn, setLoggedIn] = useState(false)

    return (
        <>
            <nav className="navbar">
                <div className="navbar-menu">
                    <div className="right">
                        <ul className="navbar-list">
                            <li className="navbar-brand">
                                <Link to="/">PizzaMan</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="right">
                        <ul className="navbar-list">
                            <li>
                                <Link to="/cart" id="cart-link">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="white" className="navbar-icon" viewBox="0 0 512 512"><title>Cart</title><circle cx="176" cy="416" r="32" /><circle cx="400" cy="416" r="32" /><path d="M456.8 120.78a23.92 23.92 0 00-18.56-8.78H133.89l-6.13-34.78A16 16 0 00112 64H48a16 16 0 000 32h50.58l45.66 258.78A16 16 0 00160 368h256a16 16 0 000-32H173.42l-5.64-32h241.66A24.07 24.07 0 00433 284.71l28.8-144a24 24 0 00-5-19.93z" /></svg>
                                </Link>
                            </li>
                            <li>
                                {
                                    // check if user is logged in
                                    loggedIn ?
                                        <Link to="/login" id="login-link">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="navbar-icon"  viewBox="0 0 512 512"><title>Log In</title><path d="M392 80H232a56.06 56.06 0 00-56 56v104h153.37l-52.68-52.69a16 16 0 0122.62-22.62l80 80a16 16 0 010 22.62l-80 80a16 16 0 01-22.62-22.62L329.37 272H176v104c0 32.05 33.79 56 64 56h152a56.06 56.06 0 0056-56V136a56.06 56.06 0 00-56-56zM80 240a16 16 0 000 32h96v-32z" /></svg>
                                        </Link> 
                                            :
                                        <Link to="profile" id="profile-link">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="navbar-icon" viewBox="0 0 512 512"><title>Person Circle</title><path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm-50.22 116.82C218.45 151.39 236.28 144 256 144s37.39 7.44 50.11 20.94c12.89 13.68 19.16 32.06 17.68 51.82C320.83 256 290.43 288 256 288s-64.89-32-67.79-71.25c-1.47-19.92 4.79-38.36 17.57-51.93zM256 432a175.49 175.49 0 01-126-53.22 122.91 122.91 0 0135.14-33.44C190.63 329 222.89 320 256 320s65.37 9 90.83 25.34A122.87 122.87 0 01382 378.78 175.45 175.45 0 01256 432z" /></svg>
                                        </Link>
                                }
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}