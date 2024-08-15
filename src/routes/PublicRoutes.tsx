import { Navigate, Route, Routes } from "react-router-dom"
import { Login } from "../pages/public/Login";
import { routesProps } from "../interfaces/routes/routes.interfaces";

const routes: routesProps[] = [
    {
        path: "/login",
        element: <Login />
    },
]

export const PublicRoutes = () => {
    return (
        <Routes>
            {
                routes.map( (route, index) => (
                    <Route key={ index } path={ route.path } element={ route.element }  />
                ))
            }
            <Route path="/" element={ <Navigate to="/login" /> } />
        </Routes>
    )
}
