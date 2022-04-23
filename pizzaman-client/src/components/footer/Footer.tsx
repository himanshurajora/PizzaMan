import "./Footer.css"

export default function Footer(){
    return (
        <footer className='footer'>
            <div className='footer-content'>
                <h4>
                    Pizzaman ©️ No Copyrights Reserved 
                </h4>
                <div className="footer-links">
                    <ul>
                        <li><a href="">Cart</a></li>
                        <li><a href="">Profile</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}