import { Navigate, Route, Routes } from "react-router-dom"
import { PublicRoutes } from "./PublicRoutes"
import { PrivateRoutes } from "./PrivateRoutes"

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/*" element={ <PublicRoutes /> } />
            <Route path="/dash/*" element={ <PrivateRoutes /> } />
            <Route path="/" element={ <Navigate to="/login" />}/>
        </Routes>
    )
}
