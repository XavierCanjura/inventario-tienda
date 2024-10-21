import { PropsWithChildren } from "react"

//ICONS
import { CloseIcon } from "../../assets/icons/Close"

export const Modal = (
    { children, show, title, onClickClose }: PropsWithChildren & { 
        show: boolean, 
        onClickClose: React.MouseEventHandler<HTMLDivElement>,
        title: string;
    } 
) => {
    return (
        <div className={`${ show ? "flex": "hidden"} justify-center items-center absolute z-[1000] bg-black/25 w-full h-dvh top-0 left-0`}>
            <div className="bg-[#F0F0F0] w-[90vw] md:w-[50vw] h-max rounded-[20px] shadow-lg">
                <div className="w-full flex flex-col px-5 py-3">
                    {/* Title */}
                    <div className="relative">
                        <h2 className="text-xl md:text-3xl md:text-center font-semibold uppercase">{ title }</h2>
                        <div className="absolute w-[25px] h-[25px] top-0 right-0 cursor-pointer" onClick={ onClickClose }>
                            <CloseIcon stroke="!stroke-orange-600" />
                        </div>
                    </div>
                    {/* Modal Body */}
                    { children }
                </div>
                
            </div>
        </div>
    )
}
