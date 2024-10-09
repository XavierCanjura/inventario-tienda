import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom"
import { routes } from "../constants/privateRoutes";
import { sessionStore } from "../helpers/sessionStore";
import { useAuthStore } from "../hooks";


export const PrivateRoutes = () => {
    const { navigateToLogin } = useAuthStore();
    const { existSession } = sessionStore();


    useEffect(() => {
        if(!existSession('auth')) return navigateToLogin();
    });

    return (
        <Routes>
            {
                routes.map( (route, index) => (
                    <Route key={ index } path={ route.path } element={ route.element } />
                ))
            }
            <Route path="/" element={ <Navigate to="/dash/productos"/> } />
        </Routes>
    )
}
