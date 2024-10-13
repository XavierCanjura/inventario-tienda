import { ButtonProps } from "../../interfaces"

export const ButtonCustom = ({ text, buttonClass, type = "button", disabled = false, onClick}: ButtonProps) => {
    return (
        <button 
            disabled = { disabled }
            className={`min-w-[100px] h-[50px] bg-orange-600 px-4 rounded-[20px] text-white disabled:bg-orange-800 ${ buttonClass}`}
            onClick={ (event) => !disabled ? onClick?.(event) : () => {} }
            type={ type }
        >{ text }</button>
        
    )
}
