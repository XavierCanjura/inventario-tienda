import { ButtonProps } from "../../interfaces"

export const ButtonCustom = ({ text, buttonClass, type = "button", onClick}: ButtonProps) => {
    return (
        <button 
            className={`h-[35px] bg-orange-600 px-4 rounded-[20px] text-white ${ buttonClass}`}
            onClick={ (event) => onClick?.(event) }
            type={ type }
        >{ text }</button>
        
    )
}
