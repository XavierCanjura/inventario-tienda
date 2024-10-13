import { NavLink } from "react-router-dom"
import { routes } from "../constants/privateRoutes"
import { CloseIcon } from "../assets/icons/Close"
import { useAuthStore } from "../hooks"

export const SideNav = ({ toggleShow, show }: { show: boolean, toggleShow: () => void }) => {

    const { logout } = useAuthStore();
    
    return (
        <div className={`${ show ? 'translate-x-[0px] w-[75vw] md:min-w-[300px] md:w-[300px]' : 'translate-x-[-75vw] md:translate-x-[-300px] w-0' } fixed z-[999] bg-[#F0F0F0] h-dvh flex flex-col border-l-0 border-t-0 rounded-br-[20px] shadow-lg transition-all duration-500 ease-in-out`}>
            <div className="w-full h-[200px] bg-orange-600 flex px-2 pt-3">
                <span className={`w-full flex justify-end cursor-pointer ${ show ? 'block' : 'hidden'}`} onClick={ toggleShow }>{ <CloseIcon /> }</span>
            </div>
            <div className="w-full flex flex-col " id="sidenav">
                {
                    routes.map( (route, index) => (
                        <NavLink 
                            key={ index } 
                            to={ `/dash/${ route.path }` }
                            className="h-[60px] border-t last:border-b px-2 flex items-center font-semibold text-lg"
                        >{ route.label }</NavLink>
                    ))
                }
                <a  
                    onClick={ logout }
                    className="h-[60px] border-t last:border-b px-2 flex items-center font-semibold text-lg cursor-pointer"
                >Cerrar Sesion</a>
            </div>
        </div>
    )
}
