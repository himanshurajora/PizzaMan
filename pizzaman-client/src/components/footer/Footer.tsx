import "./Footer.css"
import { Link } from "react-router-dom"
export default function Footer() {
    return (
        <footer className='footer'>
            <div className='footer-content'>
                <h4>
                    Pizzaman ©️ No Copyrights Reserved
                </h4>
                <div className="footer-links">
                    <ul>
                        <li>
                            <Link to={'/cart'}>
                                Cart
                            </Link>
                        </li>
                        <li>
                            <Link to={'/profile'}>
                                Profile
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}