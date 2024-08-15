import { PropsWithChildren, useEffect, useState } from "react"
import { SideNav } from "./SideNav"
import { MenuIcon } from "../assets/icons/Menu";
import { useMediaQueris } from "../hooks/useMediaQuerys";

export const PrivateLayout = ({ children, title }: PropsWithChildren & { title?: string }) => {
    const { isTablet  } = useMediaQueris();
    const [show, setShow] = useState<boolean>(!isTablet);

    const toggleShow = () => setShow(!show);

    useEffect( () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        isTablet ? setShow(false) : setShow(true);
    }, [isTablet])

    return (
        <div className="flex">
            <SideNav  toggleShow={ toggleShow } show={ show } />
            <div className="w-full transition-all duration-500 ease-in-out">
                <div className="w-full h-[50px] bg-slate-600 flex items-center px-2">
                    <span className="cursor-pointer" onClick={ toggleShow }>{ show ? '' : <MenuIcon /> }</span>
                </div>
                <div className="p-2 md:p-4">
                    <h1 className="text-2xl text-center md:text-4xl font-semibold uppercase">{ title }</h1>
                    { children }
                </div>
            </div>
        </div>
    )
}
