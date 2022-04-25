import "./Login.css"
import { useNavigate, useLocation, Link} from "react-router-dom"
import { ServerConfig } from "../../config/server.config"
import * as axios from 'axios'
import useAuth from "../../hooks/useAuth"
import { useEffect } from "react"
export default function Login(){
    const navigate = useNavigate();
    const authContext = useAuth();
    const location = useLocation();
    useEffect(() => {
        if(authContext.loggedIn){
            navigate((location.state as any)?.from || "/")
        }
    }, [authContext.loggedIn])

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form)
        const loginParams = {
            email: formData.get('email') as string,
            password: formData.get('password') as string
        }
        const response = await axios.default.post(`${ServerConfig.development.authUrl}/login`, loginParams);
        localStorage.setItem('token', response.data.accessToken);
        authContext.updateLogin(true, response.data.accessToken);
        console.log(location)
        navigate((location.state as any)?.from?.pathname, {replace: true});
    }

    return (
        <div className="login-container">
            <div className="login-content">
                <h1 className="login-title">Login</h1>
                <form className="login-form" onSubmit={handleLogin}>
                    <div className="login-form-row">
                        <input className="login-form-input" name="email" type="email" placeholder="Email" />
                    </div>
                    <div className="login-form-row">
                        <input className="login-form-input" name="password" type="password" placeholder="Password" />
                    </div>
                    <div className="login-form-row">
                        <button className="login-form-button"
                        >Login</button>
                    </div>
                </form>
            <Link to={'/register'} >Register</Link>
            </div>
        </div>
    )
}