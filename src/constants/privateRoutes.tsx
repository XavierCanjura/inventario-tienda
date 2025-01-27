import { routesProps } from "../interfaces/routes/routes.interfaces";
import { Products, Marcas, Ventas, Statistics } from "../pages/admin";

export const routes: routesProps[] = [
    {
        path: "productos",
        label: "Productos",
        element: <Products />
    },
    {
        path: "marcas",
        label: "Marcas",
        element: <Marcas />
    },
    // {
    //     path: "usuarios",
    //     label: "Usuarios",
    //     element: <Usuarios />
    // },
    {
        path: "ventas",
        label: "Ventas",
        element: <Ventas />
    },
    {
        path: 'estadisticas',
        label: 'Estadísticas',
        element: <Statistics />
    }
]