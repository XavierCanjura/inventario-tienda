import { Navigate, Route, Routes } from "react-router-dom"
import { routes } from "../constants/privateRoutes";


export const PrivateRoutes = () => {
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
