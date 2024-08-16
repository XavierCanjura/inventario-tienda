import { PropsWithChildren } from "react"

export const Modal = ({ children, show }: PropsWithChildren & { show: boolean } ) => {
    return (
        <div className={`${ show ? "flex": "hidden"} justify-center items-center absolute z-[1000] bg-black/25 w-dvw h-dvh top-0 left-0`}>
            <div className="bg-white w-[90vw] md:w-[50vw] h-max rounded-[20px] shadow-lg">
                { children }
            </div>
        </div>
    )
}
