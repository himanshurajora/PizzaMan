
import './Register.css';
import * as axios from 'axios';
import { ServerConfig } from '../../config/server.config';
import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom'
export default function Register() {

    const navigate = useNavigate();
    // register the user
    const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const registerParams = {
            firstName: formData.get('firstName') as string,
            lastName: formData.get('lastName') as string,
            email: formData.get('email') as string,
            password: formData.get('password') as string
        }
        try {
            await axios.default.post(`${ServerConfig.development.authUrl}/register`, registerParams);
            alert("User Created Successfully");
            navigate('/login');
        } catch (e: any) {
            alert(e.response.data.message + ' | email already registered | invalid email or parameters');
        }
    }

    return (
        <div className="register-container">
            <div className="register-content">
                <h1 className="register-title">Register</h1>
                <form className="register-form" onSubmit={handleRegister}>
                    <div className="register-form-row">
                        <input className="register-form-input" name="firstName" required type="text" placeholder="First Name" />
                    </div>
                    <div className="register-form-row">
                        <input className="register-form-input" name="lastName" type="text" required placeholder="Last Name" />
                    </div>
                    <div className="register-form-row">
                        <input className="register-form-input" name="email" type="email" required placeholder="Email" />
                    </div>
                    <div className="register-form-row">
                        <input className="register-form-input" name="password" type="password" required placeholder="Password" />
                    </div>
                    <div className="register-form-row">
                        <button className="register-form-button">Register</button>
                    </div>
                </form>
            </div>
        </div>
    )
}