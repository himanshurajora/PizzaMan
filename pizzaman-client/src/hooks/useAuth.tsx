import { useContext } from "react";
import { AuthContext } from "../auth/auth-context/auth.context";

export default function useAuth(){
    return useContext(AuthContext);
}
