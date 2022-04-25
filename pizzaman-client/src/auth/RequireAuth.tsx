import useAuth from "../hooks/useAuth";
import { Navigate, useLocation, Outlet } from "react-router-dom";

export default function RequireAuth() {
    const authContext = useAuth();
    const location = useLocation();

    return (
        authContext.loggedIn ?
            <Outlet /> :
            <Navigate to={'/login'} state={{ from: location }} replace />
    )
}

