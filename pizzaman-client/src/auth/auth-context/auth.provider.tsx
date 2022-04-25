import { useEffect, useState } from "react";
import { AuthContext } from "./auth.context";
import * as axios from 'axios'
import { ServerConfig } from "../../config/server.config";
// auth context provider
export const AuthContextProvider = (props: any) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [token, setToken] = useState("");

    // validate the token on load
    useEffect(() => {
        const TOKEN = localStorage.getItem('token');
        if(TOKEN){
            axios.default.post(`${ServerConfig.development.authUrl}/validate`, {
                token: TOKEN
            }).then((response) => {
                if(response.data.validate){
                    setLoggedIn(true)
                    setToken(TOKEN)
                }
            })
        }else{
            setLoggedIn(false)
            setToken("")
        }
    }, [])

    const updateLogin = (loggedInValue: boolean, tokenValue: string) => {
        setLoggedIn(loggedInValue);
        setToken(tokenValue);
    }

    return (
        <AuthContext.Provider value={{ loggedIn, token, updateLogin }}>
            {props.children}
        </AuthContext.Provider>
    );
};