import "./Login.css"
import * as React from "react"
import { useNavigate } from "react-router-dom"
import { ServerConfig } from "../../config/server.config"

export default function Login(){

    const handleLogin = (e: any) => {
        e.preventDefault()
        
    }

    return (
        <div className="login-container">
            <div className="login-content">
                <h1 className="login-title">Login</h1>
                <form className="login-form">
                    <div className="login-form-row">
                        <input className="login-form-input" name="email" type="email" placeholder="Email" />
                    </div>
                    <div className="login-form-row">
                        <input className="login-form-input" name="password" type="password" placeholder="Password" />
                    </div>
                    <div className="login-form-row">
                        <button className="login-form-button"
                            onClick={handleLogin}
                        >Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}